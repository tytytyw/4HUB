import React from "react";

import styles from "./PrevVersions.module.sass";
import SafeIcon from "../../../../Safe/SafeIcon";
import InputField from "../../../../../../../generalComponents/InputField";

const PrevVersions = ({ safe }) => {
	return (
		<div className={styles.prevVersionsWrap}>
			<div className={styles.nameBlock}>
				<div className={styles.safeWrap}>
					<SafeIcon color={safe.id_color} />
				</div>
				<div className={styles.inputWrap}>
					<InputField height="90%" placeholder={safe.name} disabled={true} />
				</div>
			</div>
			<div className={styles.prevChanged}>
				<div className={styles.infoWrap}>
					<span className={styles.name}>Дата изменения:</span>
					<span className={styles.value}>{safe.ctime}</span>
				</div>
				<div className={styles.prevFileBlock}>
					<div className={styles.safeWrap}>
						<SafeIcon color={safe.id_color} />
					</div>
					<div className={styles.infoFile}>
						<span>{safe.name}</span>
						<div className={styles.safeInfo}>
							{safe.fig || safe.emo ? (
								<div className={styles.signs}>
									{safe.fig ? (
										<img
											src={`./assets/PrivateCabinet/signs/${safe.fig}.svg`}
											alt="emoji"
										/>
									) : null}
									{safe.emo ? (
										<img
											src={`./assets/PrivateCabinet/smiles/${safe.emo}.svg`}
											alt="emoji"
										/>
									) : null}
								</div>
							) : null}
							<div className={styles.safeInfoText}>
								<span className={styles.sizeNow}>{safe.size_now}</span>
								<span></span>
							</div>
						</div>
					</div>
				</div>
				<div className={styles.description}>
					Вы можете восстановить старую версию файла из резервной копии для
					восстановления старого файла нажмите кнопку восстановить
				</div>
				<div className={styles.restoreWrap}>
					<div className={styles.restore}>Восстановить</div>
				</div>
			</div>
		</div>
	);
};

export default PrevVersions;
