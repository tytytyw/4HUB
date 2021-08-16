import React from 'react';

import styles from './Emoji.module.sass';
import { smiles } from '../collections';
import classnames from 'classnames';
import {imageSrc} from '../globalVariables';

const Emoji = ({emoji, setEmoji, title = 'Добавить эмоджи', editableClass = ''}) => {

    const set = (el) => emoji === el ? setEmoji('') : setEmoji(el);

    const renderEmoji = () => {
        return smiles.map((el, i) => {
            return <div
                key={i}
                className={classnames({
                    [styles.emoji]: true,
                    [styles.emojiChosen]: emoji === el
                })}
                onClick={() => set(el)}
            ><img src={`${imageSrc}assets/PrivateCabinet/smiles/${el}.svg`} alt='smile' />
            </div>
        })
    };

    return (
        <div className={`${styles.emojiWrap} ${editableClass ? styles[editableClass] : ''}`}>
            <span className={styles.title}>{title}</span>
            <div>{renderEmoji()}</div>
        </div>
    )
}

export default Emoji;
