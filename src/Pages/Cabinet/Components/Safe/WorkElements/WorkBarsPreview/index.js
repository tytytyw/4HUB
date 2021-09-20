import React, { useState, useEffect, useRef } from 'react';
import {useSelector} from 'react-redux';

import styles from './WorkBarsPreview.module.sass';
import File from '../../../../../../generalComponents/Files';
import {imageSrc} from '../../../../../../generalComponents/globalVariables';


const WorkBarsPreview = ({children, file}) => {

    const [f, setF] = useState(file);
    const search = useSelector(state => state.Cabinet?.search);
    const size = useSelector(state => state.Cabinet.size);
    useEffect(() => {setF(file); setPlay(false)}, [file]);

    const audioRef = useRef(null);
    const [play, setPlay] = useState(false);

    const renderFilePreview = () => {
        switch (f.mime_type.split('/')[0]) {
            case 'image': {
                return <img src={f.preview} alt='filePrieview' />
            }
            case 'video': {
                return <video controls src={`https://fs2.mh.net.ua${f.preview}`} type={f.mime_type}>
                    <source src={`https://fs2.mh.net.ua${f.preview}`} type={f.mime_type}/>
                </video>
            }
            case 'audio': {
                return <>
                    <audio controls ref={audioRef} src={`https://fs2.mh.net.ua${f.preview}`}>
                        <source src={`https://fs2.mh.net.ua${f.preview}`} type={f.mime_type}/>
                    </audio>
                    <div className={styles.audioPicWrap}>
                        <img className={styles.audioPic} src={`${imageSrc}/assets/PrivateCabinet/file-preview_audio.svg`} alt='audio'/>
                        {!play ? <img className={styles.audioSwitchPlay} src={`${imageSrc}/assets/PrivateCabinet/play-black.svg`} alt='play' onClick={() => {!play ? audioRef.current.play() : audioRef.current.pause(); setPlay(!play)}} /> : null}
                        {play ? <img className={styles.audioSwitch} src={`${imageSrc}/assets/PrivateCabinet/pause.svg`} alt='pause' onClick={() => {!play ? audioRef.current.play() : audioRef.current.pause(); setPlay(!play)}} /> : null}
                    </div>
                </>
            }
            default: {
                return <div className={styles.filePreviewWrap}><File format={f?.ext} color={f?.color} /></div>
            }
        }
    }

    return (<div
        className={styles.workBarsPreviewWrap}
        style={{
            gridTemplateColumns: size === 'small'
                ? 'repeat(auto-fill, 118px)'
                : size === 'medium'
                    ? 'repeat(auto-fill, 160px)'
                    : 'repeat(auto-fill, 205px)',
            gridAutoRows: size === 'small'
                ? '118px'
                : size === 'medium'
                    ? '160px'
                    : '205px',
        }}
    >
        <div className={styles.preview}>
            {children?.length === 0 && search.length !== 0
                ? <div
                    className={styles.noSearchResults}
                >Нет элементов удовлетворяющих условиям поиска</div>
                : null}
            {f ? f.is_preview === 1 ? renderFilePreview() : <div><div className={styles.filePreviewWrap}><File format={f?.ext} color={f?.color} /></div></div> : null}
        </div>
        <div className={styles.renderedFiles}>
            <div className={styles.innerFiles}>{children}</div>
        </div>
    </div>)
}

export default WorkBarsPreview;