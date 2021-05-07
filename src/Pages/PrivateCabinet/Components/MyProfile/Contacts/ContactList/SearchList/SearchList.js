import React from 'react'

import styles from './SearchList.module.sass'
import classnames from 'classnames'

const SearchList = ({ data, onItemClick = () => {}, selectedItem }) => {
    return (
        <ul className={styles.menuList}>

            {data.map((item, index) => (
                <li
                    onClick={() => onItemClick(item)}
                    className={classnames({
                        [styles.menuItem]: true,
                        [styles.activeItem]: selectedItem.id === item.id,
                    })}
                    key={index}
                >
                    <span className={styles.icon}>
                        <img src={item.image} alt={item.id}/>
                    </span>
                    <p>{item.name}</p>
                </li>
            ))}

        </ul>
    )
}

export default SearchList