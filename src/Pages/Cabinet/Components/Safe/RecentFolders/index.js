import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { onChooseFiles } from "../../../../../Store/actions/CabinetActions";

import styles from "./RecentFolders.module.sass";
import { ReactComponent as PlayIcon } from "../../../../../assets/PrivateCabinet/play-grey.svg";
import CustomFolderItem from "../CustomFolderItem";
import { useLocales } from "react-localized";
import PropTypes from "prop-types";
import { folderProps } from "../../../../../types/Folder";
const RecentFolders = ({ listCollapsed, chosenFolder, setChosenFolder, chosen, setMouseParams }) => {
  const { __ } = useLocales();
  const recentFolders = useSelector((state) => state.Cabinet.recentFolders);
  const dispatch = useDispatch();

  const renderInnerFolders = () => {
    return recentFolders.map((folder, i) => {
      return (
        <CustomFolderItem
          key={i}
          f={folder}
          setChosenFolder={setChosenFolder}
          chosenFolder={chosenFolder}
          listCollapsed={listCollapsed}
          padding={"0 15px 0 50px"}
          chosen={folder.path === chosenFolder.subPath}
          subFolder={true}
          setMouseParams={setMouseParams}
        />
      );
    });
  };

  return (
    <div className={styles.wrapper}>
      <div
        className={`${styles.titleWrap} ${listCollapsed ? styles.titleCollapsed : ""} ${
          chosen ? styles.titleWrapChosen : ""
        }`}
        onClick={() => {
          setChosenFolder({
            ...chosenFolder,
            path: "recent",
            open: true,
            subPath: recentFolders[0].path
          });
          dispatch(onChooseFiles(recentFolders[0].path));
        }}
      >
        <span className={styles.title}>{listCollapsed ? __("Недавние") : __("Недавние Папки")}</span>
        <PlayIcon className={`${styles.playButton} ${chosen && chosenFolder.open ? styles.revert : undefined}`} />
      </div>
      <div
        style={{
          height: `${chosen && chosenFolder.open ? recentFolders.length * 50 : 0}px`,
          minHeight: `${chosen && chosenFolder.open ? recentFolders.length * 50 : 0}px`
        }}
        className={`${styles.innerFolders} ${chosen && chosenFolder.open ? undefined : styles.hidden}`}
      >
        {renderInnerFolders()}
      </div>
    </div>
  );
};

export default RecentFolders;

RecentFolders.propTypes = {
  listCollapsed: PropTypes.bool,
  chosenFolder: folderProps,
  setChosenFolder: PropTypes.func,
  chosen: PropTypes.bool,
  setMouseParams: PropTypes.func
};
