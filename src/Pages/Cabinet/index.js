import React, {useEffect, useRef, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'

import styles from './PrivateCabinet.module.sass'
import SideMenu from './Components/SideMenu'
import MyFolders from './Components/MyFolders'
import Safe from './Components/Safe'
import Devices from './Components/Devices'
import MyProfile from './Components/MyProfile'
import MyFiles from './Components/MyFiles'
import Programs from "./Components/Programs"

import {Switch, Route, useHistory, Redirect} from 'react-router'
import Settings from './Components/MyProfile/settings'
import Project from './Components/Project';
import SharedFiles from './Components/SharedFiles';
import {setPreviewTheme} from '../../Store/actions/main';
import Journal from './Components/Journal';
import CalendarPage from './Components/CalendarPage';
import Cart from './Components/Cart';
import Chat from "./Components/Chat";
import {businessMenu, menu} from "./Components/SideMenu/listHelper";
import api from "../../api";
import Company from "./Components/Business/Company";
import {exit} from "../../generalComponents/generalHelpers";
import Modals from "./Components/Modals/Modals";

const PrivateCabinet = ({loadingType, setLoadingType}) => {

    const uid = useSelector(state => state.user.uid);
    const id_company = useSelector(state => state.user.id_company);
    const path = useSelector(state => state.Cabinet.fileList?.path);
    const projectFolder = useSelector(state => state.Cabinet.project?.chosenFolder);
    const project = useSelector(state => state.Cabinet.project?.chosenProject);
    const dispatch = useDispatch();
    const [collapsed, setCollapsed] = useState(false);
    const [filePreview, setFilePreview] = useState({view: false, file: null, create: false});
    const [fileAddCustomization, setFileAddCustomization] = useState({show: false, file: {}, several: false, files: []});
    const [fileErrors, setFileErrors] = useState([]);
    const [menuItem, setMenuItem] = useState('');
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
                .then(res => {if(res.data?.is_block) exit()})
                .finally(() => stayOnline(60000));
        }, time)
    }

    useEffect(() => {
        let date = new Date();
        date.setHours(date.getHours() + 1);
        document.cookie = `uid=${uid};expires=${date}`;
        document.cookie = `id_company=${id_company};expires=${date}`;
        stayOnline(0);
        setLoadingType('');
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    //Loading multiple files info
    const inputRef = useRef();
    const [awaitingFiles, setAwaitingFiles] = useState([]);
    const [loadingFile, setLoadingFile] = useState([]);
    const [loaded, setLoaded] = useState([]);
    const onInputFiles = (e) => {
        const dir = menuItem === 'myFolders' || menuItem === 'myFiles'
            ? path
                ? path
                : 'global/all'
            : projectFolder ?? '';
        const files = [...e.target.files].map(file => ({
            file,
            options: {filePath: path, destination: menuItem, dir, id_project: project?.id ?? ''}
        }));
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
            onDragOver={handleDragOver}
        >
            <SideMenu
                data={id_company ? businessMenu : menu}
                collapsed={collapsed} setCollapsed={setCollapsed}
            />
            <div className={styles.workArea}>
                <Switch>
                    <Redirect exact from='/' to={id_company ? '/company' : '/folders'}/>
                    
                    <Route
                        path='/company'
                        component={Company}
                    />
                    
                    <Route
                        path='/department'
                        component={''}
                    />


                    <Route
                        path='/personal-data'
                        component={MyProfile}
                    />

                    <Route
                        path='/support'
                        render={() => <MyProfile defaultPageOption='support' />}
                    />

                    <Route path='/settings' component={Settings}/>

                    <Route
                        path={['/files', '/downloaded-files', '/archive']}
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
                        render={() => <Devices />}
                    />

                    <Route
                        path='/project'
                        render={() => <Project
                            setLoadingType={setLoadingType}
                            menuItem={menuItem}
                            setMenuItem={setMenuItem}
                            fileAddCustomization={fileAddCustomization}
                            setFileAddCustomization={setFileAddCustomization}
                            awaitingFiles={awaitingFiles}
                            setAwaitingFiles={setAwaitingFiles}
                            loaded={loaded}
                            setLoaded={setLoaded}
                            loadingFile={loadingFile}
                            fileErrors={fileErrors}
                            setLoadingFile={setLoadingFile}
                            fileSelect={fileSelect}
                            saveCustomizeSeveralFiles={saveCustomizeSeveralFiles}
                        />}
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
                            setMenuItem={setMenuItem}

                        />}
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
                        path='/tasks'
                        render={() => ''}
                    />

                    <Route
                        path='/chat-page'
                        render={() => <Chat setMenuItem={setMenuItem} />}
                    />

                    <Route
                        path='/folders'
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

                </Switch>

            </div>
            <div style={{display: 'none'}}>
                <input type='file' multiple='multiple' onChange={onInputFiles} ref={inputRef} />
            </div>
            <Modals
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
            />
        </div>
    )
}

export default PrivateCabinet;
