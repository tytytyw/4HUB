import PropTypes from "prop-types";

export const filePickProps = PropTypes.exact({
  show: PropTypes.bool,
  files: PropTypes.arrayOf(PropTypes.string),
  customize: PropTypes.bool,
  intoZip: PropTypes.bool
});

export const filePreviewProps = PropTypes.exact({
  view: PropTypes.bool,
  file: PropTypes.object,
  create: PropTypes.bool
});

export const fileProps = PropTypes.exact({
  adate: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
  color: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  ctime: PropTypes.string,
  date: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
  date_archive: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  deadline: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
  deny_edit: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  edit_url: PropTypes.string,
  edit_url2: PropTypes.string,
  emo: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  ext: PropTypes.string,
  fid: PropTypes.string,
  fig: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  file: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  file_link: PropTypes.string,
  fname: PropTypes.string,
  gdir: PropTypes.string,
  is_del: PropTypes.number,
  is_archive: PropTypes.string,
  is_dir: PropTypes.number,
  is_pass: PropTypes.number,
  is_preview: PropTypes.number,
  mime_type: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  mtime: PropTypes.string,
  name: PropTypes.string,
  nameindb: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  opath: PropTypes.string,
  otime: PropTypes.string,
  path: PropTypes.string,
  preview: PropTypes.string,
  size: PropTypes.number,
  sdir: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  size_now: PropTypes.string,
  tag: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  tag2: PropTypes.string
});

export const fileChatProps = PropTypes.exact({
  name: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  type: PropTypes.string,
  tmp_name: PropTypes.string,
  error: PropTypes.number,
  size: PropTypes.number,
  link: PropTypes.string,
  fid: PropTypes.string,
  id: PropTypes.string,
  kind: PropTypes.string,
  ext: PropTypes.string,
  mime_type: PropTypes.string,
  preview: PropTypes.string,
  is_preview: PropTypes.number
});

export const fileSharedProps = PropTypes.exact({
  adate: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
  color: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  ctime: PropTypes.string,
  date: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
  date_archive: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  date_m: PropTypes.string,
  date_share: PropTypes.string,
  deadline: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
  deny_edit: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  dir: PropTypes.string,
  edit_url: PropTypes.string,
  edit_url2: PropTypes.string,
  emo: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  ext: PropTypes.string,
  fid: PropTypes.string,
  fig: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  file: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  file_link: PropTypes.string,
  fname: PropTypes.string,
  gdir: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  id_user: PropTypes.string,
  is_archive: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  is_dir: PropTypes.number,
  is_download: PropTypes.string,
  is_pass: PropTypes.number,
  is_preview: PropTypes.number,
  is_share_pass: PropTypes.number,
  is_view: PropTypes.string,
  is_write: PropTypes.string,
  mime_type: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  mtime: PropTypes.string,
  name: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  nameindb: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  opath: PropTypes.string,
  otime: PropTypes.string,
  path: PropTypes.string,
  preview: PropTypes.string,
  prim: PropTypes.string,
  sdir: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  share_pass: PropTypes.string,
  size: PropTypes.number,
  size_now: PropTypes.string,
  tag: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  tag2: PropTypes.string,
  user_icon: PropTypes.arrayOf(PropTypes.string),
  user_name: PropTypes.string,
  user_sname: PropTypes.string
});

export const fileAddCustomizationProps = PropTypes.exact({
  file: PropTypes.object,
  files: PropTypes.array,
  several: PropTypes.bool,
  show: PropTypes.bool,
  create: PropTypes.bool,
  options: PropTypes.object
});