import React from 'react'

import styles from './ContacSearch.module.sass'
import {imageSrc} from '../../../../../../../generalComponents/globalVariables';

const ContactSearch = ({value, onChangeHandler = () => {}, placeholder='Введите имя'}) => {

    return (
        <div className={styles.searchWrap}>
            <input
                type="search"
                value={value}
                onChange={event => onChangeHandler(event.target.value)}
                className={styles.input}
                placeholder={placeholder}
            />
            <img className={styles.icon} src={imageSrc + "assets/PrivateCabinet/magnifying-glass-2.svg"} alt="Search"/>
        </div>
    )
}

export default ContactSearch