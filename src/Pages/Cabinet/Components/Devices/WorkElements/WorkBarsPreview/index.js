import React from "react";

import styles from "./WorkBarsPreview.module.sass";
import { imageSrc } from "../../../../../../generalComponents/globalVariables";
import { useLocales } from "react-localized";

const WorkBarsPreview = () => {
  const { __ } = useLocales();
  return (
    <div className={styles.wrapper} style={{ height: "calc(100% - 90px - 55px)" }}>
      <div className={styles.content}>
        <div className={styles.workBarsPreview}>
          <div className={styles.previewImg}>
            <img src="./assets/PrivateCabinet/Bitmap.png" alt="Bitmap" />
          </div>

          <div className={styles.previewSlider}>
            <div className={styles.current}>
              <img src="./assets/PrivateCabinet/Bitmap.png" alt="Bitmap" />
            </div>

            <div className={styles.scrollBar}>
              <ul className={styles.scrollList}>
                <li className={styles.scrollItem}>
                  <img src={imageSrc + "assets/PrivateCabinet/screen.png"} alt="Screen" />
                </li>
                <li className={styles.scrollItem}>
                  <img src={imageSrc + "assets/PrivateCabinet/screen.png"} alt="Screen" />
                </li>
                <li className={styles.scrollItem}>
                  <img src={imageSrc + "assets/PrivateCabinet/screen.png"} alt="Screen" />
                </li>
                <li className={styles.scrollItem}>
                  <img src={imageSrc + "assets/PrivateCabinet/screen.png"} alt="Screen" />
                </li>
                <li className={styles.scrollItem}>
                  <img src={imageSrc + "assets/PrivateCabinet/screen.png"} alt="Screen" />
                </li>
                <li className={styles.scrollItem}>
                  <img src={imageSrc + "assets/PrivateCabinet/screen.png"} alt="Screen" />
                </li>
                <li className={styles.scrollItem}>
                  <img src={imageSrc + "assets/PrivateCabinet/screen.png"} alt="Screen" />
                </li>
                <li className={styles.scrollItem}>
                  <img src={imageSrc + "assets/PrivateCabinet/screen.png"} alt="Screen" />
                </li>
                <li className={styles.scrollItem}>
                  <img src={imageSrc + "assets/PrivateCabinet/screen.png"} alt="Screen" />
                </li>
                <li className={styles.scrollItem}>
                  <img src={imageSrc + "assets/PrivateCabinet/screen.png"} alt="Screen" />
                </li>
              </ul>
            </div>

            <div className={styles.prevImg}>
              <img src={imageSrc + "assets/PrivateCabinet/current.png"} alt="Prev" />
            </div>
          </div>
        </div>

        <div className={styles.workPreviewData}>
          <div className={styles.previewHeader}>
            <div className={styles.previewImgSm}>
              <img src={imageSrc + "assets/PrivateCabinet/Bitmap.png"} alt="Bitmap" />
            </div>
            <div className={styles.previewInfo}>
              <h4>{__("???????????? Moto")}</h4>
              <p>
                <span>JPEG</span> - <span>10</span> {__("????")}
              </p>
            </div>
          </div>

          <div className={styles.previewFileWrap}>
            <div className={styles.infoFileItem}>
              <span className={styles.itemName}>{__("????????")}</span>
              <span className={styles.addItem}>{__("???????????????? ????????")}</span>
            </div>

            <div className={styles.infoFileItem}>
              <span className={styles.itemName}>{__("????????")}</span>
              <span className={styles.colorCircle} />
            </div>

            <div className={styles.infoFileItem}>
              <span className={styles.itemName}>{__("????????????")}</span>
              <img src={`${imageSrc}assets/PrivateCabinet/smiles/cool.svg`} alt="sign" />
            </div>

            <div className={styles.infoFileItem}>
              <span className={styles.itemName}>{__("??????????")}</span>
              <span className={styles.addItem}>{__("???????????????? ????????")}</span>
            </div>

            <div className={styles.infoFileItem}>
              <span className={styles.itemName}>{__("??????")}</span>
              <span className={styles.description}>{__("#???????????? ??????????")}</span>
            </div>

            <div className={styles.infoFileItem}>
              <span className={styles.itemName}>{__("????????????")}</span>
              <span className={styles.description}>19.08.2019</span>
            </div>

            <div className={styles.infoFileItem}>
              <span className={styles.itemName}>{__("??????????????")}</span>
              <span className={styles.description}>19.08.2019</span>
            </div>

            <div className={styles.infoFileItem}>
              <span className={styles.itemName}>{__("??????????????")}</span>
              <span className={styles.description}>1920 ?? 3886</span>
            </div>

            <div className={styles.infoFileItem}>
              <span className={styles.itemName}>{__("????????????????????")}</span>
              <span className={styles.description}>72 ?? 72</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkBarsPreview;
