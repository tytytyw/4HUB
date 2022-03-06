import React, { useState, useEffect } from "react";
import styles from "../ChatBoard.module.sass";
import classNames from "classnames";
import { useSelector } from "react-redux";

import { ReactComponent as AddIcon } from "../../../../../../assets/PrivateCabinet/add-2.svg";
import { ReactComponent as SmileIcon } from "../../../../../../assets/PrivateCabinet/smile.svg";
import { ReactComponent as RadioIcon } from "../../../../../../assets/PrivateCabinet/radio-3.svg";
import { ReactComponent as PlayIcon } from "../../../../../../assets/PrivateCabinet/play-grey.svg";
import { ReactComponent as TimerIcon } from "../../../../../../assets/PrivateCabinet/alarmClock.svg";
import TextArea from "../TextArea";
import Loader from "../../../../../../generalComponents/Loaders/4HUB";
import api from "../../../../../../api";

let audioFrequencyData = [];

const ChatBoardFooter = ({
	footerRef,
	isRecording,
	ducationTimer,
	addMessage,
	action,
	setMouseParams,
	nullifyAction,
	setRightPanelContentType,
	setIsRecording,
	mediaRecorder,
	setMediaRecorder,
	setVideoPreview,
	videoMessagePreview,
	recordCancel,
}) => {
	const [messageIsSending, setMessageIsSending] = useState(false);
	const selectedContact = useSelector(
		(state) => state.Cabinet.chat.selectedContact
	);
	const uid = useSelector((state) => state.user.uid);

	const upLoadFile = (blob, fileName, kind) => {
		setMessageIsSending(true);
		const file = new File([blob], fileName, { type: blob.type });
		const formData = new FormData();
		formData.append("myfile", file);
		createHistogramData(audioFrequencyData).then((histogramData) => {
			api
				.post(`/ajax/chat_file_upload.php?uid=${uid}`, formData)
				.then((res) => {
					if (res.data.ok) {
						const attachment = {
							...res.data.files.myfile,
							link: res.data.link,
							kind,
						};
						if (histogramData) attachment.histogramData = histogramData;
						addMessage("", attachment);
					}
				})
				.finally(() => setMessageIsSending(false));
		});
	};

	const onRecording = (type, constraints) => {
		navigator.getUserMedia =
			navigator.getUserMedia ||
			navigator.mozGetUserMedia ||
			navigator.msGetUserMedia ||
			navigator.webkitGetUserMedia;
		setIsRecording(true);
		audioFrequencyData = [];
		const wantMimeType = constraints.video
			? MediaRecorder.isTypeSupported("video/webm;codecs=vp8,opus")
				? "video/webm;codecs=vp8,opus"
				: "video/mp4"
			: MediaRecorder.isTypeSupported("audio/webm;codecs=opus")
			? "audio/webm;codecs=opus"
			: "audio/mp3";
		if (navigator.mediaDevices && MediaRecorder.isTypeSupported(wantMimeType)) {
			navigator.mediaDevices
				.getUserMedia(constraints) // ex. { audio: true , video: true}
				.then((stream) => {
					if (type === "message") {
						// for audio/video messages
						const recorder = new MediaRecorder(stream, {
							mimeType: wantMimeType,
						});
						recorder.start();
						setMediaRecorder(recorder);
						if (constraints.video) {
							// video preview
							setVideoPreview(true);
							const video = videoMessagePreview.current;
							if (video) {
								video.srcObject = stream;
								video.play();
							}
						} else {
							// get audio frequency data for histogram
							const audioContext = new (window.AudioContext ||
								window.webkitAudioContext)();
							const processor = audioContext.createScriptProcessor(256, 1, 1);
							const analyser = audioContext.createAnalyser();
							const source = audioContext.createMediaStreamSource(stream);
							source.connect(analyser);
							source.connect(processor);
							processor.connect(audioContext.destination);
							const getAudioFrequencyData = () => {
								if (stream.active) {
									let audioData = new Uint8Array(64);
									analyser.getByteFrequencyData(audioData);
									const sumFrequencyValues = audioData.reduce(
										(previousValue, currentValue) =>
											previousValue + currentValue,
										0
									);
									const averageFrequencyValue = Math.floor(
										sumFrequencyValues / audioData.length
									);
									if (averageFrequencyValue)
										audioFrequencyData.push(averageFrequencyValue);
								} else
									processor.removeEventListener(
										"audioprocess",
										getAudioFrequencyData
									);
							};
							processor.addEventListener("audioprocess", getAudioFrequencyData);
						}
					}
				})
				.catch((error) => {
					setIsRecording(false);
					console.log(error);
				});
		} else {
			console.log("Browser not supported");
			setIsRecording(false);
		}
	};

	const createHistogramData = async (data) => {
		if (data.length) {
			const result = [];
			const columnDataLength = Math.floor(data.length / 50);
			for (let i = 0; i < 50; i++) {
				const columnData = data.splice(0, columnDataLength);
				const columnValue = Math.floor(
					columnData.reduce((p, c) => p + c, 0) / columnDataLength
				);
				result.push(
					columnValue > 120 ? 100 : columnValue < 5 ? 0 : columnValue
				);
			}
			return result;
		}
	};

	const onDataAviable = (e) => {
		if (isRecording) {
			const data = e.data;
			if (data.type.includes("audio"))
				upLoadFile(data, "аудио сообщение", "audio_message");
			if (data.type.includes("video"))
				upLoadFile(data, "видео сообщение", "video_message");
			setMediaRecorder(null);
			recordCancel();
		}
		setIsRecording(false);
	};

	useEffect(() => {
		if (mediaRecorder) {
			isRecording
				? mediaRecorder.addEventListener("dataavailable", onDataAviable)
				: recordCancel();
		}
		return () => {
			if (mediaRecorder)
				mediaRecorder.removeEventListener("dataavailable", onDataAviable);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [mediaRecorder]);

	return (
		<footer ref={footerRef} className={styles.chatBoardFooter}>
			{isRecording ? (
				<div className={styles.leftContainer}>
					<div className={styles.recordIcon}></div>
					<span className={styles.duration}>{`${
						Math.floor(ducationTimer / 60) < 10
							? `0${Math.floor(ducationTimer / 60)}`
							: Math.floor(ducationTimer / 60)
					}:${
						ducationTimer % 60 < 10
							? `0${Math.floor(ducationTimer % 60)}`
							: Math.floor(ducationTimer % 60)
					}`}</span>
				</div>
			) : (
				<div className={styles.downloadOptions}>
					<AddIcon title="Вставить файл" />
				</div>
			)}
			{isRecording ? (
				<div className={styles.recordHint}>
					Для отмены отпустите курсор вне поля
				</div>
			) : (
				<TextArea
					addMessage={addMessage}
					action={action}
					nullifyAction={nullifyAction}
				/>
			)}
			<div
				className={classNames({
					[styles.sendOptions]: true,
					[styles.secretChat]: selectedContact?.is_secret_chat,
				})}
			>
				{messageIsSending ? (
					<div className={styles.loaderWrapper}>
						<Loader
							type="bounceDots"
							position="absolute"
							background="white"
							zIndex={5}
							width="100px"
							height="100px"
							containerType="bounceDots"
						/>
					</div>
				) : (
					<>
						<div
							title="Аудио сообщение"
							className={classNames({
								[styles.button]: true,
								[styles.pressed]: isRecording,
							})}
							onMouseDown={() => onRecording("message", { audio: true })}
						>
							<RadioIcon />
						</div>
						<div
							title="Видео сообщение"
							className={classNames({
								[styles.button]: true,
								[styles.pressed]: isRecording,
							})}
							onMouseDown={() =>
								onRecording("message", { audio: true, video: true })
							}
						>
							<PlayIcon className={styles.triangle} />
						</div>
					</>
				)}
				<div
					title="Смайлики"
					className={styles.button}
					onClick={() =>
						setRightPanelContentType((state) => (state === "emo" ? "" : "emo"))
					}
				>
					<SmileIcon title="" />
				</div>
				{selectedContact?.is_secret_chat ? (
					<div
						title="Таймер сообщений"
						className={styles.button}
						onClick={(e) =>
							setMouseParams({
								x: e.clientX,
								y: e.clientY,
								width: 59,
								height: 15,
								contextMenuList: "timer",
							})
						}
					>
						<TimerIcon title="" />
					</div>
				) : null}
			</div>
		</footer>
	);
};

export default ChatBoardFooter;