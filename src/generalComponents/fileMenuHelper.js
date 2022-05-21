import api from "../api";
import { onDeleteFile, onDeleteSafeFile, onLoadFiles, onSetModals } from "../Store/actions/CabinetActions";
import { checkResponseStatus } from "./generalHelpers";
import { MODALS, CART, TOP_MESSAGE_TYPE } from "./globalVariables";

export const fileDelete = (file, dispatch, uid, set, msg) => {
  api
    .post(`/ajax/file_del.php?uid=${uid}&dir=${file.gdir}&fid=${file.fid}`)
    .then((res) => {
      if (res.data.ok === 1) {
        dispatch(onDeleteFile(file));
        if (set) set(msg);
      } else {
        console.log(res?.error);
      }
    })
    .catch((err) => console.log(err));
};

export const safeFileDelete = (id_safe, file, dispatch, uid, set, msg) => {
  api
    .post(`/ajax/safe_file_del.php?uid=${uid}&fid=${file}&id_safe=${id_safe}`)
    .then((res) => {
      if (res.data.ok === 1) {
        dispatch(onDeleteSafeFile(file));
        if (set) set(msg);
      } else {
        console.log(res?.error);
      }
    })
    .catch((err) => console.log(err));
};

export const fileCartRestore = (fileId, dispatch, uid, message, __) => {
  api
    .get(`/ajax/file_restore.php?uid=${uid}&fid=${fileId}`)
    .then((res) => {
      if (checkResponseStatus(res.data.ok)) {
        dispatch(onLoadFiles(CART.API_GET_FILES, 1));
        dispatch(
          onSetModals(MODALS.TOP_MESSAGE, {
            open: true,
            type: TOP_MESSAGE_TYPE.MESSAGE,
            message
          })
        );
      } else throw new Error();
    })
    .catch(() =>
      dispatch(
        onSetModals(MODALS.ERROR, {
          open: true,
          message: __("что-то пошло не так"),
          title: __("ошибка")
        })
      )
    );
};
