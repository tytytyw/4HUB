import React from "react";

import styles from "./FolderPath.module.sass";
import { useFolders } from "../../../../../generalComponents/collections";
import { useDispatch, useSelector } from "react-redux";
import { onChooseFiles, onChooseFolder, onSetPath } from "../../../../../Store/actions/CabinetActions";
import PropTypes from "prop-types";

const FolderPath = ({ setFilesPage, setGLoader, setChosenFolder, width }) => {
  const folders = useFolders();
  const path = useSelector((state) => state.Cabinet.fileList?.path);
  const filesNextPath = useSelector((state) => state.Cabinet.fileList?.filesNext?.path);
  const folderList = useSelector((state) => state.Cabinet?.folderList);
  const globalFolders = useSelector((state) => state.Cabinet?.global);
  const otherFolders = useSelector((state) => state.Cabinet?.other);
  const dispatch = useDispatch();

  const filterEl = (el) => {
    for (let folder of folders) {
      if (el === folder.name) return folder.nameRu;
    }
    return el;
  };

  const chooseFolder = (i) => {
    const newPath = path
      .split("/")
      .slice(0, i + 1)
      .join("/");
    if (newPath !== path) {
      const f = path
        .split("/")
        .slice(1, i + 1)
        .reduce(
          (folders, path, index) => {
            return index === 0
              ? folders.filter((folder) => folder.name === path)[0]
              : folders.folders.filter((folder) => folder.name === path)[0];
          },
          [...globalFolders, ...otherFolders]
        );
      setChosenFolder((state) => ({
        ...state,
        path: newPath,
        open: i === 2,
        subPath: "",
        info: f ?? null
      }));
      if (newPath.split("/").length === 2 && newPath === folderList?.path) {
        dispatch(onChooseFolder(folderList?.folders, newPath));
        dispatch(onSetPath(newPath));
      }
      setGLoader(true);
      setTimeout(() => {
        dispatch(onChooseFiles(newPath, "", 1, "", setGLoader));
      }, 0);
      setFilesPage(1);
    }
  };

  const renderPath = () => {
    const newPath = filesNextPath ? filesNextPath : path;
    return newPath.split("/").map((el, i) => (
      <div className={`${styles.pathEl} ${i === 0 && (el === "global" || el === "other") ? styles.hide : ""}`} key={i}>
        {i !== 1 ? <span className={styles.arrowNext}>&gt;</span> : null}
        <div className={styles.pathEl} onClick={() => chooseFolder(i)}>
          {i === 1 ? filterEl(el) : el}
        </div>
      </div>
    ));
  };

  return (
    <>
      {path ? (
        <div className={styles.pathWrap} style={{ width: width - 15 }}>
          {renderPath()}
        </div>
      ) : null}
    </>
  );
};

export default FolderPath;

FolderPath.propTypes = {
  width: PropTypes.number,
  setFilesPage: PropTypes.func,
  setGLoader: PropTypes.func,
  setChosenFolder: PropTypes.func
};
