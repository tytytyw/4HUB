import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from "./Archive.module.sass";
import SearchField from "../SearchField";
import StorageSize from "../StorageSize";
import Notifications from "../Notifications";
import Profile from "../Profile/Profile";
import ServePanel from "../ServePanel";
import DateBlock from "../Journal/DateBlock";
import ContextMenu from "../../../../generalComponents/ContextMenu";
import { contextMenuFile } from "../../../../generalComponents/collections";
import ContextMenuItem from "../../../../generalComponents/ContextMenu/ContextMenuItem";
import ActionApproval from "../../../../generalComponents/ActionApproval";
import File from "../../../../generalComponents/Files";
import { imageSrc } from "../../../../generalComponents/globalVariables";
import BottomPanel from "../BottomPanel";
import FilesGroup from "./WorkElements/FilesGroup/FilesGroup";
import { onGetArchiveFiles } from "../../../../Store/actions/CabinetActions";

import { months } from "../../../../generalComponents/CalendarHelper";
import { useLocales } from "react-localized";

const Archive = () => {
  const { __ } = useLocales();
  const workElementsView = useSelector((state) => state.Cabinet.view);

  const [search, setSearch] = useState(null);
  const fileList = useSelector((state) => state.Cabinet.arhiveFileList);

  const [year, setYear] = useState(null);
  const [month, setMonth] = useState(null);

  const [filePick, setFilePick] = useState({ show: false, files: [] });

  const [chosenFile, setChosenFile] = useState(null);
  const [action, setAction] = useState({ type: "", name: "", text: "" });
  const [mouseParams, setMouseParams] = useState(null);
  const [filePreview, setFilePreview] = useState(null);

  const nullifyAction = () => setAction({ type: "", name: "", text: "" });

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(onGetArchiveFiles("", month));
  }, [month]); // eslint-disable-line

  const callbackArrMain = [
    {
      type: "resend",
      name: __(""),
      text: __(``),
      callback: (list, index) => setAction(list[index])
    },
    {
      type: "share",
      name: __(""),
      text: __(``),
      callback: (list, index) => setAction(list[index])
    },
    { type: "copyLink", name: __(""), text: __(``), callback: () => {} },
    {
      type: "customize",
      name: __("???????????????????????????? ??????????"),
      text: __(``),
      callback: (list, index) => setAction(list[index])
    },
    {
      type: "customizeSeveral",
      name: __(`???????????????????????????? ????????????`),
      text: __(``),
      callback: () => {}
    },
    {
      type: "archive",
      name: __("???????????????? ???????? ?? ??????????"),
      text: __(`???? ?????????????????????????? ???????????? ???????????????????????? ???????? ${chosenFile?.name}?`),
      callback: (list, index) => setAction(list[index])
    },
    {
      type: "intoZip",
      name: __("?????????? ?? ZIP"),
      text: __(``),
      callback: (list, index) =>
        setAction({
          ...action,
          type: list[index].type,
          name: list[index].name
        })
    },
    {
      type: "properties",
      name: __("????????????????"),
      text: __(``),
      callback: () => setAction({ ...action, type: "properties", name: __("????????????????") })
    },
    {
      type: "download",
      name: __("???????????????? ??????????"),
      text: __(``),
      callback: () => {}
    },
    {
      type: "print",
      name: __("?????????????????????? ????????"),
      text: __(``),
      callback: () => {}
    }
  ];

  const additionalMenuItems = [
    {
      type: "delete",
      name: __("???????????????? ??????????"),
      text: __(`???? ?????????????????????????? ???????????? ?????????????? ???????? ${chosenFile?.name}?`),
      callback: (list, index) => setAction(list[index])
    }
  ];

  const renderMenuItems = (target, type) => {
    return target.map((item, i) => {
      return (
        <ContextMenuItem
          key={i}
          width={mouseParams.width}
          height={mouseParams.height}
          text={item.name}
          callback={() => type[i]?.callback(type, i)}
          imageSrc={`${imageSrc}assets/PrivateCabinet/contextMenuFile/${item.img}.svg`}
        />
      );
    });
  };

  const renderFilesGroup = (mounth, i) => {
    return (
      <FilesGroup
        key={i}
        index={i}
        fileList={fileList}
        filePreview={filePreview}
        setFilePreview={setFilePreview}
        callbackArrMain={callbackArrMain}
        chosenFile={chosenFile}
        setChosenFile={setChosenFile}
        filePick={filePick}
        setFilePick={setFilePick}
        mounthName={mounth}
        setAction={setAction}
        setMouseParams={setMouseParams}
      />
    );
  };

  return (
    <div className={styles.parentWrapper}>
      <div className={styles.header}>
        <SearchField />
        <div className={styles.infoHeader}>
          <StorageSize />
          <Notifications />
          <Profile />
        </div>
      </div>

      <ServePanel view={workElementsView} />

      <div className={styles.wrapper}>
        <DateBlock
          search={search}
          setSearch={setSearch}
          year={year}
          setYear={setYear}
          month={month}
          setMonth={setMonth}
        />

        <div className={styles.workSpaceWrap}>
          <div className={styles.FilesList}>
            {month
              ? renderFilesGroup(months()[month - 1].name, 0)
              : months().map((item, i) => renderFilesGroup(item.name, i))}
          </div>
        </div>
      </div>

      {mouseParams !== null && (
        <ContextMenu params={mouseParams} setParams={setMouseParams} tooltip={true}>
          <div className={styles.mainMenuItems}>{renderMenuItems(contextMenuFile.main, callbackArrMain)}</div>
          <div className={styles.additionalMenuItems}>
            {renderMenuItems(contextMenuFile.additional, additionalMenuItems)}
          </div>
        </ContextMenu>
      )}

      {action.type === "delete" && (
        <ActionApproval
          name={action.name}
          text={action.text}
          set={nullifyAction}
          callback={() => {}}
          approve={__("??????????????")}
        >
          <div className={styles.fileActionWrap}>
            <File format={chosenFile?.ext} color={chosenFile?.color} />
          </div>
        </ActionApproval>
      )}

      <BottomPanel />
    </div>
  );
};

export default Archive;
