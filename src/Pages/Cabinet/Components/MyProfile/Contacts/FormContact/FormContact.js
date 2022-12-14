import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import classnames from "classnames";
import { imageSrc } from "../../../../../../generalComponents/globalVariables";
import styles from "./FormContact.module.sass";
import arrowImage from "../../../../../../assets/PrivateCabinet/signs-2.svg";
import calendarImage from "../../../../../../assets/PrivateCabinet/calendar-6.svg";

import AddSocials from "./AddSocials";
import PopUp from "../../../../../../generalComponents/PopUp";
import ProfileUpload from "../../UserForm/ProfileUpload";
import Calendar from "../../../../../StartPage/Components/Calendar";
import Button from "../../Button";

import { messengersIcons, socialsIcons } from "../consts";
import Input from "../../Input";
import { onGetContacts } from "../../../../../../Store/actions/CabinetActions";
import { formIsValid, isCorrectData } from "../../Input/validation";
import api from "../../../../../../api";
import { useLocales } from "react-localized";
import PropTypes from "prop-types";
import { selectedItemProps } from "../../../../../../types/Contacts";

const FormContact = ({ set, type, selectedItem, setPageOption = () => {} }) => {
  const { __ } = useLocales();
  const dispatch = useDispatch();
  const uid = useSelector((state) => state.user.uid);

  const [formChanged, setFormChanged] = useState(true);
  const [blur, setBlur] = useState({});
  const [errors, setErrors] = useState({});
  const [submitErrors, setSubmitErrors] = useState({});

  const [fields, setFields] = useState({ ...selectedItem });

  const [numbers, setNumbers] = useState(selectedItem?.tel || []);
  const [mails, setMails] = useState(selectedItem?.email || []);
  const [socials, setSocials] = useState(selectedItem?.soc || []);
  const [messengers, setMessengers] = useState(selectedItem?.mes || []);

  const [socPopup, setSocPopup] = useState(false);
  const [messPopup, setMessPopup] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const formRef = useRef();

  const uploadImage = (event) => {
    const file = event.target.files[0] ?? null;
    if (file && file.type.substr(0, 5) === "image") {
      setImage(file);
    } else {
      setImage(null);
    }
  };

  useEffect(() => {
    const profileImage = fields?.icon?.[0];
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(image);
    } else {
      setPreview(profileImage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [image]);

  const resetForm = () => {
    setFields({});
    setFormChanged(false);
    setBlur({});
    setErrors({});
    setSubmitErrors({});
  };

  const onBlurHandler = (event) => {
    const { name } = event.target;
    setBlur({ ...blur, [name]: true });
  };

  const onChangeHandler = (event) => {
    let { value, name } = event.target;

    if (!isCorrectData(value, name, fields, ["name"])) {
      setErrors({ ...errors, [name]: true });
    } else {
      setErrors({ ...errors, [name]: false });
      setSubmitErrors({ ...submitErrors, [name]: false });
    }

    setFields({ ...fields, [name]: value });
  };

  const filterArray = (array) => {
    const result = [];
    array.forEach((item) => {
      let isBool = !!item;
      if (isBool) {
        result.push(item);
      }
    });
    return result;
  };

  const onSubmit = (event) => {
    event.preventDefault();

    if (formChanged && formIsValid(fields, setSubmitErrors, ["name"])) {
      let apiUrl = type === "edit" ? "contacts_edit.php" : "contacts_add.php";

      const formData = new FormData(formRef.current);
      formData.append("file", image);
      formData.append("tel", JSON.stringify(filterArray(numbers)));
      formData.append("email", JSON.stringify(filterArray(mails)));
      formData.append("soc", JSON.stringify(filterArray(socials)));
      formData.append("mes", JSON.stringify(filterArray(messengers)));

      api
        .post(`/ajax/${apiUrl}?uid=${uid}&id=${selectedItem?.id}`, formData)
        .then(async () => {
          dispatch(onGetContacts());
          resetForm();
          set(false);
          type !== "edit" && setPageOption("ContactsAll");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const isMistake = (name) => (errors?.[name] && blur?.[name]) || submitErrors?.[name];

  const setDateValue = (dateValue) => {
    setFields({ ...fields, bdate: dateValue });
  };

  if (type === "edit" && !selectedItem?.id) return null;

  return (
    <PopUp set={set}>
      <form
        ref={formRef}
        noValidate
        onSubmit={onSubmit}
        onChange={() => setFormChanged(true)}
        className={styles.wrapper}
      >
        <div className={styles.top}>
          <span className={styles.close} onClick={() => set(false)}>
            <span className={styles.times} />
          </span>
        </div>

        <div className={styles.content}>
          <div className={styles.header}>
            <p className={styles.title}>{type === "edit" ? __("?????????????????????????? ??????????????") : __("???????????????? ??????????????")}</p>
            <div className={styles.uploadBlock}>
              <ProfileUpload name="profileImg" preview={preview} onChange={uploadImage} />
            </div>
          </div>

          <div className={styles.formContent}>
            <div className={styles.formItem}>
              <div className={styles.formBlock}>
                <span
                  className={classnames({
                    [styles.info]: true,
                    [styles.errorInfo]: isMistake("name")
                  })}
                >
                  {__("??????:")}
                </span>
                <Input
                  name="name"
                  className={styles.input}
                  isMistake={isMistake("name")}
                  value={fields?.name || ""}
                  onChange={onChangeHandler}
                  onBlur={onBlurHandler}
                />
              </div>
            </div>

            <div className={styles.formItem}>
              <div className={styles.formBlock}>
                <span
                  className={classnames({
                    [styles.info]: true,
                    [styles.errorInfo]: isMistake("sname")
                  })}
                >
                  {__("??????????????:")}
                </span>
                <Input
                  name="sname"
                  className={styles.input}
                  isMistake={isMistake("sname")}
                  value={fields?.sname || ""}
                  onChange={onChangeHandler}
                  onBlur={onBlurHandler}
                />
              </div>
            </div>

            <div className={styles.formItem}>
              <div className={styles.formBlock}>
                <span className={styles.info}>{__("????????????????:")}</span>
                <Input
                  name="company"
                  className={styles.input}
                  value={fields?.company || ""}
                  onChange={onChangeHandler}
                  onBlur={onBlurHandler}
                />
              </div>
            </div>

            <div className={styles.formItem}>
              {numbers.map((number, index) => (
                <div className={styles.formBlock} key={index}>
                  <div className={styles.infoWrap}>
                    <span
                      onClick={() => {
                        numbers.splice(index, 1);
                        setNumbers([...numbers]);
                      }}
                      className={styles.minusBtn}
                    />
                    <span className={styles.info}>{__("?????????????? ?????????? ????????????????:")}</span>
                  </div>
                  <Input
                    phone={true}
                    //name={`number-${index}`}
                    onChange={(event) => {
                      numbers[index] = event.target.value;
                      setNumbers([...numbers]);
                    }}
                    className={styles.input}
                    value={number}
                  />
                </div>
              ))}
              <div
                className={classnames({
                  [styles.formBlock]: true,
                  [styles.clickable]: true
                })}
                onClick={() => setNumbers([...numbers, ""])}
              >
                <img className={styles.infoImg} src={imageSrc + "assets/PrivateCabinet/plus-3.svg"} alt="new_contact" />
                <span className={styles.info}>{__("???????????????? ?????????? ????????????????:")}</span>
              </div>
            </div>

            <div className={styles.formItem}>
              {mails.map((mail, index) => (
                <div className={styles.formBlock} key={index}>
                  <span
                    onClick={() => {
                      mails.splice(index, 1);
                      setMails([...mails]);
                    }}
                    className={styles.minusBtn}
                  />
                  <span className={styles.info}>{__("?????????????? @mail:")}</span>
                  <Input
                    type="email"
                    onChange={(event) => {
                      mails[index] = event.target.value;
                      setMails([...mails]);
                    }}
                    className={styles.input}
                    value={mail}
                  />
                </div>
              ))}
              <div
                className={classnames({
                  [styles.formBlock]: true,
                  [styles.clickable]: true
                })}
                onClick={() => setMails([...mails, ""])}
              >
                <img className={styles.infoImg} src={imageSrc + "assets/PrivateCabinet/plus-3.svg"} alt="new_contact" />
                <span className={styles.info}>{__("???????????????? @mail:")}</span>
              </div>
            </div>

            <div className={styles.formItem}>
              <div className={styles.formBlock}>
                <span className={styles.info}>{__("???????????????? ???????? ????????????????:")}</span>
                <Input name="bdate" onChange={onChangeHandler} value={fields?.bdate || ""} className={styles.input} />
                <div onClick={() => setShowCalendar(true)} className={styles.icon}>
                  <img src={calendarImage} alt="Calendar" />
                </div>
              </div>
            </div>

            <div className={styles.formItem}>
              <div className={styles.formBlock}>
                <span className={styles.info}>???????????????? ?????????????? ??????.????????:</span>
                <ul className={styles.socialsList}>
                  {socials.map(
                    (item, index) =>
                      !!item.link && (
                        <li key={index}>
                          <img src={socialsIcons[item.type]} alt={item.type} className={styles.socialsImg} />
                        </li>
                      )
                  )}
                </ul>
                <div onClick={() => setSocPopup(true)} className={styles.icon}>
                  <img src={arrowImage} alt="Arrow" />
                </div>
              </div>
            </div>

            <div className={styles.formItem}>
              <div className={styles.formBlock}>
                <span className={styles.info}>{__("???????????????? ??????????????????????:")}</span>
                <ul className={styles.socialsList}>
                  {messengers.map(
                    (item, index) =>
                      !!item.link && (
                        <li key={index}>
                          <img src={messengersIcons[item.type]} alt={item.type} className={styles.socialsImg} />
                        </li>
                      )
                  )}
                </ul>
                <div onClick={() => setMessPopup(true)} className={styles.icon}>
                  <img src={arrowImage} alt="Arrow" />
                </div>
              </div>
            </div>

            <Input
              name="prim"
              className={styles.inputStyle}
              placeholder={__("??????????????")}
              value={fields?.prim || ""}
              onChange={onChangeHandler}
              onBlur={onBlurHandler}
            />
          </div>
        </div>

        <div className={styles.submitBlock}>
          <Button className={styles.cancelBtn} onClick={() => set(false)}>
            {__("????????????")}
          </Button>
          <Button type="submit" className={styles.submitBtn}>
            {__("??????????????????")}
          </Button>
        </div>
      </form>

      {socPopup && <AddSocials type="soc" values={socials} setValues={setSocials} set={setSocPopup} />}

      {messPopup && <AddSocials values={messengers} setValues={setMessengers} set={setMessPopup} />}

      {showCalendar && (
        <PopUp set={setShowCalendar} zIndex={102}>
          <Calendar datePicker={true} setShowCalendar={setShowCalendar} setDateValue={setDateValue} />
        </PopUp>
      )}
    </PopUp>
  );
};

export default FormContact;

FormContact.propTypes = {
  set: PropTypes.func,
  type: PropTypes.string,
  selectedItem: selectedItemProps,
  setPageOption: PropTypes.func
};
FormContact.defaultProps = {
  setPageOption: () => {}
};
