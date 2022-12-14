import React from "react";
import { useSelector } from "react-redux";
import CustomChatItem from "../../CustomChatItem";
import { imageSrc } from "../../../../../../generalComponents/globalVariables";
import { useCreateContactStatus } from "../../../../../../generalComponents/chatHelper";
import PropTypes from "prop-types";
import { userInfoProps } from "../../../../../../types/UserInfo";

const UsersList = ({
  usersList,
  search,
  selectedUsers,
  setSelectedUsers,
  userContextMenu,
  disableHover,
  currentDate
}) => {
  const gmt = useSelector((state) => state?.user?.userInfo?.gmt); // server time zone
  const createContactStatus = useCreateContactStatus();
  return (
    <>
      {usersList?.map((contact) => {
        if (
          !(
            contact?.name?.toLowerCase().includes(search.toLowerCase()) ||
            contact?.sname?.toLowerCase().includes(search.toLowerCase())
          )
        )
          return null;
        return (
          <CustomChatItem
            selectedContact={selectedUsers}
            setSelectedContact={setSelectedUsers}
            sideMenuCollapsed={false}
            chatItem={contact}
            key={"contact_" + contact.id}
            title={`${contact?.sname} ${contact?.name}`}
            subtitle={createContactStatus(
              contact.is_user,
              currentDate,
              contact.real_user_date_last,
              contact.is_online,
              gmt
            )}
            status={createContactStatus(
              contact.is_user,
              currentDate,
              contact.real_user_date_last,
              contact.is_online,
              gmt
            )}
            avatar={contact?.icon?.[0] || `${imageSrc}assets/PrivateCabinet/profile-noPhoto.svg`}
            contextMenu={userContextMenu}
            disableHover={disableHover}
            paddingRight={0}
          />
        );
      })}
    </>
  );
};

export default UsersList;

UsersList.propTypes = {
  usersList: PropTypes.arrayOf(userInfoProps),
  search: PropTypes.string,
  selectedUsers: PropTypes.arrayOf(userInfoProps),
  setSelectedUsers: PropTypes.func.isRequired,
  userContextMenu: PropTypes.string,
  disableHover: PropTypes.bool,
  currentDate: PropTypes.instanceOf(Date)
};
