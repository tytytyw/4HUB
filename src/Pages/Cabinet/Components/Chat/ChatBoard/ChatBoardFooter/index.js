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
import { cameraAccess, wantMimeType, ducationTimerToString } from "../../../../../../generalComponents/chatHelper";
import { useLocales } from "react-localized";
import PropTypes from "prop-types";
import { fileProps } from "types/File";
import { actionProps } from "types/Action";
import { mediaRecorderProps } from "types/Chat";
import { socketProps } from "types/Socket";

// TODO: use useRef
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
  file,
  setFile,
  scrollToBottom,
  socket,
  editMessage,
  attachedFiles
}) => {
  const { __ } = useLocales();
  const [messageIsSending, setMessageIsSending] = useState(false);
  const selectedContact = useSelector((state) => state.Cabinet.chat.selectedContact);
  const uid = useSelector((state) => state.user.uid);

  const upLoadFile = (blob, fileName, kind) => {
    setMessageIsSending(true);
    const sendingFile = file ?? new File([blob], fileName, { type: blob.type });
    const isWebmVideo = kind === "video_message" && sendingFile.type.includes("webm");
    const formData = new FormData();
    formData.append("myfile", sendingFile);
    formData.append("uid", uid);
    const apiUrl = isWebmVideo ? "file_video_convert" : "chat_file_upload";
    if (isWebmVideo) {
      formData.append("type_from", "webm");
      formData.append("type_to", "mp4");
    }
    createHistogramData(audioFrequencyData).then((histogramData) => {
      api
        .post(`/ajax/${apiUrl}.php`, formData)
        .then((res) => {
          if (res.data.ok) {
            const attachment = {
              ...res.data.files.myfile,
              link: res.data.link,
              fid: res.data.fid,
              id: res.data.id,
              kind
            };
            if (histogramData) attachment.histogramData = histogramData;
            if (socket?.readyState) {
              addMessage("", attachment);
              scrollToBottom();
            } else console.log("connection is not established");
          }
        })
        .finally(() => setMessageIsSending(false));
    });
    setFile(null);
  };

  const onRecording = (type, constraints) => {
    setIsRecording(true);
    audioFrequencyData = [];
    cameraAccess(constraints)
      .then((stream) => {
        if (type === "message") {
          // for audio/video messages
          const recorder = new MediaRecorder(stream, {
            mimeType: wantMimeType(constraints)
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
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
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
                  (previousValue, currentValue) => previousValue + currentValue,
                  0
                );
                const averageFrequencyValue = Math.floor(sumFrequencyValues / audioData.length);
                if (averageFrequencyValue) audioFrequencyData.push(averageFrequencyValue);
              } else processor.removeEventListener("audioprocess", getAudioFrequencyData);
            };
            processor.addEventListener("audioprocess", getAudioFrequencyData);
          }
        }
      })
      .catch(() => {
        setIsRecording(false);
        console.log("Browser not supported");
      });
  };

  const createHistogramData = async (data) => {
    if (data.length) {
      const result = [];
      const columnDataLength = Math.floor(data.length / 50);
      for (let i = 0; i < 50; i++) {
        const columnData = data.splice(0, columnDataLength);
        const columnValue = Math.floor(columnData.reduce((p, c) => p + c, 0) / columnDataLength);
        result.push(columnValue > 120 ? 100 : columnValue < 5 ? 0 : columnValue);
      }
      return result;
    }
  };

  const onDataAviable = (e) => {
    if (isRecording) {
      const data = e.data;
      if (data.type.includes("audio")) upLoadFile(data, __("?????????? ??????????????????"), "audio_message");
      if (data.type.includes("video")) upLoadFile(data, __("?????????? ??????????????????"), "video_message");
      setMediaRecorder(null);
      recordCancel();
    }
    setIsRecording(false);
  };

  const onAddMessage = (text) => {
    addMessage(text);
    scrollToBottom();
  };

  useEffect(() => {
    if (mediaRecorder) {
      isRecording ? mediaRecorder.addEventListener("dataavailable", onDataAviable) : recordCancel();
    }
    return () => {
      if (mediaRecorder) mediaRecorder.removeEventListener("dataavailable", onDataAviable);
    };
    // eslint-disable-next-line
  }, [mediaRecorder]);

  useEffect(() => {
    if (file) upLoadFile("", "", "file");
    // eslint-disable-next-line
  }, [file]);

  return (
    <footer ref={footerRef} className={styles.chatBoardFooter}>
      {isRecording ? (
        <div className={styles.leftContainer}>
          <div className={styles.recordIcon}></div>
          <span className={styles.duration}>{ducationTimerToString(ducationTimer)}</span>
        </div>
      ) : (
        <div className={styles.downloadOptions}>
          <AddIcon
            title={__("???????????????? ????????")}
            onClick={(e) =>
              setMouseParams({
                x: e.clientX,
                y: e.clientY,
                width: 220,
                height: 25,
                contextMenuList: "uploadFile"
              })
            }
          />
        </div>
      )}
      {isRecording ? (
        <div className={styles.recordHint}>{__("?????? ???????????? ?????????????????? ???????????? ?????? ????????")}</div>
      ) : (
        <TextArea
          onAddMessage={onAddMessage}
          action={action}
          nullifyAction={nullifyAction}
          editMessage={editMessage}
          attachedFiles={!!attachedFiles?.length}
        />
      )}
      <div
        className={classNames({
          [styles.sendOptions]: true,
          [styles.secretChat]: selectedContact?.is_secret_chat
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
              title={__("?????????? ??????????????????")}
              className={classNames({
                [styles.button]: true,
                [styles.pressed]: isRecording
              })}
              onMouseDown={() => onRecording("message", { audio: true })}
            >
              <RadioIcon />
            </div>
            <div
              title={__("?????????? ??????????????????")}
              className={classNames({
                [styles.button]: true,
                [styles.pressed]: isRecording
              })}
              onMouseDown={() => onRecording("message", { audio: true, video: true })}
            >
              <PlayIcon className={styles.triangle} />
            </div>
          </>
        )}
        <div
          title={__("????????????????")}
          className={styles.button}
          onClick={() => setRightPanelContentType((state) => (state === "emo" ? "" : "emo"))}
        >
          <SmileIcon title="" />
        </div>
        {selectedContact?.is_secret_chat ? (
          <div
            title={__("???????????? ??????????????????")}
            className={styles.button}
            onClick={(e) =>
              setMouseParams({
                x: e.clientX,
                y: e.clientY,
                width: 59,
                height: 15,
                contextMenuList: "timer"
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

ChatBoardFooter.propTypes = {
  footerRef: PropTypes.exact({ current: PropTypes.instanceOf(Element) }),
  isRecording: PropTypes.bool.isRequired,
  ducationTimer: PropTypes.number.isRequired,
  addMessage: PropTypes.func.isRequired,
  action: actionProps.isRequired,
  setMouseParams: PropTypes.func.isRequired,
  nullifyAction: PropTypes.func.isRequired,
  setRightPanelContentType: PropTypes.func.isRequired,
  setIsRecording: PropTypes.func.isRequired,
  mediaRecorder: mediaRecorderProps,
  setMediaRecorder: PropTypes.func.isRequired,
  setVideoPreview: PropTypes.func.isRequired,
  videoMessagePreview: PropTypes.exact({ current: PropTypes.instanceOf(Element) }),
  recordCancel: PropTypes.func.isRequired,
  file: fileProps,
  setFile: PropTypes.func.isRequired,
  scrollToBottom: PropTypes.func.isRequired,
  socket: socketProps,
  editMessage: PropTypes.func.isRequired,
  attachedFiles: PropTypes.arrayOf(fileProps)
};
