import React, {useEffect, useRef, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'

import { onGetUserInfo } from '../../Store/actions/startPageAction'
import { onGetFolders, onChooseFiles, onAddRecentFiles, onAddRecentFolders } from '../../Store/actions/CabinetActions'
import styles from './PrivateCabinet.module.sass'
import SideMenu from './Components/SideMenu'
import MyFolders from './Components/MyFolders'
import Safe from './Components/Safe'
import Devices from './Components/Devices'
import MyProfile from './Components/MyProfile'
import MyFiles from './Components/MyFiles'
import FileLoader from './Components/FileLoader'
import Programs from "./Components/Programs"

import {Switch, Route, useHistory, Redirect} from 'react-router'
import Settings from './Components/MyProfile/settings'
import Project from './Components/Project';
import SharedFiles from './Components/SharedFiles';
import DownloadedFiles from './Components/DownloadedFiles';
import {setPreviewTheme} from '../../Store/actions/main';
import Archive from './Components/Archive';
import Journal from './Components/Journal';
import CalendarPage from './Components/CalendarPage';
import Cart from './Components/Cart';
import Loader from '../../generalComponents/Loaders/4HUB';
import Chat from "./Components/Chat";
import {businessMenu, menu} from "./Components/SideMenu/listHelper";
import api from "../../api";
import Company from "./Components/Business/Company";

const PrivateCabinet = () => {

    const uid = useSelector(state => state.user.uid);
    const id_company = useSelector(state => state.user.id_company);
    const path = useSelector(state => state.Cabinet.fileList?.path);
    const dispatch = useDispatch();
    const [collapsed, setCollapsed] = useState(false);
    //const minHeight = window.outerHeight >= 1440 ? window.outerHeight * 0.8 : window.outerHeight * 0.75;
    const [filePreview, setFilePreview] = useState({view: false, file: null, create: false});
    const [fileAddCustomization, setFileAddCustomization] = useState({show: false, file: {}, several: false, files: []});
    const [fileErrors, setFileErrors] = useState([]);
    const [menuItem, setMenuItem] = useState('');
    const [loadingType, setLoadingType] = useState('');
    const [filesPage, setFilesPage] = useState(1);

    const history = useHistory()

    history.listen(() => {
        const route = history?.location.pathname
        if (route !== 'settings') {
            dispatch(setPreviewTheme(null))
        }
    })

    const stayOnline = (time) => {
        setTimeout(() => {
            api.post(`ajax/user_alive.php?uid=${uid}`)
                .finally(() => stayOnline(60000));
        }, time)
    }

    useEffect(() => {

        dispatch(onGetUserInfo());
        dispatch(onGetFolders());
        dispatch(onChooseFiles('global/all', '', 1));
        dispatch(onAddRecentFiles());
        dispatch(onAddRecentFolders());

        let date = new Date();
        date.setHours(date.getHours() + 1);
        document.cookie = `uid=${uid};expires=${date}`;
        document.cookie = `id_company=${id_company};expires=${date}`;
        stayOnline(0);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    //Loading multiple files info
    const inputRef = useRef();
    const [awaitingFiles, setAwaitingFiles] = useState([]);
    const [loadingFile, setLoadingFile] = useState([]);
    const [loaded, setLoaded] = useState([]);
    const onInputFiles = (e) => {
        const files = [...e.target.files].map(file => {return {file, options: {filePath: path}}});
        setAwaitingFiles([...awaitingFiles].concat(...files));
        inputRef.current.value = '';
    };

    const fileSelect = () => inputRef.current.click();

    const handleDragOver = e => e.preventDefault();

    const nullifyAddingSeveralFiles = () => setFileAddCustomization({...fileAddCustomization, several: false, files: []});

    const saveCustomizeSeveralFiles = (options) => {
        const arr = fileAddCustomization.files.map(obj => ({file: obj.file, options: {...obj.options, ...options}}));
        setAwaitingFiles([...awaitingFiles, ...arr]);
    }

    return (
        <div
            className={styles.mainWrap}
            //style={{minHeight}}
            onDragOver={handleDragOver}
        >
            <SideMenu
                data={id_company ? businessMenu : menu}
                collapsed={collapsed} setCollapsed={setCollapsed}
            />
            <div
                className={styles.workArea}
                // style={{
                //     minHeight,
                //     width: collapsed ? `calc(100vw - 55px)` : '82%',
                //     minWidth: collapsed ? `calc(100vw - 55px)` : '82%',
                // }}
            >

                {id_company ?
                <Switch>

                    <Route
                        path='/company'
                        component={Company}
                        exact
                    />

                    <Redirect to='/company'/>

                </Switch> :

                <Switch>

                    <Route
                        path='/personal-data'
                        component={MyProfile}
                        exact
                    />

                    <Route
                        path='/support'
                        render={() => <MyProfile defaultPageOption='support' />}
                    />

                    <Route path='/settings' component={Settings}/>

                    <Route
                        path='/files'
                        render={() => <MyFiles
                            filePreview={filePreview}
                            setFilePreview={setFilePreview}
                            awaitingFiles={awaitingFiles}
                            setAwaitingFiles={setAwaitingFiles}
                            loaded={loaded}
                            setLoaded={setLoaded}
                            loadingFile={loadingFile}
                            fileErrors={fileErrors}
                            fileSelect={fileSelect}
                            fileAddCustomization={fileAddCustomization}
                            setFileAddCustomization={setFileAddCustomization}
                            setLoadingFile={setLoadingFile}
                            menuItem={menuItem}
                            setMenuItem={setMenuItem}
                            nullifyAddingSeveralFiles={nullifyAddingSeveralFiles}
                            saveCustomizeSeveralFiles={saveCustomizeSeveralFiles}
                            loadingType={loadingType}
                            setLoadingType={setLoadingType}
                            filesPage={filesPage}
                            setFilesPage={setFilesPage}
                        />}
                    />

                    <Route
                        path='/programs'
                        render={() => <Programs
                            filePreview={filePreview}
                            setFilePreview={setFilePreview}
                            fileSelect={fileSelect}
                            fileAddCustomization={fileAddCustomization}
                            setFileAddCustomization={setFileAddCustomization}
                            setAwaitingFiles={setAwaitingFiles}
                            awaitingFiles={awaitingFiles}
                            loaded={loaded}
                            setLoaded={setLoaded}
                            loadingFile={loadingFile}
                            fileErrors={fileErrors}
                        />}
                    />

                    <Route
                        path='/safe'
                        render={() => <Safe
                            filePreview={filePreview}
                            setFilePreview={setFilePreview}
                            fileSelect={fileSelect}
                            fileAddCustomization={fileAddCustomization}
                            setFileAddCustomization={setFileAddCustomization}
                            setAwaitingFiles={setAwaitingFiles}
                            awaitingFiles={awaitingFiles}
                            loaded={loaded}
                            setLoaded={setLoaded}
                            loadingFile={loadingFile}
                            fileErrors={fileErrors}
                            setLoadingFile={setLoadingFile}
                            setLoadingType={setLoadingType}
                            menuItem={menuItem}
                            setMenuItem={setMenuItem}
                            nullifyAddingSeveralFiles={nullifyAddingSeveralFiles}
                            saveCustomizeSeveralFiles={saveCustomizeSeveralFiles}
                        />}
                    />

                    <Route
                        path='/devices'
                        render={() => <Devices
                            filePreview={filePreview}
                            setFilePreview={setFilePreview}
                            fileSelect={fileSelect}
                            fileAddCustomization={fileAddCustomization}
                            setFileAddCustomization={setFileAddCustomization}
                            setAwaitingFiles={setAwaitingFiles}
                            awaitingFiles={awaitingFiles}
                            loaded={loaded}
                            setLoaded={setLoaded}
                            loadingFile={loadingFile}
                            fileErrors={fileErrors}
                            setLoadingFile={setLoadingFile}
                        />}
                    />

                    <Route
                        path='/project'
                        render={() => <Project setLoadingType={setLoadingType} />}
                    />

                    <Route
                        path='/shared-files'
                        render={() => <SharedFiles
                            filePreview={filePreview}
                            setFilePreview={setFilePreview}
                            fileSelect={fileSelect}
                            fileAddCustomization={fileAddCustomization}
                            nullifyAddingSeveralFiles={nullifyAddingSeveralFiles}
                            setFileAddCustomization={setFileAddCustomization}
                            saveCustomizeSeveralFiles={saveCustomizeSeveralFiles}
                            loadingType={loadingType}
                            setLoadingType={setLoadingType}

                        />}
                    />

                    <Route
                        path='/downloaded-files'
                        render={() => <DownloadedFiles />}
                    />

                    <Route
                        path='/archive'
                        render={() => <Archive />}
                    />

                    <Route
                        path='/journal'
                        render={() => <Journal />}
                    />

                    <Route
                        path='/cart'
                        render={() => <Cart />}
                    />

                    <Route
                        path='/calendar'
                        render={() => <CalendarPage />}
                    />

                    <Route
                        path='/chat'
                        render={() => <Chat />}
                    />

                    <Route
                        exact
                        path='/'
                        render={() => <MyFolders
                            filePreview={filePreview}
                            setFilePreview={setFilePreview}
                            fileSelect={fileSelect}
                            fileAddCustomization={fileAddCustomization}
                            setFileAddCustomization={setFileAddCustomization}
                            setAwaitingFiles={setAwaitingFiles}
                            awaitingFiles={awaitingFiles}
                            loaded={loaded}
                            setLoaded={setLoaded}
                            loadingFile={loadingFile}
                            fileErrors={fileErrors}
                            setLoadingFile={setLoadingFile}
                            nullifyAddingSeveralFiles={nullifyAddingSeveralFiles}
                            saveCustomizeSeveralFiles={saveCustomizeSeveralFiles}
                            setLoadingType={setLoadingType}
                            menuItem={menuItem}
                            setMenuItem={setMenuItem}
                            filesPage={filesPage}
                            setFilesPage={setFilesPage}
                        />}
                    />

                    <Redirect to='/'/>

                </Switch>}

            </div>
            {awaitingFiles.length > 0 || loadingFile.length > 0 || loaded.length > 0 || fileErrors.length > 0
                ? <FileLoader
                    awaitingFiles={awaitingFiles}
                    setAwaitingFiles={setAwaitingFiles}
                    loadingFile={loadingFile}
                    setLoadingFile={setLoadingFile}
                    loaded={loaded}
                    setLoaded={setLoaded}
                    setFileAddCustomization={setFileAddCustomization}
                    fileAddCustomization={fileAddCustomization}
                    fileErrors={fileErrors}
                    setFileErrors={setFileErrors}
                    menuItem={menuItem}
                    filesPage={filesPage}
                />
            : null}
            <div style={{display: 'none'}}>
                <input type='file' multiple='multiple' onChange={onInputFiles} ref={inputRef} />
            </div>
            {loadingType ? <Loader
                position='absolute'
                zIndex={102}
                containerType='bounceDots'
                type='bounceDots'
            /> : null}
        </div>
    )
}

export default PrivateCabinet;