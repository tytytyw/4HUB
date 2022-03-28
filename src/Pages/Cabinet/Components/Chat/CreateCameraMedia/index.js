import React, { useState, useEffect, useRef } from "react";
import PopUp from "../../../../../generalComponents/PopUp";
import styles from "./CreateCameraMedia.module.sass";
import Buttons from "./Buttons";
import {
	cameraAccess,
	wantMimeType,
} from "../../../../../generalComponents/chatHelper";
import Loader from "../../../../../generalComponents/Loaders/4HUB";
import VideoPlayer from "./VideoPlayer";
import ImagePreview from "./ImagePreview";
import api from "../../../../../api";
import { useSelector } from "react-redux";

const CreateCameraMedia = ({
	nullifyAction,
	addMessage,
	socket,
	scrollToBottom,
}) => {
	const [state, setState] = useState("init");
	const [contentType, setContentType] = useState("image");
	const [stream, setStream] = useState(null);
	const [videoPreview, setVideoPreview] = useState(null);
	const [imagePreview, setImagePreview] = useState(null);
	const [quality, setQuality] = useState(720);
	const [isRecording, setIsRecording] = useState(false);
	const [mediaRecorder, setMediaRecorder] = useState(null);
	const [ducationTimer, setDucationTimer] = useState(0);
	const [textMessage, setTextMessage] = useState("");
	const [gloader, setgloader] = useState(false);
	const [visualEffects, setVisualEffects] = useState({
		transform: { scale: "", rotate: 0 },
		filter: {
			brightness: 1,
			contrast: 1,
			saturate: 1,
			grayscale: 0,
			"hue-rotate": 0,
			invert: 0,
			sepia: 0,
			blur: 0,
			result: "",
		},
	});
	const uid = useSelector((state) => state.user.uid);

	const streamPreviewRef = useRef();
	const videoPreviewRef = useRef();
	const canvasRef = useRef();
	const imageRef = useRef();
	const previewSize = useRef();

	const constraints = {
		audio: true,
		video: { height: { exact: quality }, facingMode: "user" },
	};

	const getStream = () =>
		cameraAccess(constraints)
			.then((stream) => onStreamReady(stream))
			.catch(() => console.log("error access to cam"));

	const cleareStreamTracks = () => {
		if (stream) stream.getTracks().forEach((track) => track.stop());
	};

	const onStreamReady = (stream) => {
		const video = streamPreviewRef.current;
		video.srcObject = stream;
		video.play();
		setStream(stream);
	};

	const onRecordVideo = () => {
		const recorder = new MediaRecorder(stream, {
			mimeType: wantMimeType(constraints),
		});
		recorder.start();
		setMediaRecorder(recorder);
	};

	const onActionBtnHandler = () => {
		if (contentType === "video") {
			setIsRecording(true);
			onRecordVideo();
		}
	};

	const videoDataAviable = (e) => {
		setVideoPreview(URL.createObjectURL(e.data));
		cleareStreamTracks();
		setState("readyToSend");
	};

	const videoRecordStop = () => {
		setIsRecording(false);
		mediaRecorder.stop();
	};

	const takePicture = () => {
		const video = streamPreviewRef.current;
		previewSize.current = {
			height: video.clientHeight,
			width: video.clientWidth,
		};

		const canvas = canvasRef.current;
		const context = canvas.getContext("2d");
		canvas.height = video.videoHeight;
		canvas.width = video.videoWidth;
		context.drawImage(video, 0, 0);
		setImagePreview(canvas.toDataURL("image/png"));
		cleareStreamTracks();
		setState("readyToSend");
	};

	const setInitialState = () => {
		setStream(null);
		setState("init");
		setVideoPreview(null);
		setImagePreview(null);
		getStream();
		setVisualEffects({
			transform: { scale: "", rotate: 0 },
			filter: {
				brightness: 1,
				contrast: 1,
				saturate: 1,
				grayscale: 0,
				"hue-rotate": 0,
				invert: 0,
				sepia: 0,
				blur: 0,
				result: "",
			},
		});
	};

	const rotateCanvas = () => {
		const image = imageRef.current;
		const canvas = canvasRef.current;
		const context = canvas.getContext("2d");
		canvas.height = image.naturalWidth;
		canvas.width = image.naturalHeight;
		context.translate(canvas.width / 2, canvas.height / 2);
		context.rotate((-90 * Math.PI) / 180);
		context.translate(-canvas.height / 2, -canvas.width / 2);
		context.drawImage(imageRef.current, 0, 0);
		setImagePreview(canvas.toDataURL("image/png"));
	};

	const onRotateClick = () => {
		setVisualEffects((prevEffects) => ({
			...prevEffects,
			transform: {
				...prevEffects.transform,
				rotate:
					prevEffects.transform.rotate === 270
						? 0
						: prevEffects.transform.rotate + 90,
			},
		}));
		if (imageRef.current) rotateCanvas();
	};

	const onMirrorClick = () => {
		setVisualEffects((prevEffects) => ({
			...prevEffects,
			transform: {
				...prevEffects.transform,
				scale: prevEffects.transform.scale ? "" : "scale(-1, 1)",
			},
		}));
		if (imageRef.current) reflectCanvas();
	};

	const reflectCanvas = () => {
		const canvas = canvasRef.current;
		const width = canvas.width;
		const height = canvas.height;
		const context = canvas.getContext("2d");
		canvas.width = width;
		canvas.height = height;
		context.scale(-1, 1);
		context.translate(-canvas.width, 0);
		context.drawImage(imageRef.current, 0, 0);
		setImagePreview(canvas.toDataURL("image/png"));
	};

	const onSendFile = () => {
		setgloader(true);
		const getFileFromUrl = fetch(videoPreview || imagePreview)
			.then((res) => res.blob())
			.then(
				(blobFile) =>
					new File([blobFile], contentType, {
						type:
							contentType === "video" ? wantMimeType(constraints) : "image/png",
					})
			);
		getFileFromUrl.then((file) => {
			const formData = new FormData();
			formData.append("myfile", file);
			api
				.post(`/ajax/chat_file_upload.php?uid=${uid}`, formData)
				.then((res) => {
					if (res.data.ok) {
						const attachment = {
							...res.data.files.myfile,
							link: res.data.link,
							fid: res.data.fid,
							id: res.data.id,
							kind: contentType,
						};
						if (contentType === "video")
							attachment.visualEffects = {
								filter: visualEffects.filter.result,
								transform: `${visualEffects.transform.scale} rotate(-${visualEffects.transform.rotate}deg)`,
							};
						if (socket?.readyState) {
							addMessage(textMessage, attachment);
							scrollToBottom();
						} else console.log("соединение не установлено");
					}
				})
				.finally(() => {
					nullifyAction();
					setgloader(false);
				});
		});
	};

	useEffect(() => {
		getStream();
		return () => cleareStreamTracks();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [quality]);

	useEffect(() => {
		return () => cleareStreamTracks();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [stream]);

	useEffect(() => {
		if (mediaRecorder) {
			mediaRecorder.addEventListener("dataavailable", videoDataAviable);

			return () =>
				mediaRecorder.removeEventListener("dataavailable", videoDataAviable);
		}
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

	return gloader ? (
		<Loader
			type="bounceDots"
			background="transparent"
			zIndex={5}
			width="100px"
			height="100px"
			containerType="bounceDots"
		/>
	) : (
		<PopUp set={nullifyAction}>
			<div className={styles.contentWrapper}>
				<div className={styles.contentPreview}>
					<div className={styles.videoWrapper}>
						{videoPreview ? (
							<VideoPlayer
								source={videoPreview}
								videoPlayerRef={videoPreviewRef}
								visualEffects={{
									filter: visualEffects.filter.result,
									transform: `${visualEffects.transform.scale} rotate(-${visualEffects.transform.rotate}deg)`,
								}}
							/>
						) : imagePreview ? (
							<ImagePreview
								image={imagePreview}
								visualEffects={visualEffects}
								imageRef={imageRef}
								streamPreviewRef={streamPreviewRef}
								height={previewSize.current?.height}
								width={previewSize.current?.width}
							/>
						) : null}
						{!videoPreview && !imagePreview ? (
							<video
								ref={streamPreviewRef}
								className={styles.video}
								muted={true}
							/>
						) : null}
					</div>
				</div>
				{state === "init" && !isRecording && stream && (
					<select
						className={styles.select}
						value={quality}
						onChange={(e) => setQuality(+e.target.value)}
					>
						<option>1080</option>
						<option>720</option>
						<option>480</option>
						{/* <option>240</option> */}
					</select>
				)}
				{!stream && !isRecording ? (
					<Loader
						type="bounceDots"
						background="transparent"
						zIndex={5}
						width="100px"
						height="100px"
						containerType="bounceDots"
					/>
				) : (
					""
				)}
			</div>

			<Buttons
				state={state}
				nullifyAction={nullifyAction}
				contentType={contentType}
				setContentType={setContentType}
				isRecording={isRecording}
				setIsRecording={setIsRecording}
				onActionBtnHandler={onActionBtnHandler}
				videoRecordStop={videoRecordStop}
				takePicture={takePicture}
				ducationTimer={ducationTimer}
				setInitialState={setInitialState}
				stream={stream}
				visualEffects={visualEffects}
				setVisualEffects={setVisualEffects}
				rotateCanvas={rotateCanvas}
				onRotateClick={onRotateClick}
				onMirrorClick={onMirrorClick}
				onSendFile={onSendFile}
				textMessage={textMessage}
				setTextMessage={setTextMessage}
			/>
			<canvas ref={canvasRef} style={{ display: "none" }} />
		</PopUp>
	);
};

export default CreateCameraMedia;