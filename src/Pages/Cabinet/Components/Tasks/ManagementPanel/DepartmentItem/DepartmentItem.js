import React, { useState } from "react";
import PropTypes from "prop-types";
import { BUTTON_TYPES, contextMenuFolder, imageSrc, MODALS, TASK_MODALS } from "generalComponents/globalVariables";
import styles from "./DepartmentItem.module.sass";
import Button from "generalComponents/CustomableButton/CustomableButton";
import { ReactComponent as Bag } from "assets/PrivateCabinet/tasks/bag.svg";
import ThreeDots from "generalComponents/ThreeDots/ThreeDots";
import { useDispatch, useSelector } from "react-redux";
import { onChoosDep } from "Store/actions/TasksActions";
import ContextMenu from "generalComponents/ContextMenu";
import ContextMenuItem from "generalComponents/ContextMenu/ContextMenuItem";
import { onSetModals } from "Store/actions/CabinetActions";
import { useContextMenuFolderLibrary } from "generalComponents/collections";
import { taskDepartmentTypes } from "types/Tasks";

const DepartmentItem = ({ icon, dep, isDefault }) => {
  const dispatch = useDispatch();
  const contextMenuFolderLibrary = useContextMenuFolderLibrary();
  const currentDep = useSelector((state) => state.Tasks.currentDep);
  const [mouseParams, setMouseParams] = useState(null);

  const onSelectDep = () => {
    dispatch(onChoosDep(dep));
  };

  const onClickDots = (e) =>
    setMouseParams({
      x: e.clientX,
      y: e.clientY,
      width: 200,
      height: 25
    });

  const closeContextMenu = () => setMouseParams(null);

  const callbacks = {
    [contextMenuFolder.CUSTOMIZE]: () =>
      dispatch(
        onSetModals(MODALS.TASKS, {
          type: TASK_MODALS.EDIT_SECTION,
          params: { width: 420, title: currentDep.name, icon: currentDep.icon, id: currentDep.id }
        })
      ),
    [contextMenuFolder.DELETE]: () =>
      dispatch(
        onSetModals(MODALS.TASKS, {
          type: TASK_MODALS.DELETE_SECTION,
          params: { width: 420, title: currentDep.name, icon: currentDep.icon, id: currentDep.id }
        })
      )
  };

  return (
    <>
      <Button style={BUTTON_TYPES.LIGHT_LONG} onClick={onSelectDep} isSelected={dep.id === currentDep?.id}>
        {icon ? (
          icon
        ) : dep.icon ? (
          <img src={`${imageSrc}assets/PrivateCabinet/library/own/${dep.icon}.svg`} alt={dep.icon} />
        ) : (
          <Bag />
        )}
        <span className={styles.text}>{dep.name}</span>
        {!isDefault && <ThreeDots onClick={onClickDots} />}
      </Button>

      {mouseParams !== null && (
        <ContextMenu params={mouseParams} setParams={closeContextMenu} tooltip={true}>
          <div className={styles.mainMenuItems}>
            {contextMenuFolderLibrary.map((item, i) => (
              <ContextMenuItem
                key={i}
                width={mouseParams.width}
                height={mouseParams.height}
                text={item.name}
                callback={callbacks[item.type]}
                imageSrc={`${imageSrc}assets/PrivateCabinet/contextMenuFile/${item.img}.svg`}
              />
            ))}
          </div>
        </ContextMenu>
      )}
    </>
  );
};

export default DepartmentItem;

DepartmentItem.propTypes = {
  icon: PropTypes.element,
  dep: taskDepartmentTypes,
  isDefault: PropTypes.bool
};
DepartmentItem.defaultProps = {
  isDefault: false
};
