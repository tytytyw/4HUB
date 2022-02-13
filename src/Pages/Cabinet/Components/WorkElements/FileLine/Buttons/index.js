import React from "react";
import styles from "../FileLine.module.sass";
import classNames from "classnames";

import { ReactComponent as DownLoadIcon } from "../../../../../../assets/PrivateCabinet/download.svg";
import { ReactComponent as PrintIcon } from "../../../../../../assets/PrivateCabinet/print.svg";
import { ReactComponent as SettingsIcon } from "../../../../../../assets/PrivateCabinet/settings.svg";
import { ReactComponent as DeleteIcon } from "../../../../../../assets/PrivateCabinet/delete.svg";
import { ReactComponent as ShareIcon } from "../../../../../../assets/PrivateCabinet/share.svg";

const Buttons = ({
	file,
	callbackArrMain,
	setAction,
	openFolderMenu,
	setMouseParams,
}) => {
	const downloadFile = () => {
		// TODO - api for downloading folder
		if (file?.is_dir === 0) {
			setTimeout(() => {
				callbackArrMain.forEach((item) => {
					if (item.type === "download") item.callback();
				});
			}, 0);
		}
	};

	const printFile = () => {
		setTimeout(() => {
			callbackArrMain.forEach((item) => {
				if (item.type === "print") item.callback(file);
			});
		}, 0);
	};

	const onPropertiesFile = () => {
		setTimeout(() => {
			callbackArrMain.forEach((item, index) => {
				if (item.type === "customize") item.callback(callbackArrMain, index);
			});
		}, 0);
	};

	const onShareFile = () => {
		setTimeout(() => {
			callbackArrMain.forEach((item) => {
				if (item.type === "share") setAction(item);
			});
		}, 0);
	};
	return (
		<div className={styles.optionsWrap}>
			<div className={styles.iconView}>
				<DownLoadIcon onClick={downloadFile} />
			</div>

			{file?.ext !== "ZIP" && file?.is_dir !== 1 && (
				<div className={styles.iconView}>
					<PrintIcon onClick={printFile} />
				</div>
			)}

			<div
				className={classNames({
					[styles.iconView]: true,
					[styles.iconSettings]: true,
					[styles.disable]: file?.is_write === "0",
				})}
			>
				<SettingsIcon
					onClick={file?.is_write === "0" ? null : onPropertiesFile}
				/>
			</div>

			<div
				className={classNames(styles.iconView, styles.iconTrash)}
				onClick={() =>
					setAction({
						type: "delete",
						name: "Удаление файла",
						text: `Вы действительно хотите удалить файл ${file?.name}?`,
					})
				}
			>
				<DeleteIcon />
			</div>

			<div className={classNames(styles.iconView, styles.iconShare)}>
				<ShareIcon onClick={onShareFile} />
			</div>

			<div
				className={styles.menuWrap}
				onClick={(e) => {
					file?.is_dir
						? openFolderMenu(e, file)
						: setMouseParams({
								x: e.clientX,
								y: e.clientY,
								width: 240,
								height: 25,
						  });
				}}
			>
				<span className={styles.menu} />
			</div>
		</div>
	);
};

export default Buttons;
