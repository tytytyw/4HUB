import React, {useEffect, useRef, useState} from 'react';

import styles from './LangPicker.module.sass'
import {ReactComponent as ArrowIcon} from "../../assets/StartPage/arrow-point.svg";
import {ReactComponent as CheckMark} from "../../assets/PrivateCabinet/check-mark.svg";
import classNames from "classnames";
import {setStorageItem} from "../StorageHelper";
import {changeLanguage} from "../../Store/actions/main";
import {useDispatch, useSelector} from "react-redux";

const langs = [
    {lang: 'ru', title: 'ru', name: 'Русский'},
    {lang: 'uk', title: 'ua', name: 'Украинский'},
    {lang: 'en', title: 'eng', name: 'Английский'},
]

const LangPicker = () => {

    const language = useSelector(s => s.main.personalSettings.lang);
    const [lang, setLang] = useState(langs.filter(el => el.lang === language)[0] ?? langs[0])
    const [open, setOpen] = useState(false)
    const dispatch = useDispatch()

    const ref = useRef()

    useEffect(() => {
        const onClick = (event) => {
            if (!ref.current?.contains(event.target)) {
                setOpen(false)
            }
        }
        window.addEventListener('click', onClick)
        return () => window.removeEventListener('click', onClick)
    }, [])

    return (

        <div className={styles.wrapper}>

            <div
                ref={ref}
                className={classNames({
                    [styles.content]: true,
                    [styles.active]: open
                })}
            >
                <div
                    onClick={() => setOpen(!open)}
                    className={styles.info}
                >
                    <span className={styles.lang}>{lang.title}</span>
                    <ArrowIcon className={styles.arrow} />
                </div>
                <ul className={styles.list}>
                    {langs.map(item => (
                        <li
                            onClick={() => {
                                setOpen(false)
                                setLang(item)
                                setStorageItem('lang', item.lang)
                                dispatch(changeLanguage(item.lang))
                            }}
                            className={styles.item}
                            key={item.lang}
                        >
                            <p className={styles.lang}>{item.title}</p>
                            {language === item.lang && <CheckMark/>}
                        </li>
                    ))}
                </ul>
            </div>

        </div>


    );
};

export default LangPicker;