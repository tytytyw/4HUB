import React, {useState} from 'react';

import styles from './MyFolders.module.sass';
import List from '../List';
import FolderItem from './FolderItem';
import { folders } from './hardCodedFolders';
import WorkSpace from '../WorkSpace';

const MyFolders = () => {

    const [listCollapsed, setListCollapsed] = useState(false);

    const renderFolderList = () => {
        return folders.map(el => {
            return <FolderItem
                key={el.name}
                src={el.src}
                title={el.name}
                quantity={el.folders.length}
                listCollapsed={listCollapsed}
            />
        })
    };


    return (
        <div className={styles.workAreaWrap}>
            <List
                title='Папки'
                src='add-folder.svg'
                setListCollapsed={setListCollapsed}
                listCollapsed={listCollapsed}
            >
                <div className={styles.folderListWrap}>
                    {renderFolderList()}
                </div>
            </List>
            <WorkSpace />
        </div>
    )
}

export default MyFolders;
