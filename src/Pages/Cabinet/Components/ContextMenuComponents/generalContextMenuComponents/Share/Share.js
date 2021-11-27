import React, {useState, useEffect} from 'react';
import File from '../../../../../../generalComponents/Files';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import styles from './Share.module.sass';
import api from '../../../../../../api';
import PopUp from '../../../../../../generalComponents/PopUp';
import Error from '../../../../../../generalComponents/Error';
import {imageSrc} from '../../../../../../generalComponents/globalVariables';
import StoragePeriod from '../StoragePeriod/StoragePeriod';
import ShareToMessengers from '../ShareToMessengers/ShareToMessengers';
import SetPassword from '../SetPassword/SetPassword'
import { ReactComponent as Password } from '../../../../../../assets/PrivateCabinet/password.svg';
import { ReactComponent as Calendar } from '../../../../../../assets/PrivateCabinet/calendar-6.svg';
import { ReactComponent as Pensil } from '../../../../../../assets/PrivateCabinet/edit.svg';
import { ReactComponent as Eye } from '../../../../../../assets/PrivateCabinet/eye.svg';

function Share({file, files, close, action_type, setShowSuccessMessage, setLoadingType}) {
    const [error, setError] = useState(false);
    const [emptyField, setEmptyField] = useState(false);
    const [displayStotagePeriod, setDisplayStotagePeriod] = useState(false);
    const [displaySetPassword, setDisplaySetPassword] = useState(false);
    const [displayMessengers, setDisplayMessengers] = useState(false);
    const [dateValue, setDateValue] = useState('');
    const [timeValue, setTimeValue] = useState({hours: '', minutes: '', seconds: ''});
    const [password, setPassword] = useState("");
    const uid = useSelector(state => state.user.uid);
    const [data, setData] = useState(
        {
            uid,
            fids: files.length ? [...files] : [file.fid],
            user_to: '',
            prim: '',
            deadline: '',
            pass: ''
    })
    const setTime = (time, limit) => {
        return time < limit
        ? time < 10 ? `0${time}` : time
        : time[0];
    }

    useEffect(()=> {
        if (action_type === 'share') {
            setData(data => ({...data, is_write: 0, dir: file.gdir}))
        }
    },[]) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(()=> {
        setData(data => ({...data, deadline: dateValue ? `${dateValue} ${timeValue.hours ? setTime(timeValue.hours, 24) : '23'}:${timeValue.minutes ? setTime(timeValue.minutes, 60) : '59'}` : ''}))
    },[dateValue, timeValue]) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(()=> {
        setData(data => ({...data, pass: password}))
    },[password]) // eslint-disable-line react-hooks/exhaustive-deps

    const onShareFile = () => {
        setLoadingType('squarify')
        api.post(`/ajax/file_${action_type}.php`, data)
            .then(res => {
                if(res.data.ok === true) {
                    setShowSuccessMessage('Отправлено')
                    close()
                } else if (res.data.error) {
                    setError(res.data.error === 'user_to not found' ? 'Пользователь не найден' : res.data.error)
                } else {
                    setError('Что-то пошло не так. Повторите попытку позже')
                    console.log(res)
                }
            })
            .catch(err => {setError(`${err}`)})
            .finally(() => setLoadingType(''))
    }

    return (
        <PopUp set={close}>
            {!displayStotagePeriod && !displayMessengers && <div className={styles.ShareFile_wrap}>
                {data.fids.length > 1 ? null : <div className={classNames(styles.header, styles.border_bottom)}>
                    <div className={styles.innerFileWrap}>
                        <File color={file.id_color} format={file.ext} />
                        {file.is_pass ? <img className={styles.lock} src={`${imageSrc}assets/PrivateCabinet/locked.svg`} alt='lock' /> : null}
                    </div>
                    <div className={styles.descriptionWrap}>
                        <div className={styles.fileName}>{file.name}</div>
                        <div className={styles.innerFileInfo}>
                            <div className={styles.descriptionGroup}>
                                <div
                                    className={classNames({
                                        [styles.tagBlock]: true,
                                        [styles.ftag]: !!file?.tag,
                                    })}
                                >
                                    {file?.tag && `#${file.tag}`}
                                </div>
                                {file.fig && (
                                    <img
                                        src={`${imageSrc}assets/PrivateCabinet/signs/${file.fig}.svg`}
                                        alt="sign"
                                    />
                                )}
                                {file.emo && (
                                    <img
                                        src={`${imageSrc}assets/PrivateCabinet/smiles/${file.emo}.svg`}
                                        alt="emoji"
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                    <div className={styles.buttons_wrap}>
                        <div className={styles.close_wrap}  onClick={close}>
                            <span className={styles.close} />
                        </div>
                    </div>
                </div>}
                <div className={classNames(styles.recipient, styles.border_bottom)}>
                    <p className={styles.recipient_title}>
                        Кому:
                    </p>
                    <div className={styles.recipient_mail}>
                        <input className={emptyField ? styles.empty : ''} onClick={() => setEmptyField(false)} onChange={(e)=> setData(data => ({...data, user_to: e.target.value}))} value={data.user_to} placeholder='Эл.адрес или имя' type='text'></input>
                    </div>
                    <div className={styles.recipient_messenger}>
                        <span onClick={() => setDisplayMessengers(true)}>Отправить через мессенджер</span>
                    </div>
                </div>
                <div className={classNames(styles.comment, styles.border_bottom)}>
                    <textarea onChange={(e)=> setData(data => ({...data, prim: e.target.value}))} value={data.prim}  placeholder='Добавить комментарий к Файлу' type='text'></textarea >
                </div>
                <div className={classNames(styles.row_item, styles.border_bottom)}>
                    <div className={styles.ico_wrap}>
                        <Password className={styles.row_ico} />
                    </div>
                    <div className={styles.input_wrap}>
                        <p className={styles.input_title}>Пароль</p>
                        <input id={'input_pass'} placeholder='Вы можете установить пароль на данный файл'></input>
                    </div>
                    <span onClick={() => setDisplaySetPassword(true)} className={styles.set_btn}>
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
                            <input value='Все у кого есть эта ссылка, смогут изменять файл' type='button'></input>
                        </div>
                        <span onClick={() => setShowSuccessMessage('Ссылка скопирована')} className={styles.set_btn}>Скопировать ссылку</span>
                    </div>
                    <div className={styles.row_item}>
                        <div className={styles.ico_wrap}>
                            <Eye className={styles.row_ico} />
                        </div>
                        <div className={styles.input_wrap}>
                            <p className={styles.input_title}>Может просматривать</p>
                            <input value='Все у кого есть эта ссылка, смогут просматривать файл' type='button'></input>
                        </div>
                        <span onClick={() => setShowSuccessMessage('Ссылка скопирована')} className={styles.set_btn}>Скопировать ссылку</span>
                    </div>
                </div>}
                <div className={styles.buttonsWrap}>
                        <div className={styles.add} onClick={()=> {data.user_to ? onShareFile() : setEmptyField(true)}}>Отправить</div>
                </div>
            </div>}
            {error && <Error error={error} set={close} message={error} />}
            {displayStotagePeriod && <StoragePeriod file={file} setDisplayStotagePeriod={setDisplayStotagePeriod} dateValue={dateValue} setDateValue={setDateValue} timeValue={timeValue} setTimeValue={setTimeValue} />}
            {displayMessengers && <ShareToMessengers setDisplayMessengers={setDisplayMessengers} close={close} fid={file.fid}/>}
            {displaySetPassword && <SetPassword file={file} setDisplaySetPassword={setDisplaySetPassword} password={password} setPassword={setPassword} />}
        </PopUp>
    )
}

export default Share