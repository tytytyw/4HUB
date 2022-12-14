import React from "react";
import PropTypes from "prop-types";
import styles from "./ActionApproval.module.sass";
import PopUp from "../PopUp";
import classNames from "classnames";

const ActionApproval = ({ set, text, name, children, callback, approve, childrenWidth, disableActionBtn, style }) => {
  return (
    <PopUp set={set}>
      <div className={styles.wrap} style={style}>
        <span className={styles.cross} onClick={set} />
        <span className={styles.title}>{name}</span>
        <div style={{ width: childrenWidth }} className={styles.children}>
          {children}
        </div>
        <div className={classNames({ [styles.text]: !!text })}>{text}</div>
        <div className={styles.buttonsWrap}>
          <div className={styles.cancel} onClick={set}>
            Отмена
          </div>
          <div
            className={classNames({
              [styles.action]: true,
              [styles.disableBtn]: disableActionBtn
            })}
            onClick={callback}
          >
            {approve}
          </div>
        </div>
      </div>
    </PopUp>
  );
};

export default ActionApproval;

ActionApproval.propTypes = {
  set: PropTypes.func,
  text: PropTypes.string,
  name: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.element), PropTypes.element]),
  callback: PropTypes.func,
  approve: PropTypes.string,
  childrenWidth: PropTypes.string,
  disableActionBtn: PropTypes.bool,
  style: PropTypes.exact({
    background: PropTypes.string,
    color: PropTypes.string
  })
};

ActionApproval.defaultProps = {
  childrenWidth: "",
  disableActionBtn: false,
  style: {}
};
