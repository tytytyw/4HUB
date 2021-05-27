import React, {useEffect, useRef, useState} from 'react';

import styles from './LoadItem.module.sass';
import File from "../../../../../generalComponents/Files";
import {ReactComponent as CheckIcon} from "../../../../../assets/PrivateCabinet/check.svg";
import {ReactComponent as CrossIcon} from "../../../../../assets/PrivateCabinet/remove.svg";

const LoadItem = ({list, index, set, loaded, processing, name, ext, color, options, startLoading}) => {

    const [data, setData] = useState({strokeDasharray: `150 150`, strokeDashoffset: `288`})
    const circleRef = useRef();
    const onProgress = (processing) => {
        const radius = circleRef?.current?.r?.baseVal?.value;
        const circumference = 2 * Math.PI * radius;
        setData({
            strokeDasharray: `${circumference} ${circumference}`,
            strokeDashoffset: `${circumference - processing / 100 * circumference}`
        });
    };

    useEffect(() => {onProgress(processing)}, [processing]);

    const deleteItem = () => {
        const items = [...list];
        items.splice(index, 1);
        set(items);
    }

    return (<div className={styles.loadItemWrap}>
        <div className={styles.nameWrap}>
            <div className={styles.fileWrap}><File format={ext} color={color} /></div>
            <span className={styles.name}>{name}</span>
        </div>
        <div className={styles.optionsItemWrap}>
            {loaded ? <span className={styles.loadedItemWrap}>
                <CheckIcon className={styles.checkIcon} />
                <CrossIcon className={styles.cross} onClick={deleteItem} />
            </span> : null}
            {!loaded && !processing ? <CrossIcon className={styles.crossIcon} onClick={deleteItem} /> : null}
            {processing ? <div className={styles.progress}>
                <svg viewBox="0 0 100 100" width="30px" className={styles.progressBar}>
                  <circle className={styles.load} cx="50" cy="50" r="45"/>
                  <circle className={styles.loaded} cx="50" cy="50" r="45" ref={circleRef} strokeDasharray={data.strokeDasharray} strokeDashoffset={data.strokeDashoffset} />
                </svg>
                <span className={styles.crossUpload}>
                    <CrossIcon className={styles.cross} onClick={() => {
                        deleteItem();
                        if(options.cancelLoading) options.cancelLoading();
                        startLoading(true);
                    }} />
                </span>
            </div>: null}
        </div>
    </div>)
};

export default LoadItem;