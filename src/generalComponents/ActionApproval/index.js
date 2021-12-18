import React from 'react';

import styles from './ActionApproval.module.sass';
import PopUp from '../PopUp';
import classNames from 'classnames';

const ActionApproval = ({set, text, name, children, callback, approve, childrenWidth = ''}) => {
    return(<PopUp set={set}>
        <div className={styles.wrap}>
            <span className={styles.cross} onClick={set} />
            <span className={styles.title}>{name}</span>
            <div style={{width: childrenWidth}} className={styles.children}>{children}</div>
            <div className={classNames({[styles.text]: !!text})}>{text}</div>
            <div className={styles.buttonsWrap}>
                <div className={styles.cancel} onClick={set}>Отмена</div>
                <div className={styles.action} onClick={callback}>{approve}</div>
            </div>
        </div>
    </PopUp>)
}

export default ActionApproval;