import React, {useState} from 'react'

import styles from './MiniToolBar.module.sass'
import {ReactComponent as PencilIcon} from '../../../../../../assets/PrivateCabinet/watercolor.svg'
import {ReactComponent as ForwardIcon} from '../../../../../../assets/PrivateCabinet/forward.svg'
import {ReactComponent as TrashIcon} from '../../../../../../assets/PrivateCabinet/trash.svg'
import classNames from "classnames";
import {figuresPaint, dotsPaint, colorsPaint} from "../../../../../../generalComponents/collections";

const MiniToolBar = ({drawParams, setDrawParams, unDoPaint}) => {

    const [toolFigure, setToolFigure] = useState(false)
    const [toolDots, setToolDots] = useState(false)
    const [toolColors, setToolColors] = useState(false)

    /*const [values, setValues] = useState({
        figure: 6,
        color: 9,
        dot: 8
    })*/

    return (
        <div className={styles.wrapper}>

            <div
                onMouseLeave={() => setToolFigure(false)}
                className={styles.item}
            >

                <div
                    className={classNames({
                        [styles.toolBlock]: true,
                        [styles.active]: !!toolFigure
                    })}
                >
                    {figuresPaint?.map((item, index) => (
                        <button key={index} className={styles.itemBtn}>
                            <img
                                className={styles.figureImg}
                                src={`./assets/PrivateCabinet/${item.figure}.svg`}
                                alt={item.figure}
                            />
                        </button>
                    ))}
                </div>

                <button
                    onMouseEnter={() => setToolFigure(true)}
                    className={styles.itemBtn}
                >
                    <PencilIcon/>
                </button>
            </div>

            <div
                onMouseLeave={() => setToolDots(false)}
                className={styles.item}
            >

                <div
                    className={classNames({
                        [styles.toolBlock]: true,
                        [styles.active]: !!toolDots
                    })}
                >
                    {dotsPaint?.map((item, index) => (
                        <button
                            key={index}
                            className={styles.itemBtn}
                            onClick={() => {
                                setDrawParams(drawParams => ({...drawParams, width: item.width}))
                                setToolDots(false);
                            }}
                        >
                            <span
                                style={{
                                    width: `${item?.width}px`,
                                    height: `${item?.width}px`
                                }}
                                className={styles.dot}
                            />
                        </button>
                    ))}
                </div>

                <button
                    className={styles.itemBtn}
                    onMouseEnter={() => setToolDots(true)}
                >
                    <span
                        className={styles.dot}
                        style={{
                            width: `${drawParams.width}px`,
                            height: `${drawParams.width}px`
                        }}
                    />
                </button>
            </div>

            <div
                onMouseLeave={() => setToolColors(false)}
                className={styles.item}
            >

                <div
                    className={classNames({
                        [styles.toolBlock]: true,
                        [styles.active]: !!toolColors
                    })}
                >
                    {colorsPaint?.map((item, index) => (
                        <button key={index} className={styles.itemBtn}>
                            <span
                                style={{background: `${item?.color}`}}
                                className={styles.circle}
                                onClick={() => {
                                    setDrawParams(drawParams => ({...drawParams, color: item.color}));
                                    setToolColors(false);
                                }}
                            />
                        </button>
                    ))}
                </div>

                <button
                    onMouseEnter={() => setToolColors(true)}
                    className={classNames(styles.itemBtn, styles.itemBtnActive)}
                >
                    <span
                        style={{background: drawParams.color}}
                        className={styles.circle}
                    />
                </button>
            </div>

            <div className={styles.item}>
                <button
                    className={styles.itemBtn}
                    onClick={unDoPaint}
                >
                    <ForwardIcon/>
                </button>

            </div>

            <div className={styles.item}>
                <button className={styles.itemBtn}>
                    <TrashIcon/>
                </button>

            </div>

        </div>
    )
}

export default MiniToolBar