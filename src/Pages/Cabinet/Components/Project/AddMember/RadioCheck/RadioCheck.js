import React from "react";

import styles from "./RadioCheck.module.sass";
import classnames from "classnames";
import { emptyProfileImage, getContactName } from "../../../MyProfile/Contacts/consts";
import PropTypes from "prop-types";
import { userInfoProps } from "../../../../../../types/UserInfo";

const RadioCheck = ({ item, name, selected, onChange }) => {
  const htmlFor = `radioCheck-${Math.random()}`;

  return (
    <div
      className={classnames({
        [styles.wrapper]: true,
        [styles.active]: item?.id === selected?.id
      })}
    >
      <input
        id={htmlFor}
        type="radio"
        name={name}
        checked={item?.id === selected?.id}
        onChange={onChange}
        className={styles.input}
      />
      <label className={styles.radioItem} htmlFor={htmlFor}>
        <span className={styles.icon}>
          <img src={item?.icon?.[0] || emptyProfileImage} alt={item?.id} />
        </span>
        <p>{getContactName(item)}</p>
      </label>
    </div>
  );
};

export default RadioCheck;

RadioCheck.defaultProps = {
  onChange: () => {}
};

RadioCheck.propTypes = {
  item: userInfoProps,
  name: PropTypes.string,
  selected: userInfoProps,
  onChange: PropTypes.func
};
