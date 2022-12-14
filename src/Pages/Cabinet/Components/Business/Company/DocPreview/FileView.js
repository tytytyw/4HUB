import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styles from "./FileView.module.sass";
import { ReactComponent as DownloadIco } from "../../../../../../assets/PrivateCabinet/download.svg";
import { ReactComponent as PointerMenuImg } from "../../../../../../assets/BusinessCabinet/pointer-menu.svg";
import ContextMenu from "../../../../../../generalComponents/ContextMenu";
import { useContextMenuDocFile } from "../../../../../../generalComponents/collections";
import { projectSrc } from "../../../../../../generalComponents/globalVariables";
import ActionApproval from "../../../../../../generalComponents/ActionApproval";
import { onDeleteCompanyDocument, onGetCompanyDocument } from "../../../../../../Store/actions/CabinetActions";
import { ReactComponent as CaseIcon } from "../../../../../../assets/BusinessCabinet/case.svg";
import { ReactComponent as MissionIco } from "../../../../../../assets/BusinessCabinet/mission.svg";
import { ReactComponent as VisionIco } from "../../../../../../assets/BusinessCabinet/vision.svg";
import PopUp from "../../../../../../generalComponents/PopUp";
import classNames from "classnames";
import { useLocales } from "react-localized";
import PropTypes from "prop-types";
import { mouseParamsProps } from "../../../../../../types/MouseParams";
import { actionProps } from "../../../../../../types/Action";

const FileView = ({
  pageOption,
  mouseParams,
  setMouseParams,
  renderMenuItems,
  previewSrc,
  editSrc,
  action,
  setAction,
  nullifyAction,
  setShowSuccessMessage,
  downloadFileSrc
}) => {
  const { __ } = useLocales();
  const contextMenuDocFile = useContextMenuDocFile();
  const dispatch = useDispatch();
  const [editFile, setEditFile] = useState(false);

  const onContextClick = (e) => {
    setMouseParams({
      type: "contextMenuFile",
      x: e.clientX,
      y: e.clientY,
      width: 163,
      height: 45
    });
  };
  const callbackArr = [
    {
      type: "editFile",
      name: __("Редактировать файл"),
      text: ``,
      callback: () => openFileEditor()
    },
    {
      type: "deleteFile",
      name: __("Удаление файла"),
      text: __(`Вы действительно хотите удалить файл?`),
      callback: (list, index) => setAction(list[index])
    }
  ];

  const deleteFile = () => {
    nullifyAction();
    dispatch(onDeleteCompanyDocument(pageOption.name, setShowSuccessMessage, __("документ удален")));
  };
  const openFileEditor = () => {
    nullifyAction();
    setEditFile(true);
  };
  const onCloseFileEditor = () => {
    setEditFile(false);
    setTimeout(() => dispatch(onGetCompanyDocument(pageOption.name)), 3000);
  };
  const renderIcon = () => {
    switch (pageOption.name) {
      case "standards":
        return <CaseIcon />;
      case "mission":
        return <MissionIco />;
      case "viziya":
        return <VisionIco />;
      default:
        return "file";
    }
  };
  const downloadFile = () => {
    const link = document.createElement("a");
    link.href = projectSrc + downloadFileSrc;
    link.download = pageOption.name;
    link.click();
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.btnWrapper}>
        <button onClick={onContextClick} className={styles.contextBtn}>
          <PointerMenuImg />
        </button>
      </div>
      <div className={classNames(styles.btnWrapper, styles.downloadBtn)}>
        <button title="Download" onClick={() => downloadFile()} className={styles.contextBtn}>
          <DownloadIco title="Download" />
        </button>
      </div>

      <div className={styles.content}>
        <embed style={{ height: "100%", width: "100%" }} type="application/pdf" src={projectSrc + previewSrc}></embed>
      </div>
      {mouseParams !== null && mouseParams?.type === "contextMenuFile" ? (
        <ContextMenu
          params={mouseParams}
          setParams={setMouseParams}
          tooltip={false}
          customClose={true}
          disableAutohide={true}
        >
          <div className={styles.mainMenuItems}>{renderMenuItems(contextMenuDocFile, callbackArr)}</div>
        </ContextMenu>
      ) : null}
      {action?.type === "deleteFile" ? (
        <ActionApproval
          name={action.name}
          text={action.text}
          set={nullifyAction}
          callback={deleteFile}
          approve={"Удалить"}
        >
          {renderIcon()}
        </ActionApproval>
      ) : null}
      {editFile ? (
        <PopUp set={onCloseFileEditor}>
          <div className={styles.editFile}>
            <iframe title={pageOption.name} frameBorder="0" src={editSrc}></iframe>
          </div>
        </PopUp>
      ) : null}
    </div>
  );
};

export default FileView;
FileView.propTypes = {
  pageOption: PropTypes.shape({
    name: PropTypes.string
  }),
  mouseParams: mouseParamsProps,
  setMouseParams: PropTypes.func,
  renderMenuItems: PropTypes.func,
  previewSrc: PropTypes.string,
  editSrc: PropTypes.string,
  action: actionProps,
  setAction: PropTypes.func,
  nullifyAction: PropTypes.func,
  setShowSuccessMessage: PropTypes.func,
  downloadFileSrc: PropTypes.string
};
