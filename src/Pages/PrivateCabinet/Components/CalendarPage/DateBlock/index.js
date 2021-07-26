import React from 'react'
import styles from './DateBlock.module.sass'
import Select from '../../../../../generalComponents/Select/Select'
import {getDays, getYears, months} from '../helper'
import classNames from 'classnames'
import {useDispatch, useSelector} from 'react-redux'
import {setCalendarDate} from '../../../../../Store/actions/PrivateCabinetActions'

const DateBlock = ({setViewType}) => {

    const calendarDate = useSelector(state => state.PrivateCabinet.calendarDate)
    const dispatch = useDispatch()

    const onChangeDay = day => {
        const date = new Date(calendarDate)
        date.setDate(day)
        dispatch(setCalendarDate(date))
        setViewType('list')
    }

    const onChangeMonth = item => {
        const date = new Date(calendarDate)
        date.setMonth(item.id)
        dispatch(setCalendarDate(date))
        setViewType('full')
    }

    const onChangeYear = year => {
        const date = new Date(calendarDate)
        date.setFullYear(year)
        dispatch(setCalendarDate(date))
    }

    return (
        <div className={styles.wrapper}>

            <div className={styles.searchWrap}>

                <div className={styles.selectsWrap}>
                    <div className={styles.yearSelect}>
                        <Select
                            placeholder='Выбрать год'
                            className={styles.select}
                            classNameSelect={styles.selectContentYear}
                            data={getYears()}

                            onChange={value => onChangeYear(value)}
                        />
                    </div>

                    <div className={styles.daySelect}>
                        <Select
                            placeholder='Выбрать день'
                            className={styles.select}
                            classNameSelect={styles.selectContent}
                            data={getDays()}

                            onChange={value => onChangeDay(value)}
                        />
                    </div>
                </div>

            </div>

            <div className={styles.buttonsWrap}>

                {months?.map((item, index) => (
                    <button
                        key={index}
                        onClick={() => onChangeMonth(item)}
                        className={classNames({
                            [styles.button]: true,
                            [styles.active]: item.id === calendarDate.getMonth()
                        })}
                    >
                        {item.text}
                    </button>
                ))}

            </div>

        </div>
    )
}

export default DateBlock