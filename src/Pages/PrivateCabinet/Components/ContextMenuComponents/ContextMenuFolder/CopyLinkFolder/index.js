import React, {useEffect, useRef, useState} from "react"

import api from "../../../../../../api";
import styles from "./CopyLink.module.sass";
import PopUp from "../../../../../../generalComponents/PopUp";
import {useSelector} from "react-redux";

function CopyLinkFolder({ nullifyAction, folder, setShowSuccessMessage }) {

    const uid = useSelector(state => state.user.uid);
    const [url, setUrl] = useState('');
    const [review, setReview] = useState({open: true, text: 'Просмотр'});
    const linkRef = useRef('');

    const saveChanges = () => {
        nullifyAction();
    }

    const getLink = () => {
        const url = `/ajax/dir_access_add.php?uid=${uid}&dir=${folder.path}&email=$GUEST$&is_read=true`;
        api.get(url)
            .then(res => setUrl(res.data.link_shere_to_user))
            .catch(err => console.log(err));
    }

    useEffect(() => {getLink()}, []) // eslint-disable-line

    const copyLink = () => {
        if(url) {
            if(navigator.clipboard && window.isSecureContext) {
                navigator.clipboard.writeText(url);
            } else {
                linkRef.current.value = url;
                linkRef.current.focus();
                linkRef.current.select();
                document.execCommand('copy');
                linkRef.current.value = '';
            }
            setShowSuccessMessage('Ссылка скопирована');
        }
    }

    return (
        <PopUp set={nullifyAction}>
            <div className={styles.copyLinkWrap}>
                <header>
                    <div className={styles.circle}>
                        <img src='/assets/PrivateCabinet/copy.svg' alt='copy'/>
                    </div>
                    <div className={styles.details}>
                        <div className={styles.title}>Скопируйте ссылку</div>
                        <div className={styles.description}>для того чтобы отправить ссылку нажмите кнопку копировать ссылку</div>
                    </div>
                </header>
                <main>
                    <div className={styles.copyLink}>
                        <div className={styles.link}>{url}</div>
                        <div className={styles.copy} onClick={copyLink}>Копировать ссылку</div>
                    </div>
                    <div className={styles.accessUsers}>
                        <div className={styles.infoWrap}>
                            <div className={styles.circle}>
                                <img src='/assets/PrivateCabinet/userIcon.svg' alt='copy'/>
                            </div>
                            <div className={styles.details}>
                                <div className={styles.title}>Предоставьте доступ пользователям и группам</div>
                                <div className={styles.description}>совместный доступ не настроен</div>
                            </div>
                        </div>
                        <div className={styles.contacts}>
                            <span>Контакты</span>
                            <img src='/assets/PrivateCabinet/play-black.svg' alt='copy'/>
                        </div>
                    </div>
                    <div className={styles.line}/>
                    <div className={styles.chosenUsers}>
                        <div className={styles.infoWrap}>
                            <div className={styles.circle}>
                                <img src='/assets/PrivateCabinet/world.svg' alt='copy'/>
                            </div>
                            <div className={styles.details}>
                                <div className={styles.title}>Доступные пользователи, у которых есть ссылка</div>
                                <div className={styles.description}>просматривать могут все у кого есть ссылка</div>
                            </div>
                        </div>
                        <div className={styles.openList}>
                            <img src='/assets/PrivateCabinet/play-black.svg' alt='copy'/>
                        </div>
                        <div className={styles.review}>
                            <span onClick={() => setReview({...review, open: !review.open})}>{review.text}</span>
                            <img src='/assets/PrivateCabinet/play-black.svg' alt='copy'/>
                            {review.open ? <div className={styles.reviewOptions}>
                                <div  className={styles.reviewOption} onClick={() => setReview({...review, text: 'Просмотр', open: false})}>
                                    <div className={`${styles.radio} ${review.text === 'Просмотр' ? styles.radioChosen : ''}`} />
                                    <div className={styles.description}>Просмотр</div>
                                </div>
                                <div className={styles.reviewOption} onClick={() => setReview({...review, text: 'Скачивание', open: false})}>
                                    <div className={`${styles.radio} ${review.text === 'Скачивание' ? styles.radioChosen : ''}`} />
                                    <div>Скачивание</div>
                                </div>
                                <div className={styles.reviewOption} onClick={() => setReview({...review, text: 'Редактировать', open: false})}>
                                    <div className={`${styles.radio} ${review.text === 'Редактировать' ? styles.radioChosen : ''}`} />
                                    <div>Редактировать</div>
                                </div>
                            </div> : null}
                        </div>
                    </div>
                </main>
                <div className={styles.buttonsWrap}>
                    <div className={styles.cancel} onClick={nullifyAction}>Отмена</div>
                    <div className={`${styles.add}`} onClick={saveChanges}>Готово</div>
                </div>
            </div>
            <input ref={linkRef} type='text' style={{display: 'none'}} />
        </PopUp>
    )
}

export default CopyLinkFolder
