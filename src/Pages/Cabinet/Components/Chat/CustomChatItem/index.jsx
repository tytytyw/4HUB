import React from "react";
import styles from "./CustomChatItem.module.sass";
import classNames from "classnames";

const CustomChatItem = ({
	selectedContact,
	setSelectedContact,
	sideMenuCollapsed,
	chatItem,
	title,
	subtitle,
	avatar,
	isSubList = false,
	setCollapseMembersList,
	status,
	contextMenu='contextMenu'
}) => {
    const onChatItemClick = () => {
        if (chatItem?.id === selectedContact?.id && setCollapseMembersList) setCollapseMembersList(state => !state)
			// else if (contextMenu==='checkBox') setSelectedContact(state => state.filter(contact => contact !== chatItem?.id))
				else setSelectedContact({...chatItem, status})
    }
	return (
		<div
			className={classNames({
				[styles.item]: true,
				[styles.sublist]: isSubList,
				[styles.active]: selectedContact && selectedContact?.id === chatItem.id,
			})}
			onClick={onChatItemClick}
			title={sideMenuCollapsed ? title : ""}
		>
			<div className={styles.groupName}>
				<img src={avatar} alt="avatar" className={styles.avatar} />
				{sideMenuCollapsed ? null : (
					<div className={styles.info}>
						<div className={styles.title}>{title}</div>
						<div className={styles.subtitle}>{subtitle}</div>
					</div>
				)}
			</div>
			<div className={styles.functionWrap}>
				{contextMenu === 'contextMenu' ? <div className={styles.menuWrap} // onClick={e => setMouseParams({x: e.clientX, y: e.clientY, width: 200, height: 25})}
				>
					<span className={styles.menu} />
				</div> : null}
				{contextMenu === 'checkBox' ?
					<div className={classNames({[styles.radioContact]: true, [styles.radioContactChosen]: selectedContact?.filter(c => c.id === chatItem.id).length})} />
				: null}
			</div>
		</div>
	);
};

export default CustomChatItem;