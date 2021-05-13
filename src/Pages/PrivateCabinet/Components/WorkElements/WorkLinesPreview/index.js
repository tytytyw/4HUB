<<<<<<< HEAD
import React, {useState, useEffect}  from 'react';

import styles from './WorkLinesPreview.module.sass';
import {colors} from '../../../../../generalComponents/collections'
=======
import React, {useState, useEffect, useRef} from 'react';

import styles from './WorkLinesPreview.module.sass';
import {colors} from '../../../../../generalComponents/collections'
import File from "../../../../../generalComponents/Files";
>>>>>>> e2bca16da87ec29e6978e52809d9e1f1494eed87

const WorkLinesPreview = ({file, children}) => {

    const [color, setColor] = useState(null);
    const [f, setF] = useState(file);
    useEffect(() => {
        setF(file);
        const newColor = colors.filter(c => c.color === file?.color)
        setColor(newColor[0]);
    }, [file]);

<<<<<<< HEAD
=======
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
                        <img className={styles.audioPic} src='./assets/PrivateCabinet/file-preview_audio.svg' alt='audio'/>
                        {!play ? <img className={styles.audioSwitchPlay} src='./assets/PrivateCabinet/play-black.svg' alt='play' onClick={() => {!play ? audioRef.current.play() : audioRef.current.pause(); setPlay(!play)}} /> : null}
                        {play ? <img className={styles.audioSwitch} src='./assets/PrivateCabinet/pause.svg' alt='pause' onClick={() => {!play ? audioRef.current.play() : audioRef.current.pause(); setPlay(!play)}} /> : null}
                    </div>
                </>
            }
            // case 'application': {
            //     return <iframe src={`https://fs2.mh.net.ua${f.preview}`} title={f.name} frameBorder="0" scrolling="no"  />
            // }
            default: {
                return <div className={styles.filePreviewWrap}><File format={f?.ext} color={f?.color} /></div>
            }
        }
    }

>>>>>>> e2bca16da87ec29e6978e52809d9e1f1494eed87
    return (<div className={styles.workLinesPreviewWrap}>
        <div className={styles.fileListWrap}>{children}</div>
        <div className={styles.previewFileWrap}>
            {f ? <>
<<<<<<< HEAD
            <img className={styles.preview} src='./assets/PrivateCabinet/file-preview.svg' alt='file' />
=======
            <div className={styles.preview}>
                {f ? f.is_preview === 1 ? renderFilePreview() : <div><div className={styles.filePreviewWrap}><File format={f?.ext} color={f?.color} /></div></div> : null}
            </div>
>>>>>>> e2bca16da87ec29e6978e52809d9e1f1494eed87
            <span className={styles.fileName}>{f.name}</span>
            <div className={styles.infoFileItem}>
                <span className={styles.itemName}>Теги</span>
                {f.tag
                    ? <span className={styles.tagName}>#{f.tag}</span>
                    : <span className={styles.optionItem}>Добавить тег</span>}
            </div>
            <div className={styles.infoFileItem}>
                <span className={styles.itemName}>Цвет</span>
                {f?.color
                    ? <span className={styles.colorCircle} style={{background: color?.light, border: `1px solid ${color?.dark}`}}/>
                    : <span className={styles.optionItem}>Добавить цвет</span>}
            </div>
            <div className={styles.infoFileItem}>
                <span className={styles.itemName}>Знаки</span>
                {f?.fig
                    ? <img src={`./assets/PrivateCabinet/signs/${f.fig}.svg`} alt='sign' />
                    : <span className={styles.optionItem}>Добавить знаки</span>}
            </div>
            <div className={styles.infoFileItem}>
                <span className={styles.itemName}>Эмоджи</span>
                {f?.emo
                    ? <img src={`./assets/PrivateCabinet/smiles/${f.emo}.svg`} alt='sign' />
                    : <span className={styles.optionItem}>Добавить эмоджи</span>}
            </div>
            <div className={styles.infoFileItem}>
                <span className={styles.itemName}>Создан</span>
                {f?.mtime
                    ? <span className={styles.description}>{f.mtime.split(' ')[0]}</span>
                    : ''}
            </div>
            <div className={styles.infoFileItem}>
                <span className={styles.itemName}>Изменен</span>
                {f?.ctime
                    ? <span className={styles.description}>{f.ctime.split(' ')[0]}</span>
                    : ''}
            </div>
            <div className={styles.infoFileItem}>
                <span className={styles.itemName}>Размеры</span>
                {f?.size_now
                    ? <span className={styles.description}>{f.size_now}</span>
                    : ''}
            </div>
            </>: null}
        </div>
    </div>)
}

export default WorkLinesPreview;