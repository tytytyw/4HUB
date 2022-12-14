import React, { useRef, useState, useEffect } from "react";

import styles from "./CustomizeSafe.module.sass";
import Colors from "../../../../../../generalComponents/Elements/Colors";
import Signs from "../../../../../../generalComponents/Elements/Signs";
import Emoji from "../../../../../../generalComponents/Elements/Emoji";
import PopUp from "../../../../../../generalComponents/PopUp";
import { colors, useTags } from "../../../../../../generalComponents/collections";
import { onGetSafes } from "../../../../../../Store/actions/CabinetActions";
import Input from "../../../MyProfile/Input";
import SafeIcon from "../../../Safe/SafeIcon";
import ErrorPass from "../../../Safe/Popups/ErrorPass";
import Error from "../../../../../../generalComponents/Error";
import classNames from "classnames";
import api from "../../../../../../api";
import { useSelector, useDispatch } from "react-redux";
import { imageSrc } from "../../../../../../generalComponents/globalVariables";
import { useLocales } from "react-localized";
import PropTypes from "prop-types";
import { safeProps } from "../../../../../../types/Safe";

const CustomizeSafe = ({ safe, close, setLoadingType }) => {
  const { __ } = useLocales();
  const tags = useTags();
  const dispatch = useDispatch();
  const uid = useSelector((state) => state.user.uid);
  const [name, setName] = useState(safe.name);
  const [password, setPassword] = useState("");
  const [tagOption, setTagOption] = useState({ chosen: safe.tags, count: 30 });
  const [color, setColor] = useState(colors?.find((item) => item.name === safe.id_color));
  const defaultColor = "grey";
  const [sign, setSign] = useState(safe.id_fig);
  const [emoji, setEmoji] = useState(safe.id_emo);
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState(false);

  const renderTags = () => {
    return tags.map((tag, i) => {
      return (
        <div key={i} onClick={() => onChangeTag(tag)}>
          {tag}
        </div>
      );
    });
  };

  const [errors, setErrors] = useState({});

  const addErrors = () => {
    setErrors({
      name: !name,
      password: !password
    });
  };

  const formIsValid = () => {
    addErrors();
    return !!name && !!password;
  };

  const onAddSafe = (name, pass, tag, color, sign, emo, id_safe) => {
    setLoadingType("squarify");
    api
      .get(
        `/ajax/safe_edit.php?uid=${uid}&id_safe=${id_safe}&name=${name}&pass=${pass}&tag=${tag}&color=${color}&symbol=${sign}&emoji=${emo}`
      )
      .then((res) => {
        if (res.data.ok) {
          dispatch(onGetSafes());
          close();
        } else {
          if (res.data.error === "pass error") {
            setError("password");
            setErrors({ password: true });
          } else {
            setError(
              res.data.error === "user not owener of safe or safe not found"
                ? __("???????????????????????? ???? ???????????????? ?????????? ?????? ???????? ???? ????????????")
                : __("??????-???? ?????????? ???? ??????. ?????????????????? ?????????????? ??????????")
            );
          }
        }
      })
      .catch((error) => console.log(error))
      .finally(() => setLoadingType(""));
  };
  const AddSafe = () => {
    if (formIsValid()) {
      const safeObj = {
        name,
        password,
        tag: tagOption?.chosen,
        color: color?.name || defaultColor,
        sign: sign,
        emo: emoji,
        id_safe: safe.id
      };
      onAddSafe(safeObj.name, safeObj.password, safeObj.tag, safeObj.color, safeObj.sign, safeObj.emo, safeObj.id_safe);
    }
  };

  const onChangeTag = (chosen) => {
    const count = 30 - chosen.length;
    if (count >= 0) setTagOption({ ...tagOption, chosen, count });
  };

  // AutoHide .tagList after file is chosen
  const tagRef = useRef(null);
  const handleChoose = () => {
    tagRef.current.style.display = "none";
    setTimeout(() => {
      tagRef.current.style.display = "";
    }, 0);
  };

  useEffect(() => {
    if (password) setErrors({ password: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [password]);

  return (
    <>
      <PopUp set={close}>
        <div className={styles.createFolderWrap}>
          <span className={styles.cross} onClick={() => close()} />

          <div className={styles.content}>
            <span className={styles.title}>{__("???????????????????????????? ??????????")}</span>
            <div className={styles.folderIconWrap}>
              <div
                className={classNames({
                  [styles.folder]: true,
                  [styles.redCross]: color.color !== "grey"
                })}
                onClick={() => setColor(colors[0])}
              >
                <SafeIcon type={color?.name || defaultColor} className={styles.safeIcon} />
              </div>
              <div className={styles.picPreview}>
                <div className={styles.folderName}>{name}</div>
                <div className={styles.folderOptions}>
                  {tagOption.chosen && (
                    <div className={classNames(styles.minitagWrap, styles.redCross)}>
                      <div className={styles.minitag} onClick={() => setTagOption({ ...tagOption, chosen: "" })}>
                        # {tagOption.chosen}
                      </div>
                    </div>
                  )}

                  <div
                    className={classNames({
                      [styles.circleWrap]: true,
                      [styles.redCross]: color.color !== "grey"
                    })}
                    onClick={() => setColor(colors[0])}
                  >
                    <div
                      className={styles.circle}
                      style={{
                        background: color.light,
                        border: `1px solid ${color.dark}`
                      }}
                    />
                  </div>

                  {sign && (
                    <div className={classNames(styles.sign, styles.redCross)} onClick={() => setSign("")}>
                      <img src={`${imageSrc}/assets/PrivateCabinet/signs/${sign}.svg`} alt="emoji" />
                    </div>
                  )}

                  {emoji && (
                    <div className={classNames(styles.redCross, styles.emodji)} onClick={() => setEmoji("")}>
                      <img src={`${imageSrc}/assets/PrivateCabinet/smiles/${emoji}.svg`} alt="emoji" />
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className={styles.inputFieldsWrap}>
              <div className={styles.inputWrap}>
                <Input
                  name="name"
                  placeholder={__("?????? ??????????")}
                  className={styles.input}
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  isMistake={errors?.name}
                />
              </div>

              <div className={styles.tagPicker}>
                <span>#</span>
                <input
                  className={styles.inputField}
                  type="text"
                  placeholder={__("???????????????? #??????")}
                  value={tagOption.chosen}
                  onChange={(e) => onChangeTag(e.target.value)}
                  onFocus={() => {
                    setTagOption({ ...tagOption, show: true });
                  }}
                />
                <span>{tagOption.count}/30</span>
                <div className={styles.tagList} ref={tagRef} onClick={handleChoose}>
                  {renderTags()}
                </div>
              </div>

              <div className={styles.inputWrap}>
                <Input
                  type="password"
                  name="password"
                  placeholder={__("?????????????? ????????????")}
                  showPass={showPass}
                  setShowPass={setShowPass}
                  className={styles.input}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  isMistake={errors?.password}
                />
              </div>
            </div>
            <Colors color={color} setColor={setColor} />
            <Signs sign={sign} setSign={setSign} />
            <Emoji emoji={emoji} setEmoji={setEmoji} />
          </div>

          <div className={styles.buttonsWrap}>
            <div className={styles.cancel} onClick={() => close()}>
              {__("????????????")}
            </div>
            <div className={styles.add} onClick={() => AddSafe()}>
              {__("??????????????????")}
            </div>
          </div>
        </div>
        {error === "password" && <ErrorPass setError={setError} mistake={error} set={close} />}
        {error && error !== "password" && <Error error={error} set={close} message={error} />}
      </PopUp>
    </>
  );
};

export default CustomizeSafe;
CustomizeSafe.propTypes = {
  safe: safeProps,
  close: PropTypes.func,
  setLoadingType: PropTypes.func
};
