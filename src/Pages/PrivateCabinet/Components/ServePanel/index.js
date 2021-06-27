import React from 'react';
import {useSelector, useDispatch} from 'react-redux';

import styles from './ServePanel.module.sass';
import {onSetFileSize} from '../../../../Store/actions/PrivateCabinetActions';
import { ReactComponent as BarsIcon } from '../../../../assets/PrivateCabinet/bars.svg';
import { ReactComponent as LinesIcon } from '../../../../assets/PrivateCabinet/lines.svg';
import { ReactComponent as PreviewIcon } from '../../../../assets/PrivateCabinet/preview.svg';
import { ReactComponent as VerticalLinesIcon } from '../../../../assets/PrivateCabinet/vertical-lines.svg';
import { ReactComponent as MenuIcon } from '../../../../assets/PrivateCabinet/menu.svg';
import { ReactComponent as SafeIcon } from '../../../../assets/PrivateCabinet/safe.svg';
import { ReactComponent as ShareIcon } from '../../../../assets/PrivateCabinet/share.svg';
import { ReactComponent as DeleteIcon } from '../../../../assets/PrivateCabinet/delete.svg';
import { ReactComponent as FileSize } from '../../../../assets/PrivateCabinet/file_size.svg';

const ServePanel = ({ view, setView, chosenFile, setAction, fileSelect, archive, resend, chooseSeveral, filePick }) => {

    const size = useSelector(state => state.PrivateCabinet.size);
    const dispatch = useDispatch();

    const changeSize = (s) => {
        const sizes = ['small', 'medium', 'big'];
        if(s === sizes[sizes.length - 1]) return sizes[0]
        return sizes[sizes.indexOf(s) + 1];
    }

    return (
        <div className={styles.servePanelWrap}>
            <div className={styles.groupStart}>
                <div className={styles.viewPanel}>
                    <div className={`${view === 'bars' ? styles.iconViewChosen : styles.iconView}`} onClick={() => setView('bars')}><BarsIcon /></div>
                    <div className={`${view === 'lines' ? styles.iconViewChosen : styles.iconView}`} onClick={() => setView('lines')}><LinesIcon /></div>
                    <div className={`${view === 'preview' ? styles.iconViewChosen : styles.iconView}`} onClick={() => setView('preview')}><PreviewIcon /></div>
                    <div className={`${view === 'workLinesPreview' ? styles.iconViewChosen : styles.iconView}`} onClick={() => setView('workLinesPreview')}><VerticalLinesIcon /></div>
                </div>
                <div className={styles.filterPanel}>
                    <div
                        onClick={() => dispatch(onSetFileSize(changeSize(size)))}
                        className={`
                            ${styles.iconView} 
                            ${styles.iconSize} 
                            ${size === 'small' ? styles.samllSize : null} 
                            ${size === 'medium' ? styles.mediumSize : null} 
                            ${size === 'big' ? styles.bigSize : null} 
                        `}
                    ><FileSize className={styles.iconSVG} /></div>
                    <div className={styles.iconView}><MenuIcon className={styles.iconSVG} /><div /></div>
                    <span
                        className={filePick?.show ? styles.chooseButtonActive : styles.chooseButton}
                        onClick={chooseSeveral}
                    >Выбрать</span>
                </div>
            </div>
            <div className={styles.groupEnd}>
                <div className={styles.buttons}>
                    <div className={styles.createButton}><span>Создать</span><div /></div>
                    <label className={styles.downloadButton} onClick={() => fileSelect()}>Загрузить</label> {/*setBlob({...blob, show: true})*/}
                </div>
                <div className={styles.iconButtons}>
                    <div
                        className={`${chosenFile ? styles.iconView : styles.iconDisabled}`}
                        onClick={() => {if(chosenFile) archive()}}
                    ><SafeIcon className={styles.iconSafe} /></div>
                    <div
                        className={`${chosenFile ? styles.iconView : styles.iconDisabled}`}
                        onClick={() => {if(chosenFile) resend()}}
                    ><ShareIcon className={styles.iconShare} /></div>
                    <div
                        className={`${chosenFile ? styles.iconView : styles.iconDisabled}`}
                        onClick={() => {
                            if(chosenFile) setAction({type: 'delete', name: 'Удаление файла', text: `Вы действительно хотите удалить файл ${chosenFile?.name}?`});
                        }}
                    ><DeleteIcon className={styles.iconTrash} /></div>
                </div>
            </div>
        </div>
    )
}

export default ServePanel;
