import React, {useState} from 'react'

import styles from './MyProfile.module.sass'
import uploadIcon from '../../../../assets/PrivateCabinet/upload.svg'

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
import TellFriends from './TellFriends/TellFriends'

const MyButton = ({ text, icon, alt, onClick = () => {}, active = false }) => (
    <button
        onClick={onClick}
        className={classnames({
            [styles.button]: true,
            [styles.active]: active
        })}
    >
        {text} {icon ?
        <span className={styles.buttonIcon}>
            <img src={icon} alt={alt}/>
        </span> : null}
    </button>
)

const MyProfile = (props) => {

    const [pageOption, setPageOption] = useState('personal_data')

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
                                text='Расказать друзьям'
                                icon={uploadIcon}
                                alt='Upload'
                                active={pageOption === 'tell_friends'}
                                onClick={() => setPageOption('tell_friends')}
                            />
                        </div>
                    </div>
                </div>

                {pageOption === 'personal_data' && <UserForm/>}
                {pageOption === 'support' && <Support/>}
                {pageOption === 'tariff_plan' && <TariffPlan/>}
                {pageOption === 'contacts' && <Contacts/>}
                {pageOption === 'programs' && <Programs/>}
                {pageOption === 'tell_friends' && <TellFriends/>}

            </div>

            <BottomPanel/>

        </div>
    )


}

export default MyProfile