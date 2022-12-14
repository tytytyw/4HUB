import React, { useEffect, useRef, useState } from "react";

import styles from "./LoadItem.module.sass";
import File from "../../../../../generalComponents/Files";
import { ReactComponent as CheckIcon } from "../../../../../assets/PrivateCabinet/check.svg";
import { ReactComponent as CrossIcon } from "../../../../../assets/PrivateCabinet/remove.svg";
// import {ReactComponent as SettingsIcon} from '../../../../../assets/PrivateCabinet/settings.svg';
import { ReactComponent as ErrorIcon } from "../../../../../assets/PrivateCabinet/exclamation.svg";
import { ReactComponent as ReloadIcon } from "../../../../../assets/PrivateCabinet/reload.svg";
import { ReactComponent as UploadArrowIcon } from "../../../../../assets/PrivateCabinet/uploadArrow.svg";
import PropTypes from "prop-types";
import { awaitingFilesProps, loadedFilesProps, loadingFileProps } from "../../../../../types/LoadingFiles";

const LoadItem = ({
  list,
  index,
  set,
  loaded,
  processing,
  name,
  ext,
  color,
  options,
  startLoading,
  setProcessing,
  error,
  fileErrors,
  setFileErrors,
  awaitingFiles,
  setAwaitingFiles,
  loadingFile,
  setLoadingFile,
  collapsed
}) => {
  const [data, setData] = useState({
    strokeDasharray: `150 150`,
    strokeDashoffset: `288`
  });
  const circleRef = useRef();
  const onProgress = (processing) => {
    const radius = circleRef?.current?.r?.baseVal?.value;
    const circumference = 2 * Math.PI * radius;
    setData({
      strokeDasharray: `${circumference} ${circumference}`,
      strokeDashoffset: `${circumference - (processing / 100) * circumference}`
    });
  };

  useEffect(() => {
    onProgress(processing);
  }, [processing]);

  const deleteItem = () => {
    const items = [...list];
    items.splice(index, 1);
    set(items);
  };

  return (
    <div className={styles.loadItemWrap}>
      <div className={styles.nameWrap}>
        <div className={styles.fileWrap}>
          <File format={ext} color={color} />
        </div>
        <span className={styles.name}>{name}</span>
      </div>
      {/*commented icon that allows adjust files in loading list*/}
      {/*<div className={styles.settingsWrap}>*/}
      {/*    {!processing ? <SettingsIcon*/}
      {/*        className={styles.settings}*/}
      {/*        onClick={() => {*/}
      {/*            setFileAddCustomization({show: true, file: list[index]});*/}
      {/*            if(!list[index]?.file?.loaded) deleteItem();*/}
      {/*        }} /> : null}*/}
      {/*</div>*/}
      <div className={styles.optionsItemWrap}>
        {loaded && !error ? (
          <span className={styles.loadedItemWrap}>
            <CheckIcon className={styles.checkIcon} />
            <CrossIcon className={styles.cross} onClick={deleteItem} />
          </span>
        ) : null}
        {!loaded && !processing && !error ? <CrossIcon className={styles.crossIcon} onClick={deleteItem} /> : null}
        {processing && !error ? (
          <div className={styles.progress}>
            <svg viewBox="0 0 100 100" width="20px" className={styles.progressBar}>
              <circle className={styles.load} cx="50" cy="50" r="45" />
              <circle
                className={styles.loaded}
                cx="50"
                cy="50"
                r="45"
                ref={circleRef}
                strokeDasharray={data.strokeDasharray}
                strokeDashoffset={data.strokeDashoffset}
              />
            </svg>
            {collapsed ? <UploadArrowIcon className={styles.uploadIcon} /> : null}
            <span className={styles.crossUpload}>
              <CrossIcon
                className={styles.cross}
                onClick={() => {
                  setFileErrors([...fileErrors, list[index]]);
                  deleteItem();
                  if (options.cancelLoading) {
                    options.cancelLoading();
                    setProcessing(0);
                    startLoading(true);
                  }
                }}
              />
            </span>
          </div>
        ) : null}
        {error ? (
          <div className={styles.error}>
            <ErrorIcon className={styles.mark} />
            <ReloadIcon
              className={styles.reload}
              onClick={() => {
                if (loadingFile.length > 0) {
                  setAwaitingFiles([...awaitingFiles, list[index]]);
                } else {
                  setLoadingFile([list[index]]);
                }
                deleteItem();
              }}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default LoadItem;

LoadItem.propTypes = {
  list: PropTypes.oneOfType([
    PropTypes.arrayOf(awaitingFilesProps),
    PropTypes.arrayOf(loadingFileProps),
    PropTypes.arrayOf(loadedFilesProps)
  ]),
  index: PropTypes.number,
  set: PropTypes.func,
  loaded: PropTypes.bool,
  processing: PropTypes.number,
  name: PropTypes.string,
  ext: PropTypes.string,
  color: PropTypes.string,
  options: PropTypes.exact({
    cancelLoading: PropTypes.func
  }),
  startLoading: PropTypes.func,
  setProcessing: PropTypes.func,
  error: PropTypes.bool,
  fileErrors: PropTypes.arrayOf(PropTypes.string),
  setFileErrors: PropTypes.func,
  awaitingFiles: PropTypes.oneOfType([PropTypes.arrayOf(loadingFileProps), PropTypes.array]),
  setAwaitingFiles: PropTypes.func,
  loadingFile: PropTypes.oneOfType([PropTypes.arrayOf(loadingFileProps), PropTypes.array]),
  setLoadingFile: PropTypes.func,
  collapsed: PropTypes.bool
};
