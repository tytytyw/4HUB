import React from 'react';

import styles from './FileLineShort.module.sass';
import File from '../../../../../generalComponents/Files';

const FileLineShort = ({file, setChosenFile, chosen, setMouseParams, setFilePreview, filePreview}) => {

    return (<div
        className={`${styles.fileLineShortWrap} ${chosen ? styles.fileChosen : null}`}
        onClick={() => setChosenFile(file)}
        onDoubleClick={() => setFilePreview({...filePreview, view: true, file})}
    >
        <div className={styles.infoWrap}>
            <div className={styles.fileWrap}><File format={file.ext} color={file.color} /></div>
            <div className={styles.fileName}>{file.name}</div>
        </div>
        <div
            className={styles.menuWrap}
            onClick={e => {setMouseParams({x: e.clientX, y: e.clientY, width: 200, height: 25})}}
        ><span className={styles.menu} /></div>
    </div>)
}

export default FileLineShort;