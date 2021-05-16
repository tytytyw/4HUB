import React, {useState} from 'react'

import styles from './ContactsData.module.sass'
import {ReactComponent as StarIcon} from '../../../../../../assets/PrivateCabinet/star-2.svg'
import {ReactComponent as StarFillIcon} from '../../../../../../assets/PrivateCabinet/star-fill.svg'
import {ReactComponent as ShareIcon} from '../../../../../../assets/PrivateCabinet/share.svg'
import {ReactComponent as EditIcon} from '../../../../../../assets/PrivateCabinet/edit.svg'
import {ReactComponent as DeleteIcon} from '../../../../../../assets/PrivateCabinet/delete.svg'

import {ReactComponent as SpeechIcon} from '../../../../../../assets/PrivateCabinet/speech-bubble-2.svg'
import {ReactComponent as PhoneIcon} from '../../../../../../assets/PrivateCabinet/phone-3.svg'
import {ReactComponent as CameraIcon} from '../../../../../../assets/PrivateCabinet/video-camera.svg'
import {ReactComponent as MailIcon} from '../../../../../../assets/PrivateCabinet/mail-3.svg'
import Input from '../../Input/Input'
import classnames from 'classnames'
import {emptyProfileImage, socialsIcons} from '../consts'
import ActionApproval from '../../../../../../generalComponents/ActionApproval'
import api from '../../../../../../api'
import {useDispatch, useSelector} from "react-redux";
import {onGetContacts} from "../../../../../../Store/actions/PrivateCabinetActions";
import FormContact from "../FormContact/FormContact";
import SendFriend from "../../TellFriends/SendFriend/SendFriend";

const ContactsData = ({ selectedItem, setSelectedItem, contacts }) => {

    const dispatch = useDispatch()
    const uid = useSelector(state => state.user.uid)

    const [favourite, setFavorite] = useState(selectedItem?.is_fav != 0)
    const [delConfirm, setDelConfirm] = useState(false)

    const [contactPopup, setContactPopup] = useState(false)
    const [sendPopup, setSendPopup] = useState(false)

    const selectOtherContact = () => {

        const newContacts = []
        contacts.forEach(contact => {
            if (contact.id !== selectedItem.id) {
                newContacts.push(contact)
            }
        })

        setSelectedItem(newContacts?.[0])
    }

    const addToFavourite = () => {
        api.post(`/ajax/contacts_edit.php?uid=${uid}&id=${selectedItem?.id}`, {
            ...selectedItem,
            is_fav: !favourite
        }).then(() => {
            setFavorite(!favourite)
        })
    }

    const onDeleteConfirm = () => {
        api.get(`/ajax/contacts_del.php`, {
            params: {
                uid,
                id: selectedItem?.id
            }
        })
            .then(() => {
                selectOtherContact()
                dispatch(onGetContacts())
                setDelConfirm(false)
            })
            .catch(error => {
                console.log(error)
            })
    }

    const profileImage = selectedItem?.image || emptyProfileImage

    return (
        <div className={styles.contactsData}>

            <div className={styles.header}>
                <div
                    className={styles.profileData}
                >
                    <img
                        className={styles.profileImg}
                        src={profileImage}
                        alt={selectedItem?.name}
                    />
                    <p className={styles.profileName}>
                        {selectedItem?.name}
                    </p>
                </div>
                <div>
                    <div className={styles.iconButtons}>
                        <div
                            onClick={addToFavourite}
                            className={styles.iconView}
                        >
                            {favourite ?
                                <StarIcon
                                    className={classnames({
                                        [styles.iconStar]: true
                                    })}
                                /> :
                                <StarFillIcon
                                    className={classnames({
                                        [styles.iconStar]: true
                                    })}
                                />}
                        </div>
                        <div
                            onClick={() => setSendPopup(true)}
                            className={styles.iconView}
                        >
                            <ShareIcon className={styles.iconShare} />
                        </div>
                        <div
                            onClick={() => setContactPopup(true)}
                            className={styles.iconView}
                        >
                            <EditIcon className={styles.iconShare} />
                        </div>
                        <div
                            onClick={() => setDelConfirm(true)}
                            className={styles.iconView}
                        >
                            <DeleteIcon className={styles.iconTrash}/>
                        </div>

                        {delConfirm &&
                        <ActionApproval
                            name='Удаление контакта'
                            text={`Вы действительно хотите удалить контакт ${selectedItem?.name}?`}
                            set={() => setDelConfirm(false)}
                            callback={onDeleteConfirm}
                        >
                            <img
                                 className={styles.profileImg}
                                 src={profileImage}
                                 alt='Contact'
                            />
                        </ActionApproval>}
                    </div>
                </div>
            </div>

            <div className={styles.actionHeader}>

                <button className={styles.actionBtn}>
                    <SpeechIcon className={styles.actionBtnSvg}/>
                </button>

                <button className={styles.actionBtn}>
                    <PhoneIcon className={styles.actionBtnSvg}/>
                </button>

                <button className={styles.actionBtn}>
                    <CameraIcon className={styles.actionBtnSvg}/>
                </button>

                <button className={styles.actionBtn}>
                    <MailIcon className={styles.actionBtnSvg}/>
                </button>

            </div>

            <div className={styles.actionData}>

                <div className={styles.notes}>
                    <Input placeholder='Добавить заметку'/>
                </div>

                <div className={styles.actionInfo}>
                    <div className={styles.infoItem}>
                        <span className={styles.info}>Телефон:</span>
                        <div className={styles.value}>
                            <span>
                                {selectedItem?.tel &&
                                <ul className={styles.valueList}>
                                    {selectedItem?.tel.map((tel, index) => (
                                        <li key={index}>{tel}</li>
                                    ))}
                                </ul>}
                            </span>
                        </div>
                    </div>
                    <div className={styles.infoItem}>
                        <span className={styles.info}>Email:</span>
                        <div className={styles.value}>
                            <span>
                                {selectedItem?.email &&
                                <ul className={styles.valueList}>
                                    {selectedItem?.email.map((mail, index) => (
                                        <li key={index}>{mail}</li>
                                    ))}
                                </ul>}
                            </span>
                        </div>
                    </div>
                    <div className={styles.infoItem}>
                        <span className={styles.info}>День рождения:</span>
                        <div className={styles.value}>
                            <span>{selectedItem?.bdate}</span>
                        </div>
                    </div>

                    {selectedItem?.soc?.length > 0 &&
                        <div className={styles.infoItem}>
                            <span className={classnames({
                                [styles.info]: true,
                                [styles.links]: true,
                            })}>Профиль соц. сетей:</span>
                            <div className={styles.value}>
                                <ul className={styles.socialsList}>
                                    {selectedItem?.soc.map((item, index) => (
                                        <li key={index}>
                                            <a href={item.link} className={styles.socialsLink}>
                                                <img src={socialsIcons[item.type]} alt={item.type}/>
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    }

                    {selectedItem?.messengers &&
                        <div className={styles.infoItem}>
                            <span className={classnames({
                                [styles.info]: true,
                                [styles.links]: true,
                            })}>Мессенджеры:</span>
                            <div className={styles.value}>
                                <ul className={styles.socialsList}>
                                    {selectedItem?.messengers.map((item, index) => (
                                        <li key={index}>
                                            <a href={item.link} className={styles.socialsLink}>
                                                <img src={socialsIcons[item.type]} alt={item.type}/>
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    }

                </div>

            </div>

            {contactPopup && <FormContact
                type='edit'
                contactItem={selectedItem}
                contacts={contacts}
                set={setContactPopup}
            />}

            {sendPopup &&
            <SendFriend set={setSendPopup}/>}

        </div>
    )
}

export default ContactsData