import React, { useState } from "react";
import { useSelector } from "react-redux";

import styles from "./Contacts.module.sass";

import ContactMenu from "./ContactMenu/ContactMenu";
import FormContact from "./FormContact/FormContact";
import ContactsAll from "./ContactsAll";
import ContactsFav from "./ContactsFav";
import { imageSrc } from "../../../../../generalComponents/globalVariables";
import { useLocales } from "react-localized";

const Contacts = () => {
  const { __ } = useLocales();
  const contacts = useSelector((state) => state.Cabinet.contactList);

  const [pageOption, setPageOption] = useState("ContactsAll");
  const [contactPopup, setContactPopup] = useState(false);

  const menuData = [
    {
      id: "NewContact",
      icon: `${imageSrc}/assets/PrivateCabinet/plus-3.svg`,
      label: __("Добавить контакт"),
      onClick: () => setContactPopup(true)
    },
    {
      id: "ContactsFav",
      icon: `${imageSrc}/assets/PrivateCabinet/star-2.svg`,
      label: __("Избранное"),
      onClick: () => setPageOption("ContactsFav")
    },
    {
      id: "ContactsAll",
      icon: `${imageSrc}/assets/PrivateCabinet/contact-book.svg`,
      label: __("Все контакты"),
      onClick: () => setPageOption("ContactsAll")
    }
  ];

  return (
    <div className={styles.contacts}>
      <div className={styles.contactMenu}>
        <ContactMenu pageOption={pageOption} data={menuData} />
      </div>

      {pageOption === "ContactsAll" && <ContactsAll data={contacts} />}
      {pageOption === "ContactsFav" && <ContactsFav data={contacts} />}

      {contactPopup && <FormContact set={setContactPopup} setPageOption={setPageOption} />}
    </div>
  );
};

export default Contacts;
