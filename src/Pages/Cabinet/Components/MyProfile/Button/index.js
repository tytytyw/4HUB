import React from "react";

import styles from "./Button.module.sass";
import classnames from "classnames";
import PropTypes from "prop-types";

const Button = ({
  children,
  type = "button",
  disabled = false,
  className,
  onClick = () => {}
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className={classnames({
        [styles.button]: true,
        [className]: true
      })}
      onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;

Button.propTypes = {
  children: PropTypes.node,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  onClick: PropTypes.func
};
Button.defaultProps = {
  type: "button",
  disabled: false,
  onClick: () => {}
};
