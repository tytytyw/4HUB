import React, { useState, useEffect, useRef, useMemo } from "react";
import styles from "./ChatBoard.module.sass";
import { ReactComponent as AddIcon } from "../../../../../assets/PrivateCabinet/add-2.svg";
import { ReactComponent as SmileIcon } from "../../../../../assets/PrivateCabinet/smile.svg";
import { ReactComponent as RadioIcon } from "../../../../../assets/PrivateCabinet/radio-3.svg";
import { ReactComponent as PlayIcon } from "../../../../../assets/PrivateCabinet/play-grey.svg";
import { ReactComponent as TimerIcon } from "../../../../../assets/PrivateCabinet/alarmClock.svg";
import EmojiArea from "../EmojiArea";
import ServePanel from "../ServePanel";
import SecretChatStartWallpaper from "./SecretChatStartWallpaper";
import { ReactComponent as AddFirstContactIcon } from "../../../../../assets/PrivateCabinet/addFirstContact.svg";
import { useSelector, useDispatch } from "react-redux";
import classNames from "classnames";
import InviteUser from "./InviteUser";
import Message from "./Message";
import InfoPanel from "./InfoPanel";
import TextArea from "./TextArea";
import api from "../../../../../api";
import Loader from "../../../../../generalComponents/Loaders/4HUB";
import VideoRecordPreview from "./VideoRecordPreview";
import { monthToString } from "../../../../../generalComponents/chatHelper";
import { useScrollElementOnScreen } from "../../../../../generalComponents/Hooks";
import { onGetChatMessages } from "../../../../../Store/actions/CabinetActions";

let audioFrequencyData = [];

const ChatBoard = ({
	sideMenuCollapsed,
	boardOption,
	setShowSuccessPopup,
	action,
	setAction,
	setMouseParams,
	currentDate,
	addMessage,
	nullifyAction,
}) => {
	const [rightPanelContentType, setRightPanelContentType] = useState("");
	const id_company = useSelector((state) => state.user.id_company);
	const contactList = useSelector((state) =>
		id_company ? state.Cabinet.companyContactList : state.Cabinet.contactList
	);
	const selectedContact = useSelector(
		(state) => state.Cabinet.chat.selectedContact
	);
	const [mediaRecorder, setMediaRecorder] = useState(null);
	const [isRecording, setIsRecording] = useState(false);
	const [ducationTimer, setDucationTimer] = useState(0);
	const [messageIsSending, setMessageIsSending] = useState(false);
	const endMessagesRef = useRef();
	const chatArea = useRef();
	const footerRef = useRef();
	const videoMessagePreview = useRef();
	const uid = useSelector((state) => state.user.uid);
	const [videoPreview, setVideoPreview] = useState(null);
	const [messagesPage, setMessagesPage] = useState(1);
	const [loadingMessages, setLoadingMessages] = useState(false);
	const [chatBoardOldHeight, setChatBoardOldHeight] = useState(0);
	const search = useSelector((state) => state.Cabinet.search);
	const dispatch = useDispatch();

	const messages = useSelector((state) => state.Cabinet.chat.messages);

	const renderMessages = (day) => {
		const messagesOfDay = [...messages[day]].reverse();
		return messagesOfDay.map((msg, index) => {
			return (
				<Message
					message={{ ...msg, day }}
					selectedContact={selectedContact}
					key={msg.id+msg.ut}
					currentDate={currentDate}
					setMouseParams={setMouseParams}
				/>
			);
		});
	};

	const dateToString = (date) => {
		if (date === "today") return "Сегодня";
		if (date === "yesterday") return "Вчера";
		const arr = date.split("-").reverse();
		const day = arr[0];
		const month = monthToString(+arr[1] - 1);
		const year = currentDate.getFullYear() === +arr[2] ? "" : arr[2];
		return `${+day} ${month} ${year}`;
	};

	const renderGroups = useMemo(() => {
		if (
			selectedContact?.is_secret_chat &&
			(messages === null || (messages && Object.keys(messages)?.length === 0))
		)
			return (
				<SecretChatStartWallpaper>
					{messages === null ? (
						<Loader
							type="bounceDots"
							position="static"
							background="transparent"
							zIndex={5}
							width="100px"
							height="100px"
							containerType="bounceDots"
						/>
					) : (
						""
					)}
				</SecretChatStartWallpaper>
			);

		if (typeof messages !== "object" || !messages)
			return (
				<Loader
					type="bounceDots"
					position="absolute"
					background="white"
					zIndex={5}
					width="100px"
					height="100px"
					containerType="bounceDots"
				/>
			);
		const days = Object.keys(messages).reverse();
		return days.map((day) =>
			messages[day]?.length && selectedContact ? (
				<div className={styles.dateGroup} key={day}>
					<div className={styles.date}>
						<span className={styles.text}>{dateToString(day)}</span>
					</div>
					{renderMessages(day)}
				</div>
			) : null
		);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [messages, currentDate, selectedContact]);

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

	const recordEnd = () => {
		mediaRecorder?.stop();
	};

	const recordCancel = () => {
		if (mediaRecorder) {
			const cleareTracks = () =>
				mediaRecorder.stream.getTracks().forEach((track) => track.stop());
			mediaRecorder?.state === "active" && recordEnd();
			mediaRecorder && cleareTracks();
			setMediaRecorder(null);
			setVideoPreview(null);
		}
		setIsRecording(false);
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

	const mouseUpHandler = (e) => {
		//for recording
		const mouseUpOnFooter = footerRef?.current?.offsetTop + 90 < e.pageY;
		mouseUpOnFooter && ducationTimer > 1 ? recordEnd() : recordCancel();
	};

	const onSuccessLoading = (result) => {
		if (typeof result === "object") {
			let moreElements = false;
			for (let key in result) {
				if (result[key].length > 0) moreElements = true;
			}
			setTimeout(() => {
				moreElements
					? setMessagesPage((filesPage) => filesPage + 1)
					: setMessagesPage(0);
				setLoadingMessages(false);
			}, 500);
		} else {
			setTimeout(() => {
				setMessagesPage(0);
				setLoadingMessages(false);
			}, 500);
		}
	};
	const load = (entry) => {
		if (entry.isIntersecting && !loadingMessages && messagesPage !== 0) {
			setChatBoardOldHeight(chatArea.current.scrollHeight);

			setLoadingMessages(true);
			dispatch(
				onGetChatMessages(
					selectedContact,
					search,
					messagesPage,
					onSuccessLoading
				)
			);
		}
	};
	const options = { root: null, rootMargin: "0px", threshold: 0 };
	const [startMessagesRef] = useScrollElementOnScreen(options, load);

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

	useEffect(() => {
		if (isRecording) {
			const timer = setInterval(() => {
				setDucationTimer((sec) => sec + 1);
			}, 1000);
			return () => {
				clearInterval(timer);
				setDucationTimer(0);
			};
		}
	}, [isRecording]);

	const scrollToBottom = () => {
		endMessagesRef?.current?.scrollIntoView();
	};
	useEffect(() => {
		if (
			chatBoardOldHeight &&
			chatArea.current.scrollHeight - chatBoardOldHeight
		) {
			chatArea?.current?.scrollTo(
				0,
				chatArea.current.scrollHeight - chatBoardOldHeight
			);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [messages]);

	useEffect(() => {
		setMessagesPage(1);
		scrollToBottom();
	}, [selectedContact]);

	return (
		<div
			className={classNames({
				[styles.chatBoardWrap]: true,
				[styles.recoring]: isRecording,
			})}
			onMouseLeave={recordCancel}
			onMouseUp={mouseUpHandler}
		>
			{selectedContact ? (
				<ServePanel
					selectedContact={selectedContact}
					setAction={setAction}
					setRightPanelContentType={setRightPanelContentType}
				/>
			) : (
				""
			)}
			<main className={styles.chatBoardMessageList}>
				<div
					className={classNames({
						[styles.chatAreaWrapper]: true,
						[styles.center]:
							selectedContact?.is_secret_chat &&
							(!messages || (messages && Object.keys(messages).length === 0)),
					})}
					style={{
						width: rightPanelContentType ? "calc(100% - 200px)" : "100%",
					}}
				>
					<div className={styles.chatArea} ref={chatArea}>
						<div
							className={classNames({
								[styles.bottomLine]: true,
								[styles.bottomLineHidden]: messagesPage === 0,
							})}
							ref={startMessagesRef}
						>
							{messagesPage !== 1 ? (
								<Loader
									type="bounceDots"
									position="absolute"
									background="white"
									zIndex={5}
									width="100px"
									height="100px"
									containerType="bounceDots"
								/>
							) : (
								""
							)}
						</div>
						{contactList?.length === 0 && boardOption === "contacts" ? (
							<AddFirstContactIcon
								className={classNames({
									[styles.addFirstContactIcon]: true,
									[styles.collapsedMenu]: sideMenuCollapsed,
								})}
							/>
						) : (
							""
						)}
						{selectedContact?.is_user === 0 ? (
							<InviteUser
								contact={selectedContact}
								setShowSuccessPopup={setShowSuccessPopup}
							/>
						) : (
							renderGroups
						)}
						<div ref={endMessagesRef} />
					</div>
					{action?.type === "editMessage" ? (
						// TODO: add api when it will be ready
						<div
							className={styles.editingMessage}
							style={{
								width: rightPanelContentType
									? "calc(100% - 65px)"
									: "calc(100% - 200px - 65px)",
							}}
						>
							<div className={styles.line}></div>
							<p className={styles.text}>{action.message.text}</p>
							<div className={styles.close} onClick={nullifyAction} />
						</div>
					) : (
						""
					)}
				</div>
				<div className={styles.rightPanelContentType}>
					{rightPanelContentType === "emo" ? <EmojiArea /> : null}
					{rightPanelContentType === "info" ? (
						<InfoPanel setAction={setAction} />
					) : null}
				</div>
			</main>
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
							setRightPanelContentType((state) =>
								state === "emo" ? "" : "emo"
							)
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
			{videoPreview ? (
				<VideoRecordPreview
					isVideoMessage={videoMessagePreview}
					ducationTimer={ducationTimer}
					timeLimit={60 * 10}
					recordEnd={recordEnd}
				/>
			) : (
				""
			)}
		</div>
	);
};

export default ChatBoard;
