import React, { useEffect } from "react";

import styles from "./DrawZone.module.sass";
import Loader from "../../../../../../../generalComponents/Loaders/4HUB";
import { drawCanvasPosition } from "../../PreviewFile/paintHelpers";
import { ReactComponent as AddIcon } from "../../../../../../../assets/PrivateCabinet/plus-3.svg";
import classnames from "classnames";
import { useLocales } from "react-localized";
import PropTypes from "prop-types";
import { drawImageProps } from "types/DrawImage";

function DrawZone({ params, canvasRef, mainRef, images, setParams, inputRef, mainWidth }) {
  const { __ } = useLocales();
  const paintImage = async (images) => {
    setParams((s) => ({ ...s, isLoading: true }));
    canvasRef.current.getContext("2d").clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    if (images.length === 1) {
      await drawCanvasPosition(canvasRef.current, images[0]);
    }
    if (images.length === 2) {
      await drawCanvasPosition(
        canvasRef.current,
        images[0],
        canvasRef.current.width / 2,
        canvasRef.current.height,
        canvasRef.current.width / 2,
        canvasRef.current.height / 2
      );
      await drawCanvasPosition(
        canvasRef.current,
        images[1],
        canvasRef.current.width * 1.5,
        canvasRef.current.height,
        canvasRef.current.width / 2,
        canvasRef.current.height / 2
      );
    }
    if (images.length >= 3) {
      await drawCanvasPosition(
        canvasRef.current,
        images[0],
        canvasRef.current.width / 2,
        canvasRef.current.height / 2,
        canvasRef.current.width / 2,
        canvasRef.current.height / 2
      );
      await drawCanvasPosition(
        canvasRef.current,
        images[1],
        canvasRef.current.width * 1.5,
        canvasRef.current.height / 2,
        canvasRef.current.width / 2,
        canvasRef.current.height / 2
      );
      await drawCanvasPosition(
        canvasRef.current,
        images[2],
        canvasRef.current.width / 2,
        canvasRef.current.height * 1.5,
        canvasRef.current.width / 2,
        canvasRef.current.height / 2
      );
      if (images.length === 4) {
        await drawCanvasPosition(
          canvasRef.current,
          images[3],
          canvasRef.current.width * 1.5,
          canvasRef.current.height * 1.5,
          canvasRef.current.width / 2,
          canvasRef.current.height / 2
        );
      }
    }
    setParams((s) => ({ ...s, isLoading: false }));
  };

  useEffect(() => {
    paintImage(images.loaded);
  }, [images.loaded]); //eslint-disable-line

  const fileSelect = () => {
    if (inputRef?.current) inputRef.current.click();
  };

  return (
    <main className={styles.paintField} ref={mainRef} style={{ width: mainWidth }}>
      <div className={styles.canvasWrap}>
        {params.isLoading ? (
          <Loader
            type="bounceDots"
            position="absolute"
            background="rgba(255, 255, 255, 0)"
            zIndex={5}
            containerType="bounceDots"
            width="60%"
            height="80%"
          />
        ) : null}
        <canvas
          ref={canvasRef}
          className={styles.canvas}
          width={mainRef?.current?.getBoundingClientRect().width - (!mainWidth ? 30 : 0)}
          height={mainRef?.current?.getBoundingClientRect().height - (!mainWidth ? 30 : 0)}
        />
        {images?.loaded?.length > 1 ? <div className={styles.verticalDivider} /> : null}
        {images?.loaded?.length > 2 ? <div className={styles.horizontalDivider} /> : null}
        {images?.loaded?.length === 3 || images?.loaded?.length === 0 ? (
          <div
            className={classnames({
              [styles.addField]: true,
              [styles.addFieldFull]: images?.loaded?.length === 0
            })}
            style={{
              width:
                images?.loaded?.length === 0
                  ? "calc(100%-30px)"
                  : canvasRef?.current?.getBoundingClientRect().width / 2 || 0,
              height:
                images?.loaded?.length === 0
                  ? "calc(100%-30px)"
                  : canvasRef?.current?.getBoundingClientRect().height / 2 || 0
            }}
          >
            <div onClick={fileSelect} className={styles.addFile}>
              <AddIcon className={styles.addIcon} />
              <span>{__("?????????????????? ???????? ?????? ??????????????????")}</span>
            </div>
          </div>
        ) : null}
      </div>
    </main>
  );
}

export default DrawZone;

DrawZone.propTypes = {
  params: PropTypes.shape({
    isLoading: PropTypes.bool,
    isChoosing: PropTypes.bool
  }),
  canvasRef: PropTypes.exact({ current: PropTypes.instanceOf(Element) }),
  mainRef: PropTypes.exact({ current: PropTypes.instanceOf(Element) }),
  images: drawImageProps,
  setParams: PropTypes.func,
  inputRef: PropTypes.exact({ current: PropTypes.instanceOf(Element) }),
  mainWidth: PropTypes.string
};
