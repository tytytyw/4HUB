import React from "react";
import styles from "./Header.module.sass";
import { ReactComponent as TriangleIcon } from "../../../../../../../../assets/PrivateCabinet/play-grey.svg";
import { ReactComponent as SearchIcon } from "../../../../../../../../assets/PrivateCabinet/search.svg";

const Header = ({setOption, title}) => {
	return (
		<div className={styles.wrapper}>
			<div className={styles.backButton} onClick={() => setOption('main')}>
				<TriangleIcon title="" className={styles.triangleIcon} />
			</div>
			<div className={styles.title}>{title}</div>
			<div className={styles.searchBtn}>
				<SearchIcon title="" className={styles.searchIcon} />
			</div>
		</div>
	);
};

export default Header;