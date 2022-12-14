import React from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from "./CustomFolderItem.module.sass";
import { onChooseFiles, onChooseFolder } from "../../../../../Store/actions/CabinetActions";
import { ReactComponent as FolderIcon } from "../../../../../assets/PrivateCabinet/folder-2.svg";
import { ReactComponent as PlayIcon } from "../../../../../assets/PrivateCabinet/play-grey.svg";
import { ReactComponent as AddIcon } from "../../../../../assets/PrivateCabinet/plus-3.svg";
import { imageSrc } from "../../../../../generalComponents/globalVariables";
import PropTypes from "prop-types";
import { fileProps } from "../../../../../types/CustomFolderItem";
import { folderProps } from "../../../../../types/Folder";

const CustomFolderItem = ({
  f,
  setChosenFolder,
  chosenFolder,
  listCollapsed,
  padding,
  chosen,
  subFolder,
  setNewFolderInfo,
  setNewFolder,
  newFolderInfo,
  setMouseParams
}) => {
  const folderList = useSelector((state) => state.Cabinet.folderList);
  const dispatch = useDispatch();
  const openFolder = (e) => {
    let boolean = false;
    e.target?.viewportElement?.classList.forEach((el) => {
      if (el.toString().search("playButton")) boolean = true;
    });
    if (boolean) {
      chosen
        ? setChosenFolder({
            ...chosenFolder,
            path: f.path,
            open: !chosenFolder.open,
            subPath: ""
          })
        : setChosenFolder({
            ...chosenFolder,
            path: f.path,
            open: true,
            subPath: ""
          });
    } else {
      setChosenFolder({
        ...chosenFolder,
        path: f.path,
        open: false,
        subPath: ""
      });
    }
    dispatch(onChooseFolder(f.folders, f.path));
  };
  const renderInnerFolders = () => {
    if ((!folderList || chosenFolder.path !== f.path) && !chosenFolder.open) return null;
    return folderList.folders.map((f, i) => {
      return (
        <CustomFolderItem
          key={i}
          f={f}
          setChosenFolder={setChosenFolder}
          chosenFolder={chosenFolder}
          listCollapsed={listCollapsed}
          padding={"0 15px 0 50px"}
          chosen={f.path === chosenFolder.subPath}
          subFolder={true}
          setMouseParams={setMouseParams}
        />
      );
    });
  };

  return (
    <>
      <div
        className={`${styles.innerFolderWrap} ${chosen ? styles.chosenSubFolderWrap : undefined}`}
        onClick={(e) => {
          subFolder ? setChosenFolder({ ...chosenFolder, subPath: f.path }) : openFolder(e);
          dispatch(onChooseFiles(f.path));
        }}
      >
        <div className={styles.innerFolder} style={{ padding }}>
          <div className={styles.innerFolderName}>
            <FolderIcon className={`${styles.innerFolderIcon} ${f.color}`} />
            {f.is_pass === 1 && (
              <img className={styles.lock} src={`${imageSrc}assets/PrivateCabinet/locked.svg`} alt="emoji" />
            )}
            {!listCollapsed && (
              <div className={styles.nameWrap}>
                <div className={styles.Name}>
                  <div className={styles.name}>{f.name}</div>
                  <span>(0)</span>
                </div>
                {f.tags && <span className={styles.tag}>#{f.tags}</span>}
              </div>
            )}
          </div>
          <div className={styles.innerFolderMedia}>
            {!listCollapsed && f.emo && (
              <img src={`${imageSrc}assets/PrivateCabinet/smiles/${f.emo}.svg`} alt="emoji" />
            )}
            {!listCollapsed && f.fig && <img src={`${imageSrc}assets/PrivateCabinet/signs/${f.fig}.svg`} alt="emoji" />}
            {!subFolder ? (
              <PlayIcon className={`${styles.playButton} ${chosen && chosenFolder.open ? styles.revert : undefined}`} />
            ) : null}
            <div
              className={styles.menuWrap}
              onClick={(e) => {
                setMouseParams({
                  x: e.clientX,
                  y: e.clientY,
                  width: 200,
                  height: 25
                });
              }}
            >
              <span className={styles.menu} />
            </div>
          </div>
        </div>
      </div>
      {!subFolder && (
        <div
          style={{
            height: `${chosen && chosenFolder.open ? f.folders.length * 50 + 50 : 0}px`,
            minHeight: `${chosen && chosenFolder.open ? f.folders.length * 50 + 50 : 0}px`
          }}
          className={`${styles.innerFolders} ${chosen && chosenFolder.open ? undefined : styles.hidden}`}
        >
          <div
            className={styles.addFolderToFolder}
            onClick={() => {
              setNewFolderInfo({ ...newFolderInfo, path: f.path });
              setNewFolder(true);
            }}
          >
            <div className={styles.addFolderName}>
              <FolderIcon style={{ width: "17px" }} />
              {!listCollapsed && <span>?????????? ??????????</span>}
            </div>
            <AddIcon className={styles.addFolderIcon} />
          </div>
          {renderInnerFolders()}
        </div>
      )}
    </>
  );
};

export default CustomFolderItem;

CustomFolderItem.propTypes = {
  f: fileProps,
  setChosenFolder: PropTypes.func,
  chosenFolder: folderProps,
  listCollapsed: PropTypes.bool,
  padding: PropTypes.string,
  chosen: PropTypes.bool,
  subFolder: PropTypes.bool,
  setNewFolderInfo: PropTypes.func,
  setNewFolder: PropTypes.func,
  newFolderInfo: PropTypes.exact({
    path: PropTypes.string
  }),
  setMouseParams: PropTypes.func
};
