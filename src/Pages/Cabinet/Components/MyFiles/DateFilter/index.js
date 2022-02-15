import React from "react";
import styles from "./DateFilter.module.sass";
import Select from "../../../../../generalComponents/Select/Select";
import { getDays, getYears, months } from "./helper";
import classNames from "classnames";

const DateFilter = ({dateFilter, setDateFilter}) => {

	return (
		<div className={styles.wrapper}>
			<div className={styles.searchWrap}>
				<div className={styles.yearSelect}>
					<Select
						placeholder="Выбрать год"
						className={styles.select}
						classNameSelect={styles.selectContentYear}
						data={getYears()}
						onChange={(value) => setDateFilter(dateFilter => ({...dateFilter, y: value}))}
						cleareFilter={() => setDateFilter(dateFilter => ({...dateFilter, y: ''}))}
					/>
				</div>

				<div className={styles.daySelect}>
					<Select
						placeholder="Выбрать день"
						className={styles.select}
						classNameSelect={styles.selectContent}
						data={getDays()}
						onChange={(value) => setDateFilter(dateFilter => ({...dateFilter, d: value}))}
						cleareFilter={() => setDateFilter(dateFilter => ({...dateFilter, d: ''}))}
					/>
				</div>
			</div>

			<div className={styles.buttonsWrap}>
				{months?.map((item, index) => (
					<button
						key={index}
						onClick={() => {
							if (dateFilter?.m !== item.id) setDateFilter(dateFilter => ({...dateFilter, m: item.id}));
							else setDateFilter(dateFilter => ({...dateFilter, m: ''}));
						}}
						className={classNames({
							[styles.button]: true,
							[styles.active]: item.id === dateFilter?.m,
						})}
					>
						{item.text}
					</button>
				))}
			</div>
		</div>
	);
};

export default DateFilter;