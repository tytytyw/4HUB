import React from "react";
import styles from "./SuccessPopup.module.sass";
import Popup from "../../../../../generalComponents/PopUp";
import timesImg from "../../../../../assets/BusinessCabinet/times.svg";
import successImg from "../../../../../assets/BusinessCabinet/WelcomePage/success.svg";
import { useLocales } from "react-localized";
import PropTypes from "prop-types";

const SuccessPopup = ({ title, text, buttonText, set, style }) => {
  const { __ } = useLocales();
  if (!buttonText) {
    buttonText = __("Готово");
  }

  return (
    <Popup set={set}>
      <div className={styles.wrapper} style={style}>
        <div className={styles.contentWrapper}>
          <img onClick={set} className={styles.close} src={timesImg} alt="Close" />
          <div className={styles.header}>
            <h4 className={styles.title}>{title}</h4>
          </div>
          <div className={styles.content}>
            <div className={styles.successBlock}>
              <img src={successImg} alt="Success icon" />
            </div>
            <p className={styles.text}>{text}</p>
            <div className={styles.actionBlock}>
              <button onClick={set} className={styles.completeBtn}>
                {buttonText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Popup>
  );
};

export default SuccessPopup;

SuccessPopup.defaultProps = {
  title: "",
  text: "",
  style: {}
};

SuccessPopup.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
  buttonText: PropTypes.string,
  set: PropTypes.func.isRequired,
  style: PropTypes.exact({
    background: PropTypes.string,
    color: PropTypes.string
  })
};
