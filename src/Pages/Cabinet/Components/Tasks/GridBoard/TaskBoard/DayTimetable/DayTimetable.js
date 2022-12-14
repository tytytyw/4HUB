import React, { useState } from "react";
import styles from "./DayTimetable.module.sass";
import PropTypes from "prop-types";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { taskTypes } from "types/Tasks";
import {
  contextMenuTask,
  imageSrc,
  MIDNIGHT,
  MODALS,
  TaskFilters,
  TASK_MODALS,
  TASK_TYPES
} from "generalComponents/globalVariables";
import ContextMenu from "generalComponents/ContextMenu";
import ContextMenuItem from "generalComponents/ContextMenu/ContextMenuItem";
import { useContextMenuTasks } from "generalComponents/collections";
import { onSetModals } from "Store/actions/CabinetActions";
import TaskTimeItem from "./TaskTimeItem/TaskTimeItem";
import { getFormatDate, getFormatTime } from "generalComponents/generalHelpers";
import { createArrayOfHoursPerDay, useMonths } from "generalComponents/CalendarHelper";
import { getWeekOfMonth } from "date-fns";
import { useLocales } from "react-localized";

function DayTimetable({ tasks, type }) {
  const { __ } = useLocales();
  const dispatch = useDispatch();
  const months = useMonths();

  const { theme } = useSelector((s) => s.user.userInfo);
  const chosenTask = useSelector((s) => s.Tasks.chosenTask);
  const filters = useSelector((s) => s.Tasks.filters);
  const contextMenu = useContextMenuTasks();
  const [mouseParams, setMouseParams] = useState(null);
  const timePeriod = createArrayOfHoursPerDay(new Date("1971-01-01 " + MIDNIGHT), 1);

  const callbacks = {
    [contextMenuTask.DELETE]: () => {
      dispatch(
        onSetModals(MODALS.TASKS, {
          type: TASK_MODALS.DELETE_TASK,
          params: { width: 420, ...chosenTask }
        })
      );
    },

    [contextMenuTask.CUSTOMIZE]: () => {
      dispatch(
        onSetModals(MODALS.TASKS, {
          type: TASK_MODALS.EDIT_TASK,
          params: {
            width: 420,
            ...chosenTask,
            date_start: getFormatDate(chosenTask.date_start),
            time_start: getFormatTime(chosenTask.date_start)
          }
        })
      );
    },
    [contextMenuTask.ADD_MEETING_NOTE]: () => {
      dispatch(
        onSetModals(MODALS.TASKS, {
          type: TASK_MODALS.ADD_NOTE_TO_MEETING,
          params: { width: 420, ...chosenTask }
        })
      );
    },
    [contextMenuTask.RESCHEDULE_ONE]: () => {
      dispatch(
        onSetModals(MODALS.TASKS, {
          type: TASK_MODALS.RESCHEDULE_ONE,
          params: {
            width: 420,
            ...chosenTask,
            date_start: getFormatDate(chosenTask.date_start),
            time_start: getFormatTime(chosenTask.date_start)
          }
        })
      );
    },
    [contextMenuTask.RESCHEDULE_ALL]: () => {
      dispatch(
        onSetModals(MODALS.TASKS, {
          type: TASK_MODALS.RESCHEDULE_ALL,
          params: {
            width: 420,
            chosenTasks: tasks.filter(
              (el) => el.id_type === TASK_TYPES.OFFLINE_MEETING || el.id_type === TASK_TYPES.ONLINE_MEETING
            )
          }
        })
      );
    }
  };

  const renderTask = (hour) => {
    const h = hour.split(":")[0];
    const timeTask = tasks.filter((item) => {
      const dateTask = `0${new Date(item.date_start).getHours().toString()}`.slice(-2);
      return dateTask === h;
    });
    return timeTask;
  };

  const renderTimetableLine = () =>
    timePeriod.map((hours, i) => (
      <div key={i}>
        {tasks.length > 0 ? (
          renderTask(hours).length > 0 ? (
            renderTask(hours).map((el) => <TaskTimeItem key={el.id} task={el} setMouseParams={setMouseParams} />)
          ) : (
            <div className={classNames(styles.dayLine)}>{hours}</div>
          )
        ) : (
          <div className={classNames(styles.dayLine)}>{hours}</div>
        )}
      </div>
    ));

  const renderDaysYear = () => {
    const taskDays = tasks
      .sort((a, b) => new Date(a.date_start) - new Date(b.date_start))
      .reduce((acc, item) => {
        const key = new Date(item.date_start.split("T")[0]).getMonth();
        acc[key] = acc[key] ? [...acc[key], item] : [item];
        return acc;
      }, {});
    return Object.entries(taskDays).map(([key, item]) => (
      <div key={key}>
        <div className={styles.subTitle}>{months().find((el) => el.id === +key)?.name}</div>
        <div>
          {item.map((el) => (
            <TaskTimeItem key={el.id} task={el} setMouseParams={setMouseParams} isDate={true} />
          ))}
        </div>
      </div>
    ));
  };

  const renderDaysMonth = () => {
    const taskDays = tasks
      .sort((a, b) => new Date(a.date_start) - new Date(b.date_start))
      .reduce((acc, item) => {
        const key = getWeekOfMonth(new Date(item.date_start));
        acc[key] = acc[key] ? [...acc[key], item] : [item];
        return acc;
      }, {});

    return Object.entries(taskDays).map(([key, item]) => (
      <div key={key}>
        <div className={styles.subTitle}>
          {__("????????????")}&nbsp;{key}
        </div>
        <div>
          {item.map((el) => (
            <TaskTimeItem key={el.id} task={el} setMouseParams={setMouseParams} isDate={true} />
          ))}
        </div>
      </div>
    ));
  };

  const renderDaysWeek = () => {
    return tasks
      .sort((a, b) => new Date(a.date_start) - new Date(b.date_start))
      .map((el) => <TaskTimeItem key={el.id} task={el} setMouseParams={setMouseParams} isDate={true} />);
  };

  return (
    <div className={classNames(styles.dayTimetableWrap, `scrollbar-medium-${theme}`)}>
      {filters.type === TaskFilters.BY_YEAR && renderDaysYear()}
      {filters.type === TaskFilters.BY_MONTH && renderDaysMonth()}
      {filters.type === TaskFilters.BY_WEEK && renderDaysWeek()}
      {(filters.type === TaskFilters.BY_DAY || filters.type === TaskFilters.TODAY || !filters.type) &&
        renderTimetableLine()}
      {mouseParams && (
        <ContextMenu params={mouseParams} setParams={setMouseParams} tooltip={true}>
          <div className={styles.mainMenuItems}>
            {contextMenu[type].map((item, i) => (
              <ContextMenuItem
                key={i}
                width={mouseParams.width}
                height={mouseParams.height}
                text={item.name}
                callback={callbacks[item.type]}
                imageSrc={`${imageSrc}assets/PrivateCabinet/contextMenuTasks/${item.img}.svg`}
              />
            ))}
          </div>
        </ContextMenu>
      )}
    </div>
  );
}

export default DayTimetable;

DayTimetable.propTypes = {
  tasks: PropTypes.arrayOf(taskTypes),
  type: PropTypes.string
};
