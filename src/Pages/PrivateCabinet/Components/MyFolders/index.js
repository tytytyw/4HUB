import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import styles from './MyFolders.module.sass';
import List from '../List';
import FolderItem from './FolderItem';
import WorkSpace from '../WorkSpace';
import CreateFolder from '../CreateFolder';
import CreateFile from '../CreateFile';
import CustomFolderItem from './CustomFolderItem';
import CreateSafePassword from '../CreateSafePassword';
import RecentFolders from './RecentFolders';
import PreviewFile from '../PreviewFile';
import ContextMenu from "../../../../generalComponents/ContextMenu";
import { contextMenuFolder, contextMenuSubFolder } from "../../../../generalComponents/collections";
import ContextMenuItem from "../../../../generalComponents/ContextMenu/ContextMenuItem";

const MyFolders = ({setItem, filePreview, setFilePreview}) => {

    const global = useSelector(state => state.PrivateCabinet.global);
    const other = useSelector(state => state.PrivateCabinet.other?.folders);
    const recentFolders = useSelector(state => state.PrivateCabinet.recentFolders);
    const [listCollapsed, setListCollapsed] = useState('');
    const [newFolder, setNewFolder] = useState(false);
    const [chosenFolder, setChosenFolder] = useState({path: 'global/all', open: false, subPath: ''});
    const [newFolderInfo, setNewFolderInfo] = useState({path: ''});
    const [blob, setBlob] = useState({file: null, show: false});
    const [fileLoading, setFileLoading] = useState({isLoading: false, percentage: 95, file: null});
    const [progress, setProgress] = useState(0);
    const [safePassword, setSafePassword] = useState({open: false});
    const [chosenFile, setChosenFile] = useState(null);
    const [mouseParams, setMouseParams] = useState(null);
    // const [action, setAction] = useState({type: '', name: '', text: ''});
    // const nullifyAction = () => setAction({type: '', name: '', text: ''});

    const renderStandardFolderList = () => {
        if(!global) return null;
        return global.map((el, i) => {
            return <FolderItem
                key={i + el.name}
                folder={el}
                listCollapsed={listCollapsed}
                setNewFolderInfo={setNewFolderInfo}
                newFolderInfo={newFolderInfo}
                setNewFolder={setNewFolder}
                setChosenFolder={setChosenFolder}
                chosenFolder={chosenFolder}
                chosen={chosenFolder.path === el.path}
                setMouseParams={setMouseParams}
            />
        })
    };

    const renderOtherFolderList = () => {
        if(!other) return null;
        return other.map((f, i) => {
            return <CustomFolderItem
                key={i + f.name}
                f={f}
                listCollapsed={listCollapsed}
                setNewFolderInfo={setNewFolderInfo}
                newFolderInfo={newFolderInfo}
                setNewFolder={setNewFolder}
                setChosenFolder={setChosenFolder}
                chosenFolder={chosenFolder}
                chosen={chosenFolder.path === f.path}
                padding={'0px 10px 0px 26px'}
                subFolder={false}
                setMouseParams={setMouseParams}
            />
        })
    };

    const onSafePassword = (boolean) => setSafePassword({...safePassword, open: boolean});

    const renderMenuItems = (target, type) => {
        return target.map((item, i) => {
            return <ContextMenuItem
                key={i}
                width={mouseParams.width}
                height={mouseParams.height}
                text={item.name}
                // callback={() => setAction(type[i])}
                imageSrc={`./assets/PrivateCabinet/contextMenuFile/${item.img}.svg`}
            />
        })
    };

    const callbackArrMain = [
        {type: 'delete', name: 'Удаление файла', text: `Вы действительно хотите удалить файл ${chosenFile?.name}?`}
    ];

    return (
        <div className={styles.workAreaWrap}>
            <List
                title='Папки'
                src='add-folder.svg'
                setListCollapsed={setListCollapsed}
                listCollapsed={listCollapsed}
                onCreate={(boolean) => {setNewFolder(boolean); setNewFolderInfo({...newFolderInfo, path: ''})}}
            >
                <div className={styles.folderListWrap}>
                    {renderStandardFolderList()}
                    {renderOtherFolderList()}
                    {recentFolders?.length > 0 && <RecentFolders
                        listCollapsed={listCollapsed}
                        setListCollapsed={setListCollapsed}
                        chosen={chosenFolder.path === 'recent'}
                        chosenFolder={chosenFolder}
                        setChosenFolder={setChosenFolder}
                        setMouseParams={setMouseParams}
                    />}
                </div>
            </List>
            <WorkSpace
                setBlob={setBlob}
                blob={blob}
                fileLoading={fileLoading}
                progress={progress}
                chosenFolder={chosenFolder}
                setSafePassword={setSafePassword}
                listCollapsed={listCollapsed}
                setItem={setItem}
                filePreview={filePreview}
                setFilePreview={setFilePreview}
                chosenFile={chosenFile}
                setChosenFile={setChosenFile}
            />
            {newFolder && <CreateFolder
                onCreate={setNewFolder}
                title='Новая папка'
                info={newFolderInfo}
                chosenFolder={chosenFolder}
                setChosenFolder={setChosenFolder}
            />}
            <input type='file' style={{display: 'none'}} id='add-file' onChange={e => setBlob(e.target.files[0])} />
            {blob.show && <CreateFile
                title='Добавление файла'
                info={chosenFolder}
                blob={blob}
                setBlob={setBlob}
                setFileLoading={setFileLoading}
                fileLoading={fileLoading}
                setProgress={setProgress}
                progress={progress}
                onToggleSafePassword={onSafePassword}
            />}
            {safePassword.open && <CreateSafePassword
                onToggle={onSafePassword}
                title='Создайте пароль для сейфа'
            />}
            {filePreview?.view ? <PreviewFile setFilePreview={setFilePreview} file={filePreview?.file} filePreview={filePreview} /> : null}
            {mouseParams !== null ? <ContextMenu params={mouseParams} setParams={setMouseParams} tooltip={true}>
                <div className={styles.mainMenuItems}>{renderMenuItems(chosenFolder.subPath ? contextMenuSubFolder.main : contextMenuFolder.main, callbackArrMain)}</div>
            </ContextMenu> : null}
        </div>
    )
}

export default MyFolders;
