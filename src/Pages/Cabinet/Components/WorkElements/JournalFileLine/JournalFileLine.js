import React, { useState } from "react";
import styles from "./JournalFileLine.module.sass";
import { journalFileProps, journalShareFileProps } from "../../../../../types/File";
import File from "generalComponents/Files";
import { useLocales } from "react-localized";
import OpenInFolderButton from "generalComponents/OpenInFolderButton/OpenInFolderButton";
import { FOLDER, MODALS, SHARED_FILES } from "generalComponents/globalVariables";
import { onSetModals } from "Store/actions/CabinetActions";
import { useDispatch, useSelector } from "react-redux";
import { PropTypes } from "prop-types";
import { diffDays } from "@fullcalendar/react";
import ShareUserIcon from "generalComponents/ShareUserIcon/ShareUserIcon";
import { parseCalendarDateToDate } from "generalComponents/CalendarHelper";

function JournalFileLine({ file }) {
  const { __ } = useLocales();
  const dispatch = useDispatch();
  const previewFile = useSelector((state) => state.Cabinet.modals.previewFile);

  const [isHover, setIsHover] = useState(false);

  const handleDoubleClick = () => {
    dispatch(onSetModals(MODALS.FILE_PREVIEW, { ...previewFile, open: true, file }));
  };

  const compareDates = (dateShare) => {
    const today = new Date();
    if (dateShare.length < 1) {
      return __("Бессрочно");
    }
    const endDate = parseCalendarDateToDate(dateShare.split(" ")[0]);

    if (endDate.getTime() - today.getTime() < 0) {
      return __("Бессрочно");
    }
    return __(`Осталось (${diffDays(today, endDate).toFixed()} дней)`);
  };

  const accessRights = () =>
    file.is_download === "1" ? __("Скачивание") : file.is_write === "1" ? __("Редактирование") : __("Просмотр");

  return (
    <div
      className={styles.journalFileLine}
      onMouseOver={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onDoubleClick={handleDoubleClick}
    >
      <div className={styles.fileAbout}>
        <div className={styles.icon}>
          <File color={file?.color} format={file?.ext} />
        </div>
        <div className={styles.fileText}>
          <div className={styles.fileName}>{file?.name && file?.name.slice(0, file?.name.lastIndexOf("."))}</div>
          <div className={styles.fileDate}>
            {file?.mtime?.split(" ")[0]} {file?.size_now}
          </div>
        </div>
      </div>
      {file.user_name ? (
        <div className={styles.shareFile}>
          <div className={styles.fileRights}>{accessRights()}</div>
          <div className={styles.users}>
            <div className={styles.userIcon}>
              <ShareUserIcon userIcon={file.user_icon} name={file.user_name} />
            </div>
            <div className={styles.safe}>{__(`Срок хранения: ${compareDates(file.deadline_share)}`)}</div>
          </div>
        </div>
      ) : null}
      {
        // TODO - VZ - change redirect
        file.user_name ? (
          <OpenInFolderButton
            file={file}
            isHover={isHover}
            pathUrl={"/shared-files"}
            endpoint={SHARED_FILES.FILES_SHARED_TO_USER}
          />
        ) : (
          <OpenInFolderButton file={file} isHover={isHover} pathUrl={"/folders"} endpoint={FOLDER.API_GET_FILES} />
        )
      }
    </div>
  );
}

export default JournalFileLine;

JournalFileLine.propTypes = {
  file: PropTypes.oneOfType([journalFileProps, journalShareFileProps])
};
