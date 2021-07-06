import React from 'react'

import styles from './ShopItem.module.sass'
import '../../../../../generalComponents/colors.sass'
import classNames from 'classnames'

const ShopItem = ({ shop, chosenShop, setChosenShop, setMouseParams, listSize }) => {

    return (
        <>
            <div
                className={classNames({
                    [styles.wrapper]: true,
                    [styles.wrapperChosen]: chosenShop === shop.id,
                    [styles?.[`wrapper_${listSize}`]]: !!listSize
                })}
                onClick={() => setChosenShop(shop.id)}
            >
                <div className={styles.titleWrap}>
                    <div className={styles.imageWrap}>
                        <img
                            src={shop.img}
                            alt='icon'
                            className={styles.icon}
                        />
                    </div>
                    <span className={styles.title}>{shop.name} </span>
                </div>
                <div className={styles.functionWrap}>
                    {/*<div
                        className={styles.menuWrap}
                        onClick={e => setMouseParams({x: e.clientX, y: e.clientY, width: 200, height: 30})}
                    >
                        <span className={styles.menu}/>
                    </div>*/}
                </div>
            </div>

        </>
    )
}

export default ShopItem