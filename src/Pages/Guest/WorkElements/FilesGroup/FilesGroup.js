import React, { useState } from "react";
import { useSelector } from "react-redux";
import styles from "./FilesGroup.module.sass";
import WorkBars from "../../../PrivateCabinet/Components/WorkElements/WorkBars";
import WorkBarsPreview from "../../../PrivateCabinet/Components/WorkElements/WorkBarsPreview";
import FileLineShort from "../FileLineShort";
import FileBar from "../FileBar";
import classNames from "classnames";
import { ReactComponent as PlayIcon } from "../../../../assets/PrivateCabinet/play-grey.svg";

import SideList from '../../../PrivateCabinet/Components/SharedFiles/SideList'
import WorkLinesPreview from "../../../PrivateCabinet/Components/Archive/WorkElements/WorkLinesPreview";
import FileLine from "../../../PrivateCabinet/Components/Archive/WorkElements/FileLine";

function FilesGroup({
						fileList,
						filePreview,
						setFilePreview,
						callbackArrMain,
						chosenFile,
						setChosenFile,
						filePick,
						setFilePick,
						setAction,
						setMouseParams,
						mounthName,
						index
					}) {
	const [collapse, setCollapse] = useState(index === 0);
	const workElementsView = useSelector((state) => state.PrivateCabinet.view);

	const renderFiles = (Type, shareLink) => {
		if (!fileList || fileList.length === 0) return null;
		return fileList?.map((file, index) => (
			<Type
				key={index}
				file={file}
				setChosenFile={setChosenFile}
				chosenFile={chosenFile}
				setMouseParams={setMouseParams}
				setAction={setAction}
				filePreview={filePreview}
				setFilePreview={setFilePreview}
				setFilePick={setFilePick}
				filePick={filePick}
				chosen={
					filePick.show
						? filePick.files.findIndex((el) => el === file.fid) >= 0
						: chosenFile?.fid === file?.fid
				}
				callbackArrMain={callbackArrMain}
				shareLink={shareLink}
			/>
		));
	};

	return (
		<div className={styles.fileWrap}>
			{fileList?.length > 0 && <div
				onClick={() => {
					setCollapse(!collapse);
				}}
				className={styles.collapseHeader}
			>
				<p className={styles.dateName}>{mounthName}</p>
				<div className={styles.buttonsWrap}>
					<button className={styles.collapseBtn}>
						{fileList?.length ?? 0} объектов
					</button>
					<div
						className={classNames({
							[styles.arrowFile]: true,
							[styles.active]: !!collapse,
						})}
					>
						<PlayIcon
							className={classNames({
								[styles.playButton]: true,
								[styles.revert]: !!collapse,
							})}
						/>
					</div>
				</div>
			</div>}

			{collapse &&
			workElementsView !== "preview" &&
			workElementsView !== "workLinesPreview" && (
				<div className={styles.fileDate}>
					{/* TODO: заменить дату при получении сгруппированного на даты списка файлов  */}
					{fileList?.length > 0 && <p>10.08.2020</p>}
				</div>
			)}

			{collapse &&
			<>
				{workElementsView === "bars" && (
					<WorkBars filePick={filePick} hideUploadFile={true}>{renderFiles(FileBar)}</WorkBars>
				)}

				{workElementsView === "lines" && (
					<div className={styles.collapseContent}>
						{renderFiles(FileLine, true)}
					</div>
				)}

				{workElementsView === "preview" && (
					<div className={styles.workSpace}>
						<WorkBarsPreview
							file={chosenFile}
							filePick={filePick}
						>
							{renderFiles(FileBar)}
						</WorkBarsPreview>
					</div>
				)}
				{workElementsView === "workLinesPreview" && (
					<div className={`${styles.workSpace} ${styles.workSpacePreviewLine}`}>
						<SideList>
							{renderFiles(FileLineShort, true)}
						</SideList>
						<div className={styles.filePreviewWrap}>
							<WorkLinesPreview
								file={chosenFile}
								hideFileList={true}
								filePick={filePick}
							/>
						</div>
					</div>
				)}
			</>}


		</div>
	);
}

export default FilesGroup;