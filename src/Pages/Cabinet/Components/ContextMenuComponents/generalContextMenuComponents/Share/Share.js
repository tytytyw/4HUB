import React, {useState, useEffect} from 'react';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import styles from './Share.module.sass';
import api from '../../../../../../api';
import PopUp from '../../../../../../generalComponents/PopUp';
import Error from '../../../../../../generalComponents/Error';
import StoragePeriod from '../StoragePeriod/StoragePeriod';
import ShareToMessengers from '../ShareToMessengers/ShareToMessengers';
import SetPassword from '../SetPassword/SetPassword'
import { ReactComponent as Password } from '../../../../../../assets/PrivateCabinet/password.svg';
import { ReactComponent as Calendar } from '../../../../../../assets/PrivateCabinet/calendar-6.svg';
import FileInfo from "../../../../../../generalComponents/FileInfo/FileInfo";
import { arrayForPhpRequest } from "../../../../../../generalComponents/generalHelpers";

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
            fids: file.is_dir || !!file?.folders ? '' : files.length ? [...files] : [file.fid],
            user_to: '',
            prim: '',
            deadline: '',
            pass: '',
            is_write: 0,
    })
    const setTime = (time, limit) => {
        return time < limit
        ? time < 10 ? `0${time}` : time
        : time[0];
    }

    useEffect(()=> {
        setData(data => ({...data, deadline: dateValue ? `${dateValue} ${timeValue.hours ? setTime(timeValue.hours, 24) : '23'}:${timeValue.minutes ? setTime(timeValue.minutes, 60) : '59'}` : ''}))
    },[dateValue, timeValue]) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(()=> {
        setData(data => ({...data, pass: password}))
    },[password]) // eslint-disable-line react-hooks/exhaustive-deps

    const onShareFile = () => {
        setLoadingType('squarify')
        const newData = action_type === 'dir_access_add'
            ? `uid=${data.uid}&email=${data.user_to}&deadline=${data.deadline}&is_read=${data?.is_write}&pass=${data.pass}&dir=${file?.is_dir || file?.folders ? file.path : ''}&prim=${data.prim}`
            : `uid=${data.uid}&user_to=${data.user_to}&deadline=${data.deadline}${arrayForPhpRequest('fids', data.fids)}&is_write=${data?.is_write}&pass=${data.pass}&prim=${data.prim}`
            api.post(`/ajax/${action_type}.php?${newData}`)
            .then(res => {
                if(!!res.data.ok) {
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
            {!displayStotagePeriod && !displayMessengers && !displaySetPassword && <div className={styles.ShareFile_wrap}>
                <div className={classNames(styles.header, styles.border_bottom)}>
                    <FileInfo file={files.length > 1 ? {ext: 'FILES', count: files.length} : file}/>
                    <div className={styles.buttons_wrap}>
                        <div className={styles.close_wrap}  onClick={close}>
                            <span className={styles.close} />
                        </div>
                    </div>
                </div>
                <div className={styles.border}/>
                <div className={classNames(styles.recipient, styles.border_bottom)}>
                    <p className={styles.recipient_title}>
                        Кому:
                    </p>
                    <div className={styles.recipient_mail}>
                        <input
                            className={emptyField ? styles.empty : ''}
                            onClick={() => setEmptyField(false)}
                            onChange={(e) => setData(data => ({...data, user_to: e.target.value}))}
                            value={data.user_to}
                            placeholder='Эл.адрес или имя'
                            type='text'
                        />
                    </div>
                    <div className={styles.recipient_messenger}>
                        <span onClick={() => setDisplayMessengers(true)}>Отправить через мессенджер</span>
                    </div>
                </div>
                <div className={styles.border}/>
                <div className={classNames(styles.comment, styles.border_bottom)}>
                    <textarea
                        onChange={(e)=> setData(data => ({...data, prim: e.target.value}))}
                        value={data.prim}
                        placeholder='Добавить комментарий к файлу'
                        type='text'
                    />
                    <div className={styles.border}/>
                </div>
                <div className={classNames(styles.row_item, styles.border_bottom)}>
                    <div className={styles.ico_wrap}>
                        <Password className={styles.row_ico} />
                    </div>
                    <div className={styles.input_wrap}>
                        <p className={styles.input_title}>Пароль</p>
                        <input id={'input_pass'} value='Вы можете установить пароль на данный файл' type='button' />
                    </div>
                    <span
                        onClick={() => setDisplaySetPassword(true)}
                        className={styles.set_btn}
                    >
                        Установить
                    </span>
                </div>
                <div className={styles.border}/>
                <div className={classNames(styles.row_item, styles.border_bottom)}>
                    <div className={styles.ico_wrap}>
                        <Calendar className={styles.row_ico} />
                    </div>
                    <div className={styles.input_wrap}>
                        <p className={styles.input_title}>Срок хранения файла/папки</p>
                        <input value='Установите срок хранения файла (после завершения файл будет удален)' type='button'></input>
                    </div>
                    <span
                        onClick={() => setDisplayStotagePeriod(true)}
                        className={styles.set_btn}
                    >
                        Установить
                    </span>
                </div>
                <div className={styles.buttonsWrap}>
                    <div className={styles.cancel} onClick={close}>Отмена</div>
                    <div className={styles.add} onClick={()=> {data.user_to ? onShareFile() : setEmptyField(true)}}>Отправить</div>
                </div>
            </div>}
            {error && <Error error={error} set={close} message={error} />}
            {displayStotagePeriod && <StoragePeriod
                file={files.length > 1 ? {ext: 'FILES', count: files.length} : file}
                setDisplayStotagePeriod={setDisplayStotagePeriod}
                dateValue={dateValue}
                setDateValue={setDateValue}
                timeValue={timeValue}
                setTimeValue={setTimeValue}
            />}
            {displayMessengers && <ShareToMessengers
                setDisplayMessengers={setDisplayMessengers}
                close={close}
                fid={file.fid}
                file={files.length > 1 ? {ext: 'FILES', count: files.length} : file}
                data={data}
            />}
            {displaySetPassword && <SetPassword
                file={files.length > 1 ? {ext: 'FILES', count: files.length} : file}
                setDisplaySetPassword={setDisplaySetPassword}
                password={password}
                setPassword={setPassword}
            />}
        </PopUp>
    )
}

export default Share
