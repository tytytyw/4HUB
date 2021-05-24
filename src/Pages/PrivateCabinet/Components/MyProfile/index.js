import React, {useEffect, useState} from 'react'
import {useDispatch} from 'react-redux'

import {onGetContacts} from '../../../../Store/actions/PrivateCabinetActions'

import styles from './MyProfile.module.sass'
import {ReactComponent as UploadIcon} from '../../../../assets/PrivateCabinet/upload.svg'

import SearchField from '../SearchField'
import StorageSize from '../StorageSize'
import Notifications from '../Notifications'
import Profile from '../Profile'
import UserForm from './UserForm/UserForm'
import BottomPanel from '../ButtomPanel'
import classnames from 'classnames'
import Support from './Support/Support'
import TariffPlan from './TariffPlan/TariffPlan'
import Contacts from './Contacts/Contacts'
import Programs from './Programs/Programs'
import TellFriend from './TellFriends/TellFriend'

const MyButton = ({ onClick = () => {}, active = false, ...props }) => (
    <button
        onClick={onClick}
        className={classnames({
            [styles.button]: true,
            [styles.active]: active
        })}
    >
        {props.text} {props.icon ?
        <span className={styles.buttonIcon}>
            {props.icon}
        </span> : null}
    </button>
)

const MyProfile = () => {

    const [pageOption, setPageOption] = useState('personal_data')
    const [popup, setPopup] = useState(false)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(onGetContacts())
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className={styles.wrapper}>

            <div className={styles.header}>
                <SearchField/>
                <div className={styles.infoHeader}>
                    <StorageSize/>
                    <Notifications/>
                    <Profile/>
                </div>
            </div>

            <div className={styles.content}>

                <div className={styles.buttons}>
                    <div className={styles.buttonsList}>
                        <MyButton
                            text='Личные данные'
                            active={pageOption === 'personal_data'}
                            onClick={() => setPageOption('personal_data')}
                        />
                        <MyButton
                            text='Служба поддержки'
                            active={pageOption === 'support'}
                            onClick={() => setPageOption('support')}
                        />
                        <MyButton
                            text='Тарифный план'
                            active={pageOption === 'tariff_plan'}
                            onClick={() => setPageOption('tariff_plan')}
                        />
                        <MyButton
                            text='Контакты'
                            active={pageOption === 'contacts'}
                            onClick={() => setPageOption('contacts')}
                        />
                        <MyButton
                            text='Подключенные прораммы'
                            active={pageOption === 'programs'}
                            onClick={() => setPageOption('programs')}
                        />
                        <div className={styles.buttonsRight}>
                            <MyButton
                                text='Рассказать друзьям'
                                icon={<UploadIcon/>}
                                alt='Upload'
                                active={popup}
                                onClick={() => setPopup(true)}
                            />
                        </div>
                    </div>
                </div>

                {pageOption === 'personal_data' && <UserForm/>}
                {pageOption === 'support' && <Support/>}
                {pageOption === 'tariff_plan' && <TariffPlan/>}
                {pageOption === 'contacts' && <Contacts/>}
                {pageOption === 'programs' && <Programs/>}

            </div>

            {popup &&
                <TellFriend
                    set={setPopup}
                />}

            <BottomPanel/>

        </div>
    )
}

export default MyProfile