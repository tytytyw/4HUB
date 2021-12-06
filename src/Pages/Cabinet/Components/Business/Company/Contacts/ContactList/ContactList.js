import React, { useEffect, useState } from "react";

import styles from "./ContacList.module.sass";
import ContactSearch from "./ContactSearch/ContactSearch";
import SearchList from "./SearchList/SearchList";
import { ReactComponent as AddContactIcon } from "../../../../../../../assets/PrivateCabinet/addContact.svg";

const ContactList = ({ data = [], selectedItem, setSelectedItem }) => {
	const [search, setSearch] = useState("");
	const [contactList, setContactList] = useState("");

	const getContactName = (contact) =>
		`${contact?.name?.trim() || ""} ${contact?.sname.trim() || ""}`;

	useEffect(() => {
		setContactList(data);
		setSearch("");
	}, [data]);
	// eslint-disable-next-line react-hooks/exhaustive-deps

	useEffect(() => {
		const searchResult = data?.filter((item) => {
			const name = getContactName(item).toLowerCase();
			const searchValue = search.toLowerCase();
			return name.includes(searchValue);
		});
		setContactList(searchResult);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [search]);

	return (
		<div className={styles.sideBar}>
			<div className={styles.search}>
				<ContactSearch
					value={search}
					onChangeHandler={(value) => setSearch(value)}
				/>
			</div>

			<div className={styles.addContact}>
				<div className={styles.iconWrap}>
					<AddContactIcon width={12} height={14} />
				</div>
				<span className={styles.text}>Добавить контакт</span>
			</div>

			<div className={styles.contactListWrap}>
				<ul className={styles.contactList}>
					{getGrouppedArray(contactList).map((contact, index) => (
						<li key={index}>
							<p className={styles.group}>{contact.group}</p>
							<SearchList
								data={contact.contacts}
								selectedItem={selectedItem}
								setSelectedItem={setSelectedItem}
								getContactName={getContactName}
							/>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

const getGrouppedArray = (initialArray) => {
	if (initialArray?.length < 1) {
		return [];
	}

	const groupedArray = [];
	let contactsItem = [];
	initialArray?.forEach((item) => {
		let firstLetter = item.name?.charAt(0);
		let findByGroup = groupedArray.find((item) => item.group === firstLetter);

		if (!findByGroup) {
			contactsItem = [];
			contactsItem.push(item);

			groupedArray.push({
				group: firstLetter,
				contacts: contactsItem,
			});
		} else {
			contactsItem.push(item);
		}
	});

	return groupedArray;
};

export default ContactList;