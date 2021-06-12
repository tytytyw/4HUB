import React, {useState, useEffect} from 'react';
import File from '../../../../../../generalComponents/Files';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import styles from './ShareFile.module.sass';
import api from '../../../../../../api';
import PopUp from '../../../../../../generalComponents/PopUp';
import Error from '../../../../../../generalComponents/Error';
import StoragePeriod from '../StoragePeriod/StoragePeriod';
import ShareToMessengers from '../ShareToMessengers/ShareToMessengers';
import { ReactComponent as Password } from '../../../../../../assets/PrivateCabinet/password.svg';
import { ReactComponent as Calendar } from '../../../../../../assets/PrivateCabinet/calendar-6.svg';
import { ReactComponent as Pensil } from '../../../../../../assets/PrivateCabinet/edit.svg';
import { ReactComponent as Eye } from '../../../../../../assets/PrivateCabinet/eye.svg';

function ShareFile({file, close, action_type}) {
    const [error, setError] = useState(false);
    const [emptyField, setEmptyField] = useState(false);
    const [displayStotagePeriod, setDisplayStotagePeriod] = useState(false);
    const [displayMessengers, setDisplayMessengers] = useState(false);
    const [dateValue, setDateValue] = useState('');
    const [timeValue, setTimeValue] = useState({hours: '', minutes: '', seconds: ''});
    const uid = useSelector(state => state.user.uid);
    const setTime = (time, limit) => {
        return time < limit
        ? time < 10 ? `0${time}` : time
        : time[0];
    }
    const data = {
        uid,
        fid: file.fid,
        user_to: null,
        // TODO: неоткуда брать значение возможности редактирования}
    }
    if (action_type === 'share') {
        data.is_write = 1
        data.dir = file.gdir
    }
    
    const onShareFile = () => {
        if (dateValue) data.deadline = `${dateValue} ${timeValue.hours ? setTime(timeValue.hours, 24) : '23'}:${timeValue.minutes ? setTime(timeValue.minutes, 60) : '59'}`

        api.post(`/ajax/file_${action_type}.php`, {params:{...data}})
            .then(res => {console.log(res)
                if(res.data.ok === 1) {
                console.log('ok')   
                } else if (res.data.error) {
                    setError(res.data.error === 'user_to not found' ? 'Пользователь не найден' : res.data.error)
                } else {
                    setError('Что-то пошло не так. Повторите попытку позже')
                    console.log(res)
                }
            })
            .catch(err => {setError(`${err}`)})
    }

    return (
        <PopUp set={close}>
            {!displayStotagePeriod && !displayMessengers && <div className={styles.ShareFile_wrap}>
                <div className={classNames(styles.header, styles.border_bottom)}>
                    <div className={styles.innerFileWrap}>
                        <File color={file.id_color} format={file.ext} />
                        {file.is_pass ? <img className={styles.lock} src='./assets/PrivateCabinet/locked.svg' alt='lock' /> : null}
                    </div>
                    <div className={styles.descriptionWrap}>
                        <div className={styles.fileName}>{file.name.slice(0, file.name.lastIndexOf('.'))}</div>
                        <div className={styles.innerFileInfo}>
                            <div className={styles.fileSize}>{file.size_now}</div>
                            <div className={styles.descriptionGroup}>
                                {file.fig && <img src={`./assets/PrivateCabinet/signs/${file.fig}.svg`} alt='sign' />}
                                {file.emo && <img src={`./assets/PrivateCabinet/smiles/${file.emo}.svg`} alt='emoji' />}
                            </div>
                        </div>
                    </div>
                    <div className={styles.buttons_wrap}>
                        <div className={styles.close_wrap}  onClick={close}>
                            <span className={styles.close} />
                        </div>
                    </div>
                </div>
                <div className={classNames(styles.recipient, styles.border_bottom)}>
                    <p className={styles.recipient_title}>
                        Кому:
                    </p>
                    <div className={styles.recipient_mail}>
                        <input className={emptyField ? styles.empty : ''} onClick={() => setEmptyField(false)} onChange={(e)=> data.user_to = e.target.value} placeholder='Эл.адрес или имя' type='text'></input>
                    </div>
                    <div className={styles.recipient_messenger}>
                        <span onClick={() => setDisplayMessengers(true)}>Отправить через мессенджер</span>
                    </div>
                </div>
                <div className={classNames(styles.comment, styles.border_bottom)}>
                    <textarea placeholder='Добавить комментарий к Файлу' type='text'></textarea >
                </div>
                <div className={classNames(styles.row_item, styles.border_bottom)}>
                    <div className={styles.ico_wrap}>
                        <Password className={styles.row_ico} />
                    </div>
                    <div className={styles.input_wrap}>
                        <p className={styles.input_title}>Пароль</p>
                        <input id={'input_pass'} placeholder='Вы можете установить пароль на данный файл' type='password'></input>
                    </div>
                    <span className={styles.set_btn}>
                        Установить
                    </span>
                </div>
                <div className={classNames(styles.row_item, styles.border_bottom)}>
                    <div className={styles.ico_wrap}>
                        <Calendar className={styles.row_ico} />
                    </div>
                    <div className={styles.input_wrap}>
                        <p className={styles.input_title}>Срок хранения файла/папки</p>
                        <input value='Установите срок хранения файла (после завершения файл будет удален)' type='button'></input>
                    </div>
                    <span onClick={() => setDisplayStotagePeriod(true)} className={styles.set_btn}>
                        Установить
                    </span>
                </div>
                {action_type === "share" &&
                <div className={styles.share_link}>
                    <h5 className={styles.share_link_title}>Поделиться вместо этого ссылкой </h5>
                    <div className={styles.row_item}>
                        <div className={styles.ico_wrap}>
                            <Pensil className={styles.row_ico} />
                        </div>
                        <div className={styles.input_wrap}>
                            <p className={styles.input_title}>Может редактировать</p>
                            <input value='Все у кого есть эта ссылкаа, смогут изменять файл' type='button'></input>
                        </div>
                        <span className={styles.set_btn}>Скопировать ссылку</span>
                    </div>
                    <div className={styles.row_item}>
                        <div className={styles.ico_wrap}>
                            <Eye className={styles.row_ico} />
                        </div>
                        <div className={styles.input_wrap}>
                            <p className={styles.input_title}>Может просматривать</p>
                            <input value='Все у кого есть эта ссылка, смогут просматривать файл' type='button'></input>
                        </div>
                        <span className={styles.set_btn}>Скопировать ссылку</span>
                    </div>
                </div>}
                <div className={styles.buttonsWrap}>
                        <div className={styles.add} onClick={()=> {data.user_to ? onShareFile() : setEmptyField(true)}}>Отправить</div>
                </div>
            </div>}
            {error && <Error error={error} set={close} message={error} />}
            {displayStotagePeriod && <StoragePeriod file={file} setDisplayStotagePeriod={setDisplayStotagePeriod} dateValue={dateValue} setDateValue={setDateValue} timeValue={timeValue} setTimeValue={setTimeValue} />}
            {displayMessengers && <ShareToMessengers setDisplayMessengers={setDisplayMessengers} close={close} fid={file.fid}/>}
        </PopUp>
    )
}

export default ShareFile