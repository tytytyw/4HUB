import React from "react";
import PopUp from "../../../../../../generalComponents/PopUp";

import styles from "./SuccessPass.module.sass";
import Button from "../../../MyProfile/Button";
import { imageSrc } from "../../../../../../generalComponents/globalVariables";
import { useLocales } from "react-localized";
import PropTypes from "prop-types";

const SuccessPass = ({ set, complete }) => {
  const { __ } = useLocales();
  return (
    <PopUp set={set}>
      <div className={styles.wrapper}>
        <div className={styles.top}>
          <div className={styles.closeWrap}>
            <div className={styles.close} onClick={() => set(false)}>
              <span className={styles.times} />
            </div>
          </div>
        </div>

        <div className={styles.content}>
          <div className={styles.titleWrap}>
            <h4 className={styles.title}>{__("Ваш пароль обновлён")}</h4>
          </div>

          <div className={styles.imageWrap}>
            <img
              className={styles.image}
              src={imageSrc + "assets/PrivateCabinet/alerts/success-pc.png"}
              alt="Warning PC"
            />
          </div>

          <div className={styles.textWrap}>
            <p className={styles.text}>
              {__("В целях безопасности, на Email Вашей учетной записи отправлено подтверждение этого изменения")}
            </p>
          </div>

          <div className={styles.actionBlock}>
            <Button
              type="submit"
              className={styles.submitBtn}
              onClick={() => {
                complete();
                set(false);
              }}
            >
              {__("Продолжить")}
            </Button>
          </div>
        </div>
      </div>
    </PopUp>
  );
};

export default SuccessPass;

SuccessPass.propTypes = {
  set: PropTypes.func,
  complete: PropTypes.func
};
