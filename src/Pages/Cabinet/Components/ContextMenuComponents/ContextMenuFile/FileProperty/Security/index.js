import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import styles from "./Security.module.sass";
import InputField from "../../../../../../../generalComponents/InputField";
import { imageSrc } from "../../../../../../../generalComponents/globalVariables";
import api from "../../../../../../../api";
import { useLocales } from "react-localized";
import { fileProps } from "../../../../../../../types/File";

const Security = ({ file }) => {
  const { __ } = useLocales();
  const userInfo = useSelector((state) => state.user.userInfo);
  const uid = useSelector((state) => state.user.uid);

  const [userList, setUserList] = useState([]);

  // const userList = ['Коваленко Артем', 'Надельская Ангелина', 'Филь Сергей', 'Филь Сергей', 'Надельская Ангелина'];
  // const userListRestriction = ['Коваленко Артем', 'Коваленко Артем', 'Надельская Ангелина', 'Филь Сергей', 'Филь Сергей', 'Надельская Ангелина'];
  const renderUsers = (userList) => {
    return userList.map((user, id) => {
      return (
        <span key={id} className={styles.user}>
          {user?.name}
        </span>
      );
    });
  };

  const noUsers = <div>{__("Доступ не предоставлен никому")}</div>;

  useEffect(() => {
    async function fetchUsers() {
      return await api.get(`/ajax/file_share_list.php?uid=${uid}&fid=${file?.fid}`);
    }
    fetchUsers()
      .then((res) => {
        if (!!res.data.ok && res?.data?.access) {
          setUserList(res.data.access);
        }
      })
      .catch((err) => console.error(err));
  }, []); //eslint-disable-line

  return (
    <div className={styles.securityWrap}>
      <div className={styles.infoWrap}>
        <img
          src={userInfo.icon[0] || `${imageSrc}assets/PrivateCabinet/profile-noPhoto.svg`}
          alt=""
          className={styles.icon}
        />
        <div className={styles.inputWrap}>
          <InputField height="90%" placeholder={`${userInfo.name} ${userInfo.sname}`} disabled={true} />
        </div>
      </div>
      <div className={styles.accessWrap}>
        <span>{__("Список пользователей, которым предоставлен доступ с возможностью изменить разрешение")}</span>
        <div className={styles.users}>{userList.length > 0 ? renderUsers(userList) : noUsers}</div>
      </div>
    </div>
  );
};

export default Security;

Security.propTypes = {
  file: fileProps
};
