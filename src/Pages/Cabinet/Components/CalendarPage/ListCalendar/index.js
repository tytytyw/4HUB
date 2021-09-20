import React, {useEffect, useState} from 'react'

import styles from './ListCalendar.module.sass'
import classNames from "classnames";
import {getAllDays, getDays, getNextMonthDays, getPrevMonthDays} from './helper'
import {months, weekDays} from '../helper'
import {useDispatch, useSelector} from 'react-redux'
import {setCalendarDate} from '../../../../../Store/actions/CabinetActions'

const ListCalendar = ({setViewType, collapsed = false}) => {

    const dispatch = useDispatch()
    const calendarDate = useSelector(state => state.Cabinet.calendarDate)

    const [prevMonthDays, setPrevMonthDays] = useState(getPrevMonthDays(calendarDate))
    const [days, setDays] = useState(getDays(calendarDate))
    const [nextMonthDays, setNextMonthDays] = useState(getNextMonthDays(calendarDate))

    const allDays = getAllDays()

    useEffect(() => {
        setPrevMonthDays(getPrevMonthDays(calendarDate))
        setDays(getDays(calendarDate))
        setNextMonthDays(getNextMonthDays(calendarDate))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [calendarDate])

    const getMonthName = () => {
        const monthItem = months?.find(item => item?.id === calendarDate.getMonth())
        return monthItem?.text
    }

    const onChangeDay = (day, month = null) => {
        const date = new Date(calendarDate)
        date.setDate(day)
        if (month !== null) {
            date.setMonth(month)
        }
        dispatch(setCalendarDate(date))
        setViewType('list')
    }

    const dayActive = day => calendarDate.getDate() === day

    return (
        <div className={styles.wrapper}>

            <div className={styles.header}>
                <p className={styles.month}>
                    {getMonthName(calendarDate.getMonth())} {calendarDate.getFullYear()}
                </p>
                <img
                    src="./assets/PrivateCabinet/calendar-9.svg"
                    className={styles.calendarIcon}
                    alt="Calendar"
                />
            </div>

            {!collapsed ?
                <div className={styles.content}>

                    {weekDays?.map((weekDay, i) => (
                        <div
                            className={styles.weekDay}
                            key={weekDay.id}
                        >
                            {weekDay.name}
                        </div>
                    ))}

                    {prevMonthDays?.map((itemDay, index) => (
                        <div
                            key={index}
                            className={styles.dayWrap}
                        >
                        <span
                            className={classNames(styles.day, styles.anotherDay)}
                            onClick={() => onChangeDay(itemDay, calendarDate.getMonth() - 1)}
                        >
                            {itemDay}
                        </span>
                        </div>
                    ))}

                    {days?.map((itemDay, index) => (
                        <div
                            key={index}
                            className={styles.dayWrap}
                        >
                        <span
                            className={classNames({
                                [styles.day]: true,
                                [styles.selectedDay]: dayActive(itemDay)
                            })}
                            onClick={() => onChangeDay(itemDay)}
                        >
                            {itemDay}
                        </span>
                        </div>
                    ))}

                    {nextMonthDays?.map((itemDay, index) => (
                        <div
                            key={index}
                            className={styles.dayWrap}
                        >
                            <span
                                className={classNames(styles.day, styles.anotherDay)}
                                onClick={() => onChangeDay(itemDay, calendarDate.getMonth() + 1)}
                            >
                                {itemDay}
                            </span>
                        </div>
                    ))}

                </div> :
                <div className={styles.contentCollapsed}>

                    <div className={styles.weekDay}>Пн</div>

                    <div className={styles.daysWrap}>
                        {allDays?.map((itemDay, index) => (
                            <div
                                key={index}
                                className={styles.dayWrap}
                            >
                                <span
                                    className={classNames({
                                        [styles.day]: true,
                                        [styles.anotherDay]: true,
                                        [styles.selectedDay]: dayActive(itemDay)
                                    })}
                                    onClick={() => onChangeDay(itemDay)}
                                >
                                    {itemDay}
                                </span>
                            </div>
                        ))}
                    </div>

                </div>}

        </div>
    )
}

export default ListCalendar