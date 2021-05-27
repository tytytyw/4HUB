import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import { onGetUserInfo } from '../../Store/actions/startPageAction';
import { onGetFolders, onChooseFiles, onAddRecentFiles, onAddRecentFolders } from '../../Store/actions/PrivateCabinetActions';
import styles from './PrivateCabinet.module.sass';
import SideMenu from './Components/SideMenu';
import MyFolders from './Components/MyFolders';
import MyProfile from './Components/MyProfile';
import MyFiles from './Components/MyFiles';
import FileLoader from './Components/FileLoader';

const PrivateCabinet = () => {

    const uid = useSelector(state => state.user.uid);
    const dispatch = useDispatch();
    const [menuItem, setItem] = useState('Мои папки');
    const [collapsed, setCollapsed] = useState(false)
    const minHeight = window.outerHeight >= 1440 ? window.outerHeight * 0.8 : window.outerHeight * 0.75;
    const [filePreview, setFilePreview] = useState({view: false, file: null});

    useEffect(() => {
        dispatch(onGetUserInfo());
        dispatch(onGetFolders());
        dispatch(onChooseFiles('global/all'));
        dispatch(onAddRecentFiles());
        dispatch(onAddRecentFolders());

        let date = new Date();
        date.setHours(date.getHours() + 1);
        document.cookie = `uid=${uid};expires=${date}`;
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    //Loading multiple files info
    const inputRef = useRef();
    const [awaitingFiles, setAwaitingFiles] = useState([]);
    const [loadingFile, setLoadingFile] = useState([]);
    const [loaded, setLoaded] = useState([]);
    const onInputFiles = (e) => {
        setAwaitingFiles([...awaitingFiles].concat(...e.target.files));
        inputRef.current.value = '';
    };

    const fileSelect = () => inputRef.current.click();

    return (
        <div className={styles.mainWrap} style={{minHeight}}>
            <SideMenu
                menuItem={menuItem} setItem={setItem}
                collapsed={collapsed} setCollapsed={setCollapsed}
            />
            <div
                className={styles.workArea}
                style={{
                    minHeight,
                    width: collapsed ? `calc(100vw - 55px)` : '82%'
                }}>
                {menuItem === 'Личные данные' && <MyProfile />}
                {menuItem === 'Мои папки' && <MyFolders
                    setItem={setItem}
                    filePreview={filePreview}
                    setFilePreview={setFilePreview}
                    fileSelect={fileSelect}
                />}
                {menuItem === 'Мои файлы' && <MyFiles filePreview={filePreview} setFilePreview={setFilePreview} />}
            </div>
            {awaitingFiles.length > 0 || loadingFile.length > 0 || loaded.length > 0
                ? <FileLoader
                    awaitingFiles={awaitingFiles}
                    setAwaitingFiles={setAwaitingFiles}
                    loadingFile={loadingFile}
                    setLoadingFile={setLoadingFile}
                    loaded={loaded}
                    setLoaded={setLoaded}
                />
            : null}
            <div style={{display: 'none'}}>
                <input type='file' multiple='multiple' onChange={onInputFiles} ref={inputRef} />
            </div>

        </div>
    )
}

export default PrivateCabinet;
