import React from 'react'

import styles from './ContactsData.module.sass'
import {ReactComponent as StarIcon} from '../../../../../../assets/PrivateCabinet/star-2.svg'
import {ReactComponent as ShareIcon} from '../../../../../../assets/PrivateCabinet/share.svg'
import {ReactComponent as DeleteIcon} from '../../../../../../assets/PrivateCabinet/delete.svg'

import {ReactComponent as SpeechIcon} from '../../../../../../assets/PrivateCabinet/speech-bubble-2.svg'
import {ReactComponent as PhoneIcon} from '../../../../../../assets/PrivateCabinet/phone-3.svg'
import {ReactComponent as CameraIcon} from '../../../../../../assets/PrivateCabinet/video-camera.svg'
import {ReactComponent as MailIcon} from '../../../../../../assets/PrivateCabinet/mail-3.svg'
import Input from '../../Input/Input'
import classnames from 'classnames'

const icons = {
    facebook: './assets/PrivateCabinet/socials/facebook.svg',
    whatsapp: './assets/PrivateCabinet/socials/whatsapp.svg',
    twitter: './assets/PrivateCabinet/socials/twitter.svg',
    skype: './assets/PrivateCabinet/socials/skype-2.svg',
    viber: './assets/PrivateCabinet/socials/viber.svg',
    linkedin: './assets/PrivateCabinet/socials/linkedin.svg',
    telegram: './assets/PrivateCabinet/socials/telegram.svg',
    brain: './assets/PrivateCabinet/socials/brain.svg',
}

const ContactsData = ({ contact }) => {

    return (
        <div className={styles.contactsData}>

            <div className={styles.header}>
                <div
                    className={styles.profileData}
                >
                    <img
                        className={styles.profileImg}
                        src={contact?.image}
                        alt={contact?.name}
                    />
                    <p className={styles.profileName}>
                        {contact?.name}
                    </p>
                </div>
                <div>
                    <div className={styles.iconButtons}>
                        <div className={styles.iconView}>
                            <StarIcon className={styles.iconSafe} />
                        </div>
                        <div className={styles.iconView}>
                            <ShareIcon className={styles.iconShare} />
                        </div>
                        <div className={styles.iconView}>
                            <DeleteIcon className={styles.iconTrash} />
                        </div>
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
                            <span>{contact?.tel}</span>
                        </div>
                    </div>
                    <div className={styles.infoItem}>
                        <span className={styles.info}>Email:</span>
                        <div className={styles.value}>
                            <span>{contact?.email}</span>
                        </div>
                    </div>
                    <div className={styles.infoItem}>
                        <span className={styles.info}>День рождения:</span>
                        <div className={styles.value}>
                            <span>10.11.1988</span>
                        </div>
                    </div>

                    {contact?.socials &&
                        <div className={styles.infoItem}>
                            <span className={classnames({
                                [styles.info]: true,
                                [styles.links]: true,
                            })}>Профиль соц. сетей:</span>
                            <div className={styles.value}>
                                <ul className={styles.socialsList}>
                                    {contact?.socials.map((item, index) => (
                                        <li key={index}>
                                            <a href={item.link} className={styles.socialsLink}>
                                                <img src={icons[item.type]} alt={item.type}/>
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    }

                    {contact?.messengers &&
                        <div className={styles.infoItem}>
                            <span className={classnames({
                                [styles.info]: true,
                                [styles.links]: true,
                            })}>Мессенджеры:</span>
                            <div className={styles.value}>
                                <ul className={styles.socialsList}>
                                    {contact?.messengers.map((item, index) => (
                                        <li key={index}>
                                            <a href={item.link} className={styles.socialsLink}>
                                                <img src={icons[item.type]} alt={item.type}/>
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    }

                </div>

            </div>

        </div>
    )
}

export default ContactsData