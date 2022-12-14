import React, { useState } from "react";
import styles from "./BoardServicePanel.module.sass";
import PropTypes from "prop-types";
import {
  imageSrc,
  MODALS,
  TASK_MODALS,
  TASKS_SCHEMA,
  TASK_TYPES,
  URGENCY_TYPES
} from "../../../../../../../generalComponents/globalVariables";
import { useTaskBoardTitle } from "../../../../../../../generalComponents/collections";
import { ReactComponent as FrameIcon } from "assets/PrivateCabinet/tasks/frame.svg";
import classNames from "classnames";
import { ReactComponent as AddIcon } from "../../../../../../../assets/PrivateCabinet/plus-3.svg";
import { ReactComponent as LinesIcon } from "assets/PrivateCabinet/lines.svg";
import { ReactComponent as BarsIcon } from "assets/PrivateCabinet/tasks/bars.svg";
import { ReactComponent as CalendarIcon } from "assets/PrivateCabinet/tasks/calendar.svg";
import { ReactComponent as ListIcon } from "assets/PrivateCabinet/tasks/list.svg";
import TabsPicker from "../../../../../../../generalComponents/TabsPicker/TabsPicker";
import { onSetModals } from "../../../../../../../Store/actions/CabinetActions";
import { useDispatch, useSelector } from "react-redux";
import { getStorageItem } from "generalComponents/StorageHelper";
import { useLocales } from "react-localized";
import PopUp from "generalComponents/PopUp";
import CalendarMonth from "../../../Calendar/CalendarMonth";
import CalendarYear from "../../../Calendar/CalendarYear";
import { TasksTypes } from "Store/types";

function BoardServicePanel({ type, isLastElement, setSchema, schema, taskExists }) {
  const { __ } = useLocales();
  const TITLE = useTaskBoardTitle();
  const dispatch = useDispatch();
  const isHistory = useSelector((s) => s.Tasks.isHistory);

  const [tabSelect, setTabSelect] = useState(2);
  const [openMonthCalendar, setOpenMonthCalendar] = useState(false);
  const [openYearCalendar, setOpenYearCalendar] = useState(null);
  const ELEMENTS = [ListIcon, BarsIcon, LinesIcon, CalendarIcon];
  const renderAddImage = () => (
    <>
      <img
        className={styles[`${type}_emptyImg`]}
        src={`${imageSrc}assets/PrivateCabinet/create_arrow.svg`}
        alt="Create Arrow"
      />
      {type && (
        <img
          className={styles[`${type}_inscription`]}
          src={`${imageSrc}assets/PrivateCabinet/tasks/inscriptions/${type.toLowerCase().replace("_", "-")}.png`}
          alt="inscription"
        />
      )}
    </>
  );

  const onAdd = () => {
    if (type === TASK_TYPES.MEETINGS) {
      dispatch(
        onSetModals(MODALS.TASKS, {
          type: TASK_MODALS.ADD_MEETING,
          params: {
            width: 420,
            date_start: "",
            name: "",
            id_type: TASK_TYPES.ONLINE_MEETING,
            id_dep: JSON.parse(getStorageItem("taskDepartment"))?.id
          }
        })
      );
    }
    if (type === TASK_TYPES.CALLS) {
      dispatch(
        onSetModals(MODALS.TASKS, {
          type: TASK_MODALS.ADD_CALL,
          params: {
            width: 420,
            date_start: "",
            name: "",
            id_type: TASK_TYPES.CALLS,
            id_dep: JSON.parse(getStorageItem("taskDepartment"))?.id
          }
        })
      );
    }
    if (type === TASK_TYPES.MAILS) {
      dispatch(
        onSetModals(MODALS.TASKS, {
          type: TASK_MODALS.ADD_LETTER,
          params: {
            width: 420,
            name: "",
            emails: "",
            prim: "",
            id_type: TASK_TYPES.MAILS,
            id_dep: JSON.parse(getStorageItem("taskDepartment"))?.id
          }
        })
      );
    }
    if (type === TASK_TYPES.TASK) {
      dispatch(
        onSetModals(MODALS.TASKS, {
          type: TASK_MODALS.ADD_TASK,
          params: {
            width: 769,
            tags: " ",
            id_color: "",
            id_emo: "",
            id_fig: "",
            date_start: "",
            date_end: "",
            name: "",
            prim: "",
            id_dep: JSON.parse(getStorageItem("taskDepartment"))?.id,
            id_type: TASK_TYPES.TASK,
            id_act: URGENCY_TYPES.PLANNED
          }
        })
      );
    }
  };

  const onExpand = () => {
    switch (type) {
      case TASK_TYPES.MEETINGS:
        schema === TASKS_SCHEMA.EXPANDED_MEETINGS_BOARD
          ? setSchema(TASKS_SCHEMA.GRID_BAR)
          : setSchema(TASKS_SCHEMA.EXPANDED_MEETINGS_BOARD);
        break;
      case TASK_TYPES.CALLS:
        schema === TASKS_SCHEMA.EXPANDED_CALLS_BOARD
          ? setSchema(TASKS_SCHEMA.GRID_BAR)
          : setSchema(TASKS_SCHEMA.EXPANDED_CALLS_BOARD);
        break;
      case TASK_TYPES.MAILS:
        schema === TASKS_SCHEMA.EXPANDED_MAIL_BOARD
          ? setSchema(TASKS_SCHEMA.GRID_BAR)
          : setSchema(TASKS_SCHEMA.EXPANDED_MAIL_BOARD);
        break;
      case TASK_TYPES.TASK:
        schema === TASKS_SCHEMA.EXPANDED_TASKS_BOARD
          ? setSchema(TASKS_SCHEMA.GRID_BAR)
          : setSchema(TASKS_SCHEMA.EXPANDED_TASKS_BOARD);
        break;
      default:
        break;
    }
  };

  const handleHistory = () => {
    if (isHistory) {
      dispatch({ type: TasksTypes.IS_HISTORY, payload: false });
    } else {
      dispatch({ type: TasksTypes.IS_HISTORY, payload: true });
      setOpenMonthCalendar(true);
    }
  };

  return (
    <div className={styles.boardServicePanelWrap}>
      {type === TASK_TYPES.TASK && (
        <div className={styles.addIconWrap}>
          <AddIcon className={styles.addIcon} onClick={onAdd} />
          {!taskExists && renderAddImage()}
        </div>
      )}
      <span className={styles.boardTitle}>{TITLE[type]}</span>
      <div className={styles.buttonsWrap}>
        <FrameIcon className={styles.frameIcon} onClick={onExpand} />
        {type === TASK_TYPES.TASK && (
          <div className={classNames(styles.history, { [styles.isHistoryActive]: isHistory })} onClick={handleHistory}>
            {__("?????????????? ??????????")}
          </div>
        )}

        {!isLastElement ? (
          <div className={styles.addIconWrap}>
            <AddIcon className={classNames(styles.addIcon)} onClick={onAdd} />
            {!taskExists && renderAddImage()}
          </div>
        ) : null}
        {isLastElement ? <TabsPicker ELEMENTS={ELEMENTS} selected={tabSelect} onClick={setTabSelect} /> : null}
      </div>
      {openMonthCalendar && (
        <PopUp set={setOpenMonthCalendar} zIndex={102}>
          <CalendarMonth setShowCalendar={setOpenMonthCalendar} setOpenYearCalendar={setOpenYearCalendar} />
        </PopUp>
      )}
      {openYearCalendar && (
        <PopUp>
          <CalendarYear year={openYearCalendar} setOpenYearCalendar={setOpenYearCalendar} />
        </PopUp>
      )}
    </div>
  );
}

export default BoardServicePanel;

BoardServicePanel.defaultProps = {
  setSchema: () => {}
};

BoardServicePanel.propTypes = {
  type: PropTypes.oneOf(Object.values(TASK_TYPES)).isRequired,
  isLastElement: PropTypes.bool,
  setSchema: PropTypes.func.isRequired,
  schema: PropTypes.oneOf(Object.values(TASKS_SCHEMA)),
  taskExists: PropTypes.bool
};
