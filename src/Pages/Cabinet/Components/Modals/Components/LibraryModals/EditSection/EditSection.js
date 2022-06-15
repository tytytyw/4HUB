import React from "react";
import styles from "./EditSection.module.sass";
import SubmitButtons from "../../SubmitButtons/SubmitButtons";
import { LIBRARY, LIBRARY_MODALS, MODALS } from "../../../../../../../generalComponents/globalVariables";
import PropTypes from "prop-types";
import { editSectionParams } from "../../../../../../../types/Library";
import { useDispatch, useSelector } from "react-redux";
import { useLocales } from "react-localized";
import { onLoadFolders, onSetModals } from "../../../../../../../Store/actions/CabinetActions";
import InputField from "../../../../../../../generalComponents/InputField";
import { ReactComponent as PlayIcon } from "../../../../../../../assets/PrivateCabinet/play-grey.svg";
import api from "api";
import { checkResponseStatus, getDepartment } from "generalComponents/generalHelpers";

function EditSection({ type, params, closeModal }) {
  const { __ } = useLocales();
  const dispatch = useDispatch();
  const uid = useSelector((state) => state.user.uid);
  const dirName = useSelector((state) => state.Cabinet.folderList.path);

  const onChangeTitle = (title) => {
    dispatch(onSetModals(MODALS.LIBRARY, { type, params: { ...params, title } }));
  };

  const showMessage = (message) => {
    dispatch(onSetModals("topMessage", { open: true, type: "message", message }));
    closeModal();
  };

  const editSection = () => {
    const method = type === LIBRARY_MODALS.RENAME_SECTION ? "dir_edit.php" : "dir_add.php";
    const parent = type === LIBRARY_MODALS.RENAME_SECTION ? "" : "&parent=other";
    const modalMessage = type === LIBRARY_MODALS.RENAME_SECTION ? __("Раздел изменён") : __("Раздел добавлен");
    const dirNameNew = LIBRARY_MODALS.RENAME_SECTION ? `&dir_name_new=other/${params.title}` : "";

    const url = `uid=${uid}&dir_name=${dirName}${dirNameNew}${parent}&dep=${getDepartment()}`;

    api
      .post(`/ajax/${method}?${url}`)
      .then((res) => {
        if (checkResponseStatus(res.data.ok)) {
          dispatch(onLoadFolders(LIBRARY.API_GET_FOLDERS));
          showMessage(modalMessage);
        } else {
          showMessage(__("Что-то пошло не так. Повторите попытку позже"));
        }
      })
      .catch(() => {
        showMessage(__("Что-то пошло не так. Повторите попытку позже"));
      });
  };

  return (
    <div className={styles.addSectionWrap}>
      <InputField
        model="text"
        value={params.title}
        set={onChangeTitle}
        placeholder={__("Имя раздела")}
        editableClass={"fixedHeight"}
      />
      <div className={styles.margin} />
      <InputField
        model="text"
        value={params.title}
        set={onChangeTitle}
        placeholder={__("Иконка раздела")}
        editableClass={"fixedHeight"}
        icon={<PlayIcon className={styles.playButton} />}
      />
      <SubmitButtons type={type} closeModal={closeModal} onSubmit={editSection} />
    </div>
  );
}

export default EditSection;

EditSection.defaultProps = {
  closeModal: () => {}
};

EditSection.propTypes = {
  type: PropTypes.oneOf(Object.values(LIBRARY_MODALS)).isRequired,
  params: editSectionParams.isRequired,
  closeModal: PropTypes.func
};
