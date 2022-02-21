import React, {useState} from 'react'

import styles from './WorkSpace.module.sass'
import SearchField from '../../SearchField'
import StorageSize from '../../StorageSize'
import Notifications from '../../Notifications'
import Profile from '../../Profile'
import ServePanel from '../../ServePanel'
import RecentFiles from '../../RecentFiles'
import WorkLinesPreview from '../WorkElements/WorkLinesPreview/WorkLinesPreview'
import FileLineShort from '../WorkElements/FileLineShort'
import {useSelector} from 'react-redux'
import AddMember from "../AddMember";
import BottomPanel from "../../BottomPanel";
import {imageSrc} from "../../../../../generalComponents/globalVariables";
import {useElementResize} from "../../../../../generalComponents/Hooks";
import ContextMenu from "../../../../../generalComponents/ContextMenu";
import ContextMenuFileList from "../../ContextMenuComponents/ContextMenuFileList";

const WorkSpace = ({
   setMouseParams, addMember, setAddMember, fileSelect, chosenFolder, menuItem, setParams, setSelectedProject, mouseParams
}) => {

    const files = useSelector(state => state.Cabinet.project.files)
    const recentFiles = useSelector(state => state.Cabinet.recentFiles)
    const [filePick, setFilePick] = useState({show: false, files: [], customize: false, intoZip: false})
    const [workElementsView, setWorkElementsView] = useState('')
    const [chosenFile, setChosenFile] = useState(null)
    const [action, setAction] = useState({type: '', name: '', text: ''})
    const [fileCollapsed, setFileCollapsed] = useState(false);
    const [containerRef, width] = useElementResize();

    const renderFiles = (Type) => {
        if(!files) return null
        return files.map((file, i) => {
            return <Type
                key={i}
                file={file}
                setChosenFile={setChosenFile}
                chosenFile={chosenFile}
                chosen={chosenFile?.fid === file?.fid}
                setMouseParams={setMouseParams}
                setAction={setAction}
                filePick={filePick}
                setFilePick={setFilePick}
                action={action}
                fileCollapsed={fileCollapsed}
            />
        })
    }

    const chooseProjectFromRecent = (project) => {
        setSelectedProject(project);
        setParams(state => ({...state, fromRecent: true}))
    }

    return (
        <div className={styles.wrapper} ref={containerRef}>

            <div className={styles.header}>
                <SearchField />
                <div className={styles.infoHeader}>
                    <StorageSize />
                    <Notifications />
                    <Profile />
                </div>
            </div>

            {recentFiles?.length > 0 && <RecentFiles
                setView={setWorkElementsView}
                view={workElementsView}
                menuItem={menuItem}
                width={width}
                onDoubleClickCallback={chooseProjectFromRecent}
            />}

            <ServePanel
                disableWorkElementsView={!!chosenFolder?.name}
                addFile={fileSelect}
            />

            {!!chosenFolder?.name ? <WorkLinesPreview
                recentFiles={recentFiles}
                chosenFile={chosenFile}
                fileCollapsed={fileCollapsed}
            >
                <div className={styles.fileListHeader}>
                    <span>{fileCollapsed ? 'Файлы' : 'Файлы проекта'}</span>
                    <img
                        className={styles.icon}
                        src={`${imageSrc}assets/PrivateCabinet/${fileCollapsed ? 'play-blue.svg' : 'play-grey.svg'}`}
                        alt='icon'
                        onClick={() => setFileCollapsed(!fileCollapsed)}
                    />
                </div>
                {renderFiles(FileLineShort)}
            </WorkLinesPreview> : null}

            {addMember &&
            <AddMember
                set={setAddMember}
            />}
            <BottomPanel />
            {mouseParams !== null && mouseParams?.width && mouseParams?.height ? <ContextMenu params={mouseParams} setParams={setMouseParams} tooltip={true}>
                <ContextMenuFileList filePick={filePick} file={chosenFile} mouseParams={mouseParams} filesPage={0} menuItem={menuItem} />
            </ContextMenu> : null}
        </div>
    )
}

export default WorkSpace