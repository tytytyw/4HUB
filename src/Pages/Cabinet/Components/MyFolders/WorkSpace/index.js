import React, {useState, useEffect, useRef} from 'react';
import { useSelector, useDispatch } from 'react-redux';

import api from '../../../../../api';
import {periods, previewFormats} from '../../../../../generalComponents/collections';
import styles from './WorkSpace.module.sass';
import SearchField from '../../SearchField';
import StorageSize from '../../StorageSize';
import Notifications from '../../Notifications';
import Profile from '../../Profile';
import ServePanel from '../../ServePanel';
import WorkBars from '../../WorkElements/WorkBars';
import BottomPanel from '../../BottomPanel';
import FileBar from '../../WorkElements/FileBar';
import WorkLines from '../../WorkElements/WorkLines';
import FileLine from '../../WorkElements/FileLine';
import WorkBarsPreview from '../../WorkElements/WorkBarsPreview';
import WorkLinesPreview from '../../WorkElements/WorkLinesPreview';
import FileLineShort from '../../WorkElements/FileLineShort';
import ContextMenu from '../../../../../generalComponents/ContextMenu';
import {contextMenuFile} from '../../../../../generalComponents/collections';
import ContextMenuItem from '../../../../../generalComponents/ContextMenu/ContextMenuItem';
import {fileDelete} from '../../../../../generalComponents/fileMenuHelper';
import {
    onDeleteFile,
    onAddRecentFiles,
    onChooseFolder,
    onSetPath,
    onChooseFiles
} from '../../../../../Store/actions/CabinetActions';
import ActionApproval from '../../../../../generalComponents/ActionApproval';
import File from '../../../../../generalComponents/Files';
import RecentFiles from '../../RecentFiles';
import CustomizeFile from '../../ContextMenuComponents/ContextMenuFile/CustomizeFile';
import OptionButtomLine from '../../WorkElements/OptionButtomLine';
import FileProperty from '../../ContextMenuComponents/ContextMenuFile/FileProperty';
import CreateZip from '../../ContextMenuComponents/ContextMenuFile/CreateZip';
import ShareFile from '../../ContextMenuComponents/ContextMenuFile/ShareFile/ShareFile';
import CopyLinkShare from '../../ContextMenuComponents/CopyLinkShare';
import {imageSrc} from '../../../../../generalComponents/globalVariables';
import {useElementResize, useScrollElementOnScreen} from "../../../../../generalComponents/Hooks";
import FolderPath from "../FolderPath";
import FilesGroup from "../../WorkElements/FilesGroup/FilesGroup";
import {renderHeight} from "../../../../../generalComponents/generalHelpers";
import Loader from "../../../../../generalComponents/Loaders/4HUB";

const WorkSpace = ({
       fileLoading, chosenFile, setChosenFile, nullifyAddingSeveralFiles,
       chosenFolder, listCollapsed, setFilePreview, filePreview, saveCustomizeSeveralFiles,
       fileSelect, action, setAction, fileAddCustomization, setFileAddCustomization, showSuccessMessage,
       setShowSuccessMessage, setLoadingType, gLoader, setGLoader, setNewFolder, setNewFolderInfo, newFolderInfo, filesPage,
       setFilesPage, menuItem, setChosenFolder
}) => {

    const dispatch = useDispatch();
    const workElementsView = useSelector(state => state.Cabinet.view);

    const uid = useSelector(state => state?.user.uid);
    const fileList = useSelector(state => state.Cabinet.fileList);
    const folderList = useSelector(state => state.Cabinet.folderList);
    const recentFiles = useSelector(state => state.Cabinet.recentFiles);
    const [mouseParams, setMouseParams] = useState(null);
    const [filePick, setFilePick] = useState({show: false, files: [], customize: false, intoZip: false});
    const nullifyAction = () => setAction({type: '', name: '', text: ''});
    const nullifyFilePick = () => setFilePick({show: false, files: [], customize: false, intoZip: false});
    const fileRef = useRef(null);
    const [containerRef, width] = useElementResize();

    useEffect(() => {
        if(fileList?.files.length <= 10 && chosenFolder?.path === fileList?.path) {
            setFilesPage(2);
            if(fileRef.current) {
                fileRef.current.scrollTop = 0;
            }
        }
    }, [fileList?.files, fileList?.path]); //eslint-disable-line

    const callbackArrMain = [
        {type: 'share', name: '', text: ``, callback: (list, index) => setAction(list[index])},
        {type: 'copyLink', name: '', text: ``, callback: (list, index) => setAction(list[index])},
        {type: 'customize', name: 'Редактирование файла', text: ``, callback: (list, index) => setAction(list[index])},
        {type: 'customizeSeveral', name: `Редактирование файлов`, text: ``, callback: () => setFilePick({...filePick, show: true})},
        {type: 'archive', name: 'Добавить файл в архив', text: `Вы действительно хотите архивировать файл ${chosenFile?.name}?`, callback: (list, index) => setAction(list[index])},
        {type: 'intoZip', name: 'Сжать в ZIP', text: ``, callback: (list, index) => setAction({...action, type: list[index].type, name: list[index].name})},
        {type: 'intoZipSeveral', name: 'Сжать в ZIP', text: ``, callback: () => setFilePick({...filePick, show: true, intoZip: true})},
        {type: 'properties', name: 'Свойства', text: ``, callback: () => setAction({...action, type: 'properties', name: 'Свойства'})},
        {type: 'download', name: 'Загрузка файла', text: ``, callback: () => document.downloadFile.submit()},
        {type: 'print', name: 'Распечатать файл', text: ``, callback: (file) => checkMimeTypes(file)},
        ];
    const additionalMenuItems = [
        {type: 'delete', name: 'Удаление файла', text: `Вы действительно хотите удалить файл ${chosenFile?.name}?`, callback: (list, index) => setAction(list[index])}
    ];
    const deleteFile = () => {
        if(filePick.show) {
            const gdir = fileList.path;
            filePick.files.forEach((fid, i, arr) => fileDelete({gdir, fid}, dispatch, uid, i === arr.length - 1 ? setShowSuccessMessage : '', 'Файлы перемещено в корзину'));
            setFilePick({...filePick, files: [], show: false});
        } else{
            fileDelete(chosenFile, dispatch, uid, setShowSuccessMessage, 'Файл перемещен в корзину');
        }
        nullifyAction();
        setChosenFile(null);
        dispatch(onAddRecentFiles());
    };

    const checkMimeTypes = (file) => {
        const mType = file?.mime_type ?? chosenFile?.mime_type;
        const isFormat = previewFormats.filter(format => chosenFile.ext.toLowerCase().includes(format)).length > 0;
        const fid = file?.fid ?? chosenFile?.fid;
        const preview = file?.preview ?? chosenFile?.preview;
        if(mType === 'application/pdf' || (mType && mType?.includes('image'))) {
            setLoadingType('bounceDot')
            printFile(`${preview}`)
        } else {
            if(isFormat) {
                setLoadingType('bounceDot')
                api.post(`/ajax/file_preview.php?uid=${uid}&fid=${fid}`)
                    .then(res => printFile(res.data.file_pdf))
                    .catch(err => console.log(err));
            }
        }
    };

    const printFile = (path) => {
        let pri = document.getElementById('frame');
        pri.src = `https://fs2.mh.net.ua${path}`;
        setTimeout(() => {
            pri.contentWindow.focus();
            pri.contentWindow.print();
        }, 1000);
        setLoadingType('')
    };

    const excessItems = () => {
        if(filePick.show) {
            return ['intoZip', 'properties', 'download', 'print']
        } else {
            if(chosenFile.mime_type) {
                switch (chosenFile.mime_type.split('/')[0]) {
                    case 'image': return []
                    case 'video': return ['print']
                    case 'audio': return ['print']
                    case 'application': {
                        return chosenFile.mime_type === 'application/x-compressed'
                            ? ['print', 'intoZip', 'intoZipSeveral']
                            : [];
                    }
                    default: return ['print'];
                }
            }
            if(previewFormats.filter(ext => chosenFile.ext.toLowerCase().includes(ext))[0]) return [];
            return ['print'];
        }
    }

    const renderMenuItems = (target, type) => {
        const eItems = excessItems();
        let filteredMenu = [...target];
        filteredMenu.forEach((el, i, arr) => {
            eItems.forEach(excess => {if(excess === el.type) delete arr[i]});
        });
        return filteredMenu.map((item, i) => {
            return <ContextMenuItem
                key={i}
                width={mouseParams.width}
                height={mouseParams.height}
                text={item.name}
                callback={() => type.forEach((el, index) => {if(el.type === item.type) el.callback(type, index)})}
                imageSrc={`${imageSrc}assets/PrivateCabinet/contextMenuFile/${item.img}.svg`}
            />
        })
    }

    const addToArchive = (uid, fid, file, options) => {
        setLoadingType('squarify')
        api.post(`/ajax/file_archive.php?uid=${uid}&fid=${fid}`)
            .then(res => {
                if (res.data.ok === 1) {
                    dispatch(onDeleteFile(file));
                    if(options.single) setShowSuccessMessage('Файл добавлен в архив');
                    if(options.several) setShowSuccessMessage('Выбранные файлы добавлено в архив');
                } else console.log(res?.error)
            })
            .catch(err => console.log(err))
            .finally(() => {
                nullifyAction();
                setChosenFile(null);
                setLoadingType('')
                if(filePick.show) nullifyFilePick();
            })
    }

    const archiveFile = () => {
        if(filePick.show) {
            filePick.files.forEach((fid, i) => {
                const options = {single: false, several: i === filePick.files.length - 1};
                addToArchive(uid, fid, {fid}, options);
            })
        } else {
            addToArchive(uid, chosenFile.fid, chosenFile, {single: true, several: false});
        }
	}

    useEffect(() => setChosenFile(null), [chosenFolder.path, chosenFolder.subPath]); // eslint-disable-line react-hooks/exhaustive-deps

    const folderSelect = (folder) => {
        const path = fileList.path + `/${folder.name}` //TODO - need to be folder.path
            setGLoader(true)
            dispatch(onChooseFiles(path, '', 1, '', setGLoader))
            setFilesPage(1)
        if(path.split("/").length === 3) {
            dispatch(onChooseFolder(folderList?.folders, path));
            dispatch(onSetPath(path));
            setChosenFolder(state => ({...state, open: true, subPath: path}))
        }
    }

    // Types of Files view
    const renderFiles = (Type, files) => {
        if(!files) return null;
        return files.map((file, i) => {
            return <Type
                key={i}
                file={file}
                setChosenFile={setChosenFile}
                chosen={filePick.show ? filePick.files.findIndex(el => el === file.fid) >= 0 : chosenFile?.fid === file?.fid}
                setMouseParams={setMouseParams}
                setAction={setAction}
                setFilePreview={setFilePreview}
                filePreview={filePreview}
                filePick={filePick}
                setFilePick={setFilePick}
                callbackArrMain={callbackArrMain}
                folderSelect={folderSelect}
            />
        });
    }

    const renderGroups = (Type, list) => {
        if(!list) return null;
        const keys = Object.keys(list);
        return keys.map((k, i) => (
            list[k].length > 0 ? <FilesGroup
                key={i}
                index={i}
                fileList={list[k]}
                filePreview={filePreview}
                setFilePreview={setFilePreview}
                callbackArrMain={callbackArrMain}
                chosenFile={chosenFile}
                setChosenFile={setChosenFile}
                filePick={filePick}
                setFilePick={setFilePick}
                title={periods[k] ?? "Более года назад"}
                setAction={setAction}
                setMouseParams={setMouseParams}
                //WorkBars
                fileLoading={fileLoading}
                fileSelect={fileSelect}
                filesPage={filesPage}
                setFilesPage={setFilesPage}
                chosenFolder={chosenFolder}
                gLoader={gLoader}
                renderFiles={renderFiles}
            /> : null
        ))
    }

    const onActiveCallbackArrMain = (type) => {
        let index;
        callbackArrMain.forEach((el, i) => el.type === type ? index = i : undefined);
        callbackArrMain[index].callback(callbackArrMain, index);
    };

    const cancelArchive = () => {
        nullifyFilePick();
        nullifyAction();
    }

    //For groupFiles TODO - need to extract to new component
    const [loadingFiles, setLoadingFiles] = useState(false);
    const search = useSelector(state => state.Cabinet.search);

    useEffect(() => {
        setLoadingFiles(false);
    }, [fileList?.path])

    const onSuccessLoading = (result) => {
        setTimeout(() => {
            result > 0 ? setFilesPage(filesPage => filesPage + 1) : setFilesPage(0);
            setLoadingFiles(false);
        }, 50) // 50ms needed to prevent recursion of ls_json requests
    }

    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0
    }

    const load = (entry) => {
        if(!gLoader) {
            if(entry.isIntersecting && !loadingFiles && filesPage !== 0 && window.location.pathname === '/'){
                setLoadingFiles(true);
                dispatch(onChooseFiles(fileList?.path, search, filesPage, onSuccessLoading, ''));
            }
            if(entry.isIntersecting && !loadingFiles && filesPage !== 0 && window.location.pathname.includes('files')){
                setLoadingFiles(true);
                // dispatch(onChooseAllFiles(fileListAll?.path, search, filesPage, onSuccessLoading, ''));
            }
        }
    }

    const [scrollRef] = useScrollElementOnScreen(options, load);

    return (<>
        <div
            className={`${
                styles.workSpaceWrap} 
                ${typeof listCollapsed === 'boolean' 
                    ? listCollapsed 
                        ? styles.workSpaceWrapCollapsed 
                        : styles.workSpaceWrapUncollapsed 
                    : undefined
            }`}
            ref={containerRef}
        >
            <div className={styles.header}>
                <SearchField setChosenFile={setChosenFile} menuItem={menuItem} />
                <div className={styles.infoHeader}>
                    <StorageSize />
                    <Notifications />
                    <Profile />
                </div>
            </div>
            {recentFiles?.length > 0 && <RecentFiles
                setFilePreview={setFilePreview}
                filePreview={filePreview}
                width={width}
            />}
            <ServePanel
                view={workElementsView}
                chosenFile={chosenFile}
                setAction={setAction}
                fileSelect={fileSelect}
                archive={() => onActiveCallbackArrMain('archive')}
                share={() => onActiveCallbackArrMain('share')}
                addFolder={(boolean) => {setNewFolder(boolean); setNewFolderInfo({...newFolderInfo, path: ''})}}
                addFile={fileSelect}
                chooseSeveral={() => setFilePick({...filePick, files: [], show: !filePick.show})}
                filePick={filePick}
                fileAddCustomization={fileAddCustomization}
                setFileAddCustomization={setFileAddCustomization}
                menuItem={menuItem}
                setGLoader={setGLoader}
                setNewFolderInfo={setNewFolderInfo}
            />
            <FolderPath
                width={width}
                setFilesPage={setFilesPage}
                setGLoader={setGLoader}
                setChosenFolder={setChosenFolder}
            />
            {workElementsView === 'bars' ?
                Array.isArray(fileList?.files)
                    ? <WorkBars
                          fileLoading={fileLoading}
                          fileSelect={fileSelect}
                          filePick={filePick}
                          filesPage={filesPage}
                          setFilesPage={setFilesPage}
                          fileRef={fileRef}
                          chosenFolder={chosenFolder}
                          gLoader={gLoader}
                          hideUploadFile={fileList === null}
                      >{renderFiles(FileBar, fileList?.files)}</WorkBars>
                    : <div className={`${styles.FilesList} ${renderHeight(recentFiles, filePick, styles)}`}>
                        {renderGroups(FileBar, fileList?.files)}
                        {!gLoader ? <div
                            className={`${styles.bottomLine} ${filesPage === 0 ? styles.bottomLineHidden : ''}`}
                            style={{height: '100%'}}
                            ref={scrollRef}
                        >
                            <Loader
                                type='bounceDots'
                                position='absolute'
                                background='white'
                                zIndex={5}
                                width='100px'
                                height='100px'
                                containerType='bounceDots'
                            />
                        </div> : null}
                    </div>
                    : null}
            {workElementsView === 'lines' ? <WorkLines
                fileLoading={fileLoading}
                filePick={filePick}
                filesPage={filesPage}
                setFilesPage={setFilesPage}
                fileRef={fileRef}
                chosenFolder={chosenFolder}
                gLoader={gLoader}
            >{renderFiles(FileLine, fileList?.files)}</WorkLines> : null}
            {workElementsView === 'preview' ? <WorkBarsPreview
                file={chosenFile}
                filePick={filePick}
                filesPage={filesPage}
                setFilesPage={setFilesPage}
                fileRef={fileRef}
                chosenFolder={chosenFolder}
                gLoader={gLoader}
                width={width}
            >{renderFiles(FileBar, fileList?.files)}</WorkBarsPreview> : null}
            {workElementsView === 'workLinesPreview' ? <WorkLinesPreview
                file={chosenFile}
                filePick={filePick}
                filesPage={filesPage}
                setFilesPage={setFilesPage}
                fileRef={fileRef}
                chosenFolder={chosenFolder}
                gLoader={gLoader}
            >{renderFiles(FileLineShort, fileList?.files)}</WorkLinesPreview> : null}
            {filePick.show ? <OptionButtomLine
                callbackArrMain={callbackArrMain}
                filePick={filePick}
                setFilePick={setFilePick}
                actionName={filePick.intoZip ? 'Сжать в Zip' : 'Редактировать'}
                setAction={setAction}
                action={action}
                nullifyFilePick={nullifyFilePick}
            /> : null}
            <BottomPanel />
        </div>
        {mouseParams !== null ? <ContextMenu params={mouseParams} setParams={setMouseParams} tooltip={true}>
            <div className={styles.mainMenuItems}>{renderMenuItems(contextMenuFile.main, callbackArrMain)}</div>
            <div className={styles.additionalMenuItems}>{renderMenuItems(contextMenuFile.additional, additionalMenuItems)}</div>
        </ContextMenu> : null}
        {action.type === 'delete' ?
            <ActionApproval
                name={filePick.show ? 'Удаление файлов' : action.name}
                text={filePick.show ? 'Вы действительно хотите удалить выбранные файлы?' : action.text}
                set={cancelArchive}
                callback={deleteFile}
                approve={'Удалить'}
            ><div className={styles.fileActionWrap}><File format={filePick.show ? 'FILES' : chosenFile?.ext} color={chosenFile?.color} /></div>
        </ActionApproval> : null}
        {action.type === 'customize' || filePick.customize || fileAddCustomization.several ? <CustomizeFile
            title={filePick.customize ||  fileAddCustomization?.several ? `Редактировать выбранные файлы` : action.name }
            info={chosenFolder}
            file={chosenFile}
            // TODO - Check Cancellation for FilePick
            close={filePick.customize ? nullifyFilePick : fileAddCustomization.several ? nullifyAddingSeveralFiles : nullifyAction}
            filePick={filePick}
            setFilePick={setFilePick}
            fileAddCustomization={fileAddCustomization}
            setFileAddCustomization={setFileAddCustomization}
            saveCustomizeSeveralFiles={saveCustomizeSeveralFiles}
            setLoadingType={setLoadingType}
            menuItem='myFolders'
        /> : null}
        {action.type === 'share' ? (
				<ShareFile file={chosenFile} files={filePick.files} close={nullifyAction} action_type={action.type} showSuccessMessage={showSuccessMessage} setShowSuccessMessage={setShowSuccessMessage} setLoadingType={setLoadingType} />
			) : null}
        {action.type === 'resend' ? (
            <ShareFile file={chosenFile} files={filePick.files} close={nullifyAction} action_type={'send'} showSuccessMessage={showSuccessMessage} setShowSuccessMessage={setShowSuccessMessage} setLoadingType={setLoadingType} />
        ) : null}
        {action.type === 'properties'
            ? <FileProperty
                close={nullifyAction}
                file={chosenFile}
            />
            : null}
        {action.type === 'intoZip'
            ? <CreateZip
                close={nullifyAction}
                file={chosenFile}
                title={action.name}
                info={chosenFolder}
                filePick={filePick}
                nullifyFilePick={nullifyFilePick}
                setShowSuccessMessage={setShowSuccessMessage}
                setLoadingType={setLoadingType}
            />
            : null}
        {action.type === 'archive'
            ?   <ActionApproval
					name={filePick.show ? 'Архивировать выбранные файлы' : action.name}
					text={filePick.show ? ' Вы действительно хотите переместить в архив выбранные файлы?' : action.text}
					set={cancelArchive}
					callback={archiveFile}
					approve={'Архивировать'}
				>
					<div className={styles.fileActionWrap}>
						<File format={filePick.show ? 'FILES' : chosenFile?.ext} color={chosenFile?.color} />
					</div>
				</ActionApproval>
			: null}
        <form style={{display: 'none'}} name='downloadFile' action='/ajax/download.php' method='post'>
            <input style={{display: 'none'}} name='fid' value={chosenFile?.fid || ''} readOnly />
        </form>
        <iframe
            style={{display: 'none'}}
            title={'print'}
            frameBorder='0'
            scrolling='no'
            id='frame'
        />
        {action.type === 'copyLink' ? <CopyLinkShare
                nullifyAction={nullifyAction}
                setShowSuccessMessage={setShowSuccessMessage}
            /> : null}
    </>)
}

export default WorkSpace;
