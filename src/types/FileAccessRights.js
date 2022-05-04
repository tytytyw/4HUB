import PropTypes from "prop-types";

export const userFileAccess = PropTypes.exact({
  api_key: PropTypes.string,
  chat_theme: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  code: PropTypes.string,
  confirm: PropTypes.string,
  confirm_pass: PropTypes.string,
  date_created: PropTypes.string,
  date_last: PropTypes.string,
  deadline: PropTypes.string,
  dir: PropTypes.string,
  email: PropTypes.string,
  fid: PropTypes.string,
  fname: PropTypes.string,
  id: PropTypes.string,
  id_company: PropTypes.string,
  id_user: PropTypes.string,
  id_user_to: PropTypes.string,
  is_admin: PropTypes.string,
  is_download: PropTypes.string,
  is_view: PropTypes.string,
  is_write: PropTypes.string,
  lang: PropTypes.string,
  name: PropTypes.string,
  name1: PropTypes.string,
  notify: PropTypes.string,
  pass: PropTypes.string,
  pname: PropTypes.string,
  prim: PropTypes.string,
  safe_code: PropTypes.string,
  safe_code_ut: PropTypes.string,
  sname: PropTypes.string,
  tel: PropTypes.string,
  theme: PropTypes.string,
  udir: PropTypes.string,
  uid: PropTypes.string,
  uid2: PropTypes.string,
  ut: PropTypes.string,
  user_icon: PropTypes.arrayOf(PropTypes.string),
});
