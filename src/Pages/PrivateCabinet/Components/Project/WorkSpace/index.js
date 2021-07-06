import React, {useState} from 'react'

import styles from './WorkSpace.module.sass'
import SearchField from '../../SearchField'
import StorageSize from '../../StorageSize'
import Notifications from '../../Notifications'
import Profile from '../../Profile'
import ServePanel from '../../ServePanel'
import MembersPanel from './MembersPanel'
import RecentFiles from '../../RecentFiles'
import WorkLinesPreview from '../WorkElements/WorkLinesPreview'
import FileLineShort from '../../Safe/FileLineShort'
import {useSelector} from 'react-redux'
import AddMember from "../AddMember";

const WorkSpace = ({setMouseParams}) => {

    const size = useSelector(state => state.PrivateCabinet.size)
    const fileList = useSelector(state => state.PrivateCabinet.fileList)
    const recentFiles = useSelector(state => state.PrivateCabinet.recentFiles)

    const [workElementsView, setWorkElementsView] = useState('workLinesPreview')

    const [addMember, setAddMember] = useState(false)
    const [chosenFile, setChosenFile] = useState(null)
    const [action, setAction] = useState({type: '', name: '', text: ''})

    const renderFiles = (Type) => {
        if(!fileList?.files) return null
        return fileList.files.map((file, i) => {
            return <Type
                key={i}
                file={file}
                setChosenFile={setChosenFile}
                chosen={chosenFile?.fid === file?.fid}
                setMouseParams={setMouseParams}
                setAction={setAction}

                size={size}
                action={action}
            />
        })
    }

    return (
        <div className={styles.wrapper}>

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
            />}

            <ServePanel
                setView={setWorkElementsView}
                view={workElementsView}
            />

            <MembersPanel
                setAddMember={setAddMember}
            />

            {workElementsView === 'workLinesPreview' &&
            <WorkLinesPreview recentFiles={recentFiles}>
                {renderFiles(FileLineShort)}
            </WorkLinesPreview>}

            {addMember &&
            <AddMember
                set={setAddMember}
            />}

        </div>
    )
}

export default WorkSpace