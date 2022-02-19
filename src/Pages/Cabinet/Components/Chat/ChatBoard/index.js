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
import { useSelector } from "react-redux";
import classNames from "classnames";
import InviteUser from "./InviteUser";
import Message from "./Message";
import InfoPanel from "./InfoPanel";
import TextArea from "./TextArea";
import api from "../../../../../api";

const ChatBoard = ({
	sideMenuCollapsed,
	boardOption,
	setShowSuccessPopup,
	setAction,
	setMouseParams,
	currentDate,
	addMessage,
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
	const [messageIsSending, setMessageIsSending] = useState(false);
	const endMessagesRef = useRef();
	const uid = useSelector((state) => state.user.uid);

	const messages = useSelector((state) => state.Cabinet.chat.messages);

	const renderMessages = useMemo(() => {
		if (selectedContact?.is_secret_chat && messages?.length === 0)
			return <SecretChatStartWallpaper />;
		if (!messages?.length || !selectedContact) return null;
		return messages.map((msg, index) => {
			return (
				<Message
					message={msg}
					selectedContact={selectedContact}
					key={index}
					currentDate={currentDate}
				/>
			);
		});
	}, [messages, currentDate, selectedContact]);

	const upLoadFile = (blob, fileName) => {
		const file = new File([blob], fileName, {type: blob.type});
		const formData = new FormData();
		formData.append("myfile", file);
		api.post(`/ajax/chat_file_upload.php?uid=${uid}`, formData)
			.then(res => {
				if (res.data.ok) {
					const attachment = {...res.data.files.myfile, link: res.data.link}
					addMessage('', attachment)
				}
			})
	}

	const onRecording = (type, constraints) => {
		if (navigator.mediaDevices) {
			setIsRecording(true);
			navigator.mediaDevices
				.getUserMedia(constraints) // ex. { audio: true , video: true}
				.then((stream) => {
					if (type === "message") {
						// for audio/video messages
						const recorder = new MediaRecorder(stream);
						setMediaRecorder(recorder);
					}
				})
				.catch((error) => console.log(error));
		}
	};

	const recordEnd = () => {
		mediaRecorder?.stop();
	};

	const recordCancel = () => {
		if (isRecording && mediaRecorder) {
			const cleareTracks = () =>
				mediaRecorder.stream.getTracks().forEach((track) => track.stop());
			mediaRecorder?.state === "active" && recordEnd();
			mediaRecorder && cleareTracks();
			setMediaRecorder(null);
		}
		setIsRecording(false);
	};

	const onDataAviable = (e) => {
		if (isRecording) {
			const data = e.data;
			if (data.type.includes("audio")) upLoadFile(data, 'аудио сообщение')
			if (data.type.includes("video")) upLoadFile(data, 'видер сообщение')
			setIsRecording(false);
			setMediaRecorder(null);
			recordCancel();
		}
	};

	useEffect(() => {
		if (mediaRecorder) {
			mediaRecorder.start();
			mediaRecorder.addEventListener("dataavailable", onDataAviable);
		}
		return () => {
			if (mediaRecorder)
				mediaRecorder.removeEventListener("dataavailable", onDataAviable);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [mediaRecorder]);

	const scrollToBottom = () => {
		endMessagesRef?.current?.scrollIntoView();
	};
	useEffect(() => scrollToBottom, [messages, selectedContact]);

	return (
		<div className={styles.chatBoardWrap}>
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
					style={{
						width: rightPanelContentType ? "calc(100% - 200px)" : "100%",
					}}
					className={styles.chatArea}
				>
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
						renderMessages
					)}
					<div ref={endMessagesRef} />
				</div>
				<div className={styles.rightPanelContentType}>
					{rightPanelContentType === "emo" ? <EmojiArea /> : null}
					{rightPanelContentType === "info" ? (
						<InfoPanel setAction={setAction} />
					) : null}
				</div>
			</main>
			<footer className={styles.chatBoardFooter}>
				<div className={styles.downloadOptions}>
					<AddIcon title="Вставить файл" />
				</div>
				<TextArea addMessage={addMessage} />
				<div className={styles.sendOptions}>
					<div
						title="Аудио сообщение"
						className={styles.button}
						onMouseDown={() => onRecording("message", { audio: true })}
						onMouseUp={() => recordEnd()}
						onMouseOut={recordCancel}
					>
						<RadioIcon />
					</div>
					<div
						title="Видео сообщение"
						className={styles.button}
						onMouseDown={() => onRecording("message", { audio: true, video: true })}
						onMouseUp={() => recordEnd()}
						onMouseOut={recordCancel}
					>
						<PlayIcon className={styles.triangle} />
					</div>
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
		</div>
	);
};

export default ChatBoard;
