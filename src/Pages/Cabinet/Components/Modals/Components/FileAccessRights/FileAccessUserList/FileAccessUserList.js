import React, { useState } from "react";

import styles from "./FileAccessUserList.module.sass";
import { userFileAccess } from "../../../../../../../types/FileAccessRights";
import PropTypes from "prop-types";
import { ReactComponent as UserIcon } from "../../../../../../../assets/PrivateCabinet/userIcon.svg";
import { ReactComponent as PlayIcon } from "../../../../../../../assets/PrivateCabinet/play-grey.svg";
import { useLocales } from "react-localized";
import {
  ACCESS_RIGHTS_GRANTED,
  NO_ELEMENT,
  SHARED_ACCESS_RIGHTS
} from "../../../../../../../generalComponents/globalVariables";
import { useAccessRightsConst } from "../../../../../../../generalComponents/collections";
import FileAccessEdit from "./FileAccessEdit/FileAccessEdit";
import FilePeriodEdit from "./FilePeriodEdit/FilePeriodEdit";
import classNames from "classnames";
import { useSelector } from "react-redux";

function FileAccessUserList({ users, deleteUser, changeUserAccessRightsInUsers, setShowCalendar, setChosenUser }) {
  const { __ } = useLocales();
  const ACCESS_RIGHTS = useAccessRightsConst();
  const { theme } = useSelector((state) => state.user.userInfo);
  const [accessRightsModal, setAccessRightsModal] = useState(NO_ELEMENT);
  const closeAccessRightsModal = () => setAccessRightsModal(NO_ELEMENT);
  const [changePeriodModal, setChangePeriodModal] = useState(NO_ELEMENT);
  const closeChangePeriodModal = () => setChangePeriodModal(NO_ELEMENT);

  const renderUserIcon = (user) => {
    return user?.user_icon?.[0] ? (
      <img src={user?.user_icon?.[0]} alt="img" className={styles.userIcon} />
    ) : (
      <UserIcon />
    );
  };

  const showEndDate = (date) => {
    if (new Date(date).getTime() > new Date().getTime()) {
      return __(`до ${date.split(" ")[0]}`);
    }
    if (new Date().getTime() > new Date(date).getTime()) {
      return __(`неверный`);
    }
    return __("Бесконечный");
  };

  const showUserAccessStatus = (user) => {
    if (user.is_write === ACCESS_RIGHTS_GRANTED) {
      return ACCESS_RIGHTS[SHARED_ACCESS_RIGHTS.EDIT];
    }
    if (user.is_download === ACCESS_RIGHTS_GRANTED) {
      return ACCESS_RIGHTS[SHARED_ACCESS_RIGHTS.DOWNLOAD];
    }
    return ACCESS_RIGHTS[SHARED_ACCESS_RIGHTS.WATCH];
  };

  const renderUsers = () =>
    users.map((user, i) => (
      <div key={i} className={styles.user}>
        <span className={styles.cross} onClick={() => deleteUser(user)} />
        <div className={styles.userInfo}>
          <div className={styles.iconWrap}>{renderUserIcon(user)}</div>
          <div className={styles.userName}>
            {user.name} {user.sname}
          </div>
        </div>
        <div className={styles.buttons}>
          <div
            className={classNames(styles.copy, styles.date)}
            onClick={() => {
              setAccessRightsModal(NO_ELEMENT);
              setChangePeriodModal(i);
            }}
          >
            <span>{__(`Срок хранения ${showEndDate(user.deadline)}`)}</span>
            <PlayIcon className={styles.imageReverse} />
          </div>
          {changePeriodModal === i ? (
            <FilePeriodEdit
              closeChangePeriodModal={closeChangePeriodModal}
              user={user}
              setShowCalendar={setShowCalendar}
              changeUserAccessRightsInUsers={changeUserAccessRightsInUsers}
              setChosenUser={setChosenUser}
            />
          ) : null}
          <div
            className={classNames(styles.copy, styles.rights)}
            onClick={() => {
              setChangePeriodModal(NO_ELEMENT);
              setAccessRightsModal(i);
            }}
          >
            <span>{showUserAccessStatus(user)}</span>
            <PlayIcon className={styles.imageReverse} />
          </div>
          {accessRightsModal === i ? (
            <FileAccessEdit
              user={user}
              showUserAccessStatus={showUserAccessStatus}
              changeUserAccessRightsInUsers={changeUserAccessRightsInUsers}
              closeAccessRightsModal={closeAccessRightsModal}
            />
          ) : null}
        </div>
      </div>
    ));

  return <div className={classNames(styles.userListWrap, `scrollbar-thin-${theme}`)}>{renderUsers()}</div>;
}

export default FileAccessUserList;

FileAccessUserList.propTypes = {
  users: PropTypes.arrayOf(userFileAccess),
  deleteUser: PropTypes.func,
  changeUserAccessRightsInUsers: PropTypes.func,
  setShowCalendar: PropTypes.func,
  setChosenUser: PropTypes.func
};
