import React, {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';

import styles from './CustomizeFile.module.sass';
import api from '../../../../api';
import PopUp from '../../../../generalComponents/PopUp';
import InputField from '../../../../generalComponents/InputField';
import {tags, colors} from '../../../../generalComponents/collections';
import Error from '../../../../generalComponents/Error';
import { onChooseFiles } from '../../../../Store/actions/PrivateCabinetActions';
import Colors from '../../../../generalComponents/Elements/Colors';
import '../../../../generalComponents/colors.sass';
import Signs from '../../../../generalComponents/Elements/Signs';
import Emoji from '../../../../generalComponents/Elements/Emoji';
import File from '../../../../generalComponents/Files';

const CustomizeFile = ({title, close, info, blob, setBlob, fileLoading, setFileLoading, setProgress, onToggleSafePassword }) => {

    // const uid = useSelector(state => state.user.uid);
    const [name, setName] = useState(blob.file ? blob.file.name.slice(0, blob.file.name.lastIndexOf('.')) : '');
    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');
    const [passwordCoincide, setPasswordCoincide] = useState(false);
    const [showRepeat, setShowRepeat] = useState(true);
    const [color, setColor] = useState(colors[0]);
    const [tagOption, setTagOption] = useState({chosen: '', count: 30});
    const [sign, setSign] = useState('');
    const [emoji, setEmoji] = useState('');
    const [error, setError] = useState(false);
    const [visibility, setVisibility] = useState('password');
    const dispatch = useDispatch();
    const [display, setDisplay] = useState('block');
    const [isSafe, setIsSafe] = useState(false)

    const onSwitch = (boolean) => setShowRepeat(boolean);

    const renderTags = () => {
        return tags.map((tag, i) => {
            return <div
                key={i}
                onClick={() => onChangeTag(tag)}
            >{tag}</div>;
        })
    };

    const width = window.innerWidth;
    const generateInputWrap = () => {
        if(width >= 1440) {
            return {
                height: `${showRepeat ? '190px' : '140px'}`,
                marginBottom: `${showRepeat ? '10px' : '35px'}`
            }
        } else {
            return {
                height: `${showRepeat ? '150px' : '110px'}`,
                marginBottom: `${showRepeat ? '10px' : '35px'}`
            }
        }
    };

    const onAddFile = () => {
        // let data = new FormData();
        // data.append('uid', uid);
        // data.append('myfile', blob.file);
        // data.append('fileName', `${name}`);
        // data.append('dir', info.subPath ? info.subPath : info.path ? info.path : 'global/all');
        // data.append('tag', tagOption.chosen);
        // data.append('pass', passwordCoincide ? password : '');
        // data.append('color', color.color);
        // data.append('symbol', sign);
        // data.append('emoji', emoji);
        // setDisplay('none');
        // setFileLoading({...fileLoading, isLoading: true, file: {ext: blob.file.name.slice(blob.file.name.lastIndexOf('.') + 1), color: color.color}})

        // api.post(`/ajax/file_add.php`,
        //     data,
        //     {onUploadProgress: e => setProgress((e.loaded * 100) / e.total)})
        //     .then(res => {if(res.data.ok === 1) {
        //         setBlob({...blob, file: null, show: false});
        //     } else {setError(true)}
        //     })
        //     .catch(err => {setError(true)})
        //     .finally(() => {
        //         setDisplay('block');
        //         setFileLoading({...fileLoading, isLoading: false, percentage: 0, file: {ext: '', color: ''}});
        //         dispatch(onChooseFiles(info.subPath ? info.subPath : info.path));
        //     });
    };

    const closeComponent = () => {
        close();
        setError(false);
    };

    const onChangeTag = (chosen) => {
        const count = 30 - chosen.length;
        if(count >= 0) setTagOption({...tagOption, chosen, count});
    };

    const comparePass = (val) => {
        const pass = password.split('');
        const passRepeat = val.split('');
        let boolean = true;
        passRepeat.forEach((el, i) => {if(el !== pass[i]) boolean = false});
        setPasswordCoincide(boolean);
    };

    const getName = (val) => {
        const i = val.lastIndexOf('.');
        return {
            name: val.substring(0, i),
            format: val.substring(i + 1)
        }
    };

    const setSize = () => {
        let size = blob.file.size;
        if(size / 1000000000 > 1) size = `${(size / 1000000000).toFixed(2)} GB`;
        if(size / 1000000 > 1) size = `${(size / 1000000).toFixed(2)} MB`;
        if(size / 1000 > 1) size = `${(size / 1000).toFixed(2)} KB`;
        return size;
    };

    const onFile = e => {
        const file = e.target.files[0];
        setBlob({...blob, file});
        setName(getName(file.name).name);
    };

    return (
        <div style={{display: `${display}`}}>
            <PopUp set={close}>
                <div className={styles.createFolderWrap}>
                    <span className={styles.cross} onClick={() => setBlob({...blob, file: null, show: false})} />
                    <span className={styles.title}>{title}</span>
                    <div className={styles.fileIconWrap}>
                        <div className={`${styles.fileWrap} ${color.color !== 'grey' ? styles.redCross : undefined}`} onClick={() => setColor(colors[0])}>
                            <div className={styles.file}><File color={color.light} format={blob.file ? getName(blob.file.name).format : ''} /></div>
                        </div>
                        {!blob.file && <div className={styles.openFile}>
                            <input type='file' className={styles.inputFile} onChange={e => onFile(e)} />
                            Перетащите файл или нажмите<span> Загрузить</span>
                        </div>}
                        {blob.file && <div className={styles.picPreview}>
                            <div className={styles.format}>{getName(blob.file.name).format} {setSize()}</div>
                            <div className={styles.name}>{getName(blob.file.name).name}</div>
                            <div className={styles.fileOptions}>
                                {tagOption.chosen && <div
                                    className={`${styles.minitag} ${styles.redCross}`}
                                    onClick={() => setTagOption({...tagOption, chosen: ''})}
                                >#{tagOption.chosen}</div>}
                                <div className={styles.circle} style={{background: color.light, border: `1px solid ${color.dark}`}} />
                                {sign && <div className={styles.redCross} onClick={() => setSign('')}><img src={`./assets/PrivateCabinet/signs/${sign}.svg`} alt='emoji' /></div>}
                                {emoji && <div className={styles.redCross} onClick={() => setEmoji('')}><img src={`./assets/PrivateCabinet/smiles/${emoji}.svg`} alt='emoji' /></div>}
                                {passwordCoincide && password.length === passwordRepeat.length && showRepeat && <img className={styles.lock} src='./assets/PrivateCabinet/locked.svg' alt='lock' />}
                            </div>
                        </div>}
                    </div>
                    <div style={generateInputWrap()}
                         className={styles.inputFieldsWrap}
                    >
                        <InputField
                            model='text'
                            height={width >= 1440 ? '40px' : '30px'}
                            value={name}
                            set={setName}
                            placeholder='Имя файла'
                        />
                        <div className={styles.tagPicker}>
                            <span>#</span>
                            <input
                                className={styles.inputField}
                                type='text'
                                placeholder='Добавте #Тег'
                                value={tagOption.chosen}
                                onChange={(e) => onChangeTag(e.target.value)}
                                onFocus={() => {setTagOption({...tagOption, show: true})}}
                            />
                            <span>{tagOption.count}/30</span>
                            <div className={styles.tagList} >
                                {renderTags()}
                            </div>
                        </div>
                        <InputField
                            model='password'
                            switcher={true}
                            height={width >= 1440 ? '40px' : '30px'}
                            value={password}
                            set={setPassword}
                            placeholder='Пароль'
                            onSwitch={onSwitch}
                            visibility={visibility}
                            setVisibility={setVisibility}
                        />
                        {showRepeat && <InputField
                            model='password'
                            switcher={false}
                            height={width >= 1440 ? '40px' : '30px'}
                            value={passwordRepeat}
                            set={setPasswordRepeat}
                            placeholder='Повторите пароль'
                            visibility={visibility}
                            setVisibility={setVisibility}
                            comparePass={comparePass}
                            mistake={!passwordCoincide}
                        />}
                    </div>
                    <div className={styles.safeWrap}>
                        <div className={styles.safe}>
                            <div
                                onClick={() => {
                                    setIsSafe(!isSafe);
                                    onToggleSafePassword(!isSafe);
                                }}
                            >{isSafe && <img src='./assets/PrivateCabinet/tick-green.svg' alt='tick' />}</div>
                        </div>
                        <div className={styles.safeText}>Сохранить пароль во вкладку сейф с паролями</div>
                    </div>
                    <Colors color={color} setColor={setColor} />
                    <Signs sign={sign} setSign={setSign} />
                    <Emoji emoji={emoji} setEmoji={setEmoji} />
                    <div className={styles.buttonsWrap}>
                        <div className={styles.cancel} onClick={() => setBlob({...blob, file: null, show: false})}>Отмена</div>
                        <div className={`${blob.file ? styles.add : styles.buttonDisabled}`} onClick={() => {if(blob.file) onAddFile()}}>Добавить</div>
                    </div>
                </div>
            </PopUp>
            {error && <Error error={error} set={closeComponent} message='Файл не добавлен' />}
        </div>
    )
}

export default CustomizeFile;
