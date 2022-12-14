import React from "react";
import { useSelector } from "react-redux";

import styles from "./FileBar.module.sass";
import File from "../../../../generalComponents/Files";
import { imageSrc } from "../../../../generalComponents/globalVariables";
import PropTypes from "prop-types";
import { filePickProps, filePreviewProps, fileProps } from "../../../../types/File";

const FileBar = ({
  file,
  isLoading,
  chosenFile,
  setChosenFile,
  setMouseParams,
  setFilePreview,
  filePreview,
  filePick,
  setFilePick
}) => {
  const size = useSelector((state) => state.Cabinet.size);

  const onPickFile = () => {
    if (filePick?.show) {
      const isPicked = filePick.files.filter((el) => el === file.fid);
      isPicked.length > 0
        ? setFilePick({
            ...filePick,
            files: filePick.files.filter((el) => el !== file.fid)
          })
        : setFilePick({ ...filePick, files: [...filePick.files, file.fid] });
    }
  };

  return (
    <>
      <div
        className={`
                    ${styles.fileBar} 
                    ${
                      chosenFile?.fid === file?.fid
                        ? size === "small"
                          ? styles.fileBarSmallChosen
                          : styles.fileBarChosen
                        : null
                    } 
                    ${size === "medium" ? styles.mediumSize : null}
                    ${size === "small" ? styles.smallSize : null}
                `}
        onClick={() => {
          onPickFile();
          if (chosenFile?.fid === file?.fid) {
            setChosenFile(null);
          } else {
            setChosenFile(file);
          }
        }}
        onDoubleClick={() => setFilePreview({ ...filePreview, view: true, file })}
      >
        <div
          className={styles.menu}
          onClick={(e) => {
            setMouseParams({
              x: e.clientX,
              y: e.clientY,
              width: 200,
              height: 25
            });
          }}
        >
          <span />
        </div>
        <div className={styles.symbols}>
          <div>
            {file?.fig && !isLoading ? (
              <img src={`${imageSrc}assets/PrivateCabinet/signs/${file.fig}.svg`} alt="fig" />
            ) : null}
          </div>
          <div>
            {file?.emo && !isLoading ? (
              <img src={`${imageSrc}assets/PrivateCabinet/smiles/${file.emo}.svg`} alt="emoji" />
            ) : null}
          </div>
        </div>
        <div className={styles.file}>
          <File color={file.color} format={file.ext} className={styles.mainFile} />
          {file?.is_pass && !isLoading ? (
            <img className={styles.locked} src={imageSrc + "assets/PrivateCabinet/locked.svg"} alt="lock" />
          ) : null}
        </div>
        <div className={file.tag ? styles.ftag : styles.fEmtyTag}>{file.tag ? `#${file.tag}` : null}</div>
        <div className={styles.fname}>{file.name}</div>
        <div className={styles.fileInfo}>
          <div>{file.size_now}</div>
          <div>{file.mtime.split(" ")[0]}</div>
        </div>
      </div>
    </>
  );
};

export default FileBar;

FileBar.propTypes = {
  file: fileProps,
  isLoading: PropTypes.bool,
  setMouseParams: PropTypes.func,
  chosenFile: fileProps,
  setChosenFile: PropTypes.func,
  setFilePreview: PropTypes.func,
  setFilePick: PropTypes.func,
  filePreview: filePreviewProps,
  filePick: filePickProps
};

FileBar.defaultProps = {
  isLoading: false
};
