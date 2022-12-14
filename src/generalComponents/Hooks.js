import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  CHAT_CALLROOM,
  CHAT_CALLROOM_ACTIONS,
  CHAT_CALLROOM_SOCKET_ACTION,
  LOCAL_CLIENT,
  MODALS,
  taskDepartmentKey,
  TYPES
} from "./globalVariables";
import { useLocales } from "react-localized";
import { useDispatch, useSelector } from "react-redux";
import { onSetModals } from "../Store/actions/CabinetActions";
import freeice from "freeice";
import { getStorageItem, setStorageItem } from "./StorageHelper";
import { onChoosDep } from "Store/actions/TasksActions";

export function useDebounce(callback, delay) {
  const timer = useRef();

  const debounceCallback = useCallback(
    (...args) => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
      timer.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  );

  return debounceCallback;
}

export const useScrollElementOnScreen = (options, cb) => {
  const containerRef = useRef(null);
  const [isVisible, setVisible] = useState(false);

  const callbackFunction = (entries) => {
    const [entry] = entries;
    setVisible(entry.isIntersecting);
    if (cb) cb(entry);
  };

  useEffect(() => {
    const ref = containerRef.current;
    const observer = new IntersectionObserver(callbackFunction, options);
    if (ref) observer.observe(ref);

    return () => {
      if (ref) observer.unobserve(ref);
    };
  }, [containerRef, options]); //eslint-disable-line

  return [containerRef, isVisible];
};

export const useWindowSize = () => {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
};

export const useElementResize = () => {
  const containerRef = useRef(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const callback = (entries) => {
    const [entry] = entries;
    setWidth(entry.contentRect.width);
    setHeight(entry.contentRect.height);
  };

  const resizeObserver = new ResizeObserver(callback);

  useEffect(() => {
    const ref = containerRef?.current;
    if (ref) resizeObserver.observe(ref);
    return () => {
      if (ref) resizeObserver.unobserve(ref);
    };
  }, [containerRef]); //eslint-disable-line

  return [containerRef, width, height];
};

export function useWebRTC(socket, config) {
  const { __ } = useLocales();
  const icon = useSelector((s) => s.user.userInfo?.icon[0]);
  const { userInfo, uid } = useSelector((s) => s.user);
  const dispatch = useDispatch();
  const [clients, updateClients] = useStateWithCallback([]);

  const peerConnections = useRef({});
  const localMediaStream = useRef(null);
  const peerMediaElements = useRef({});

  const addNewClient = useCallback(
    (newClient, cb) => {
      updateClients((list) => {
        if (!list.includes(newClient)) {
          return [...list, newClient];
        }

        return list;
      }, cb);
    },
    //eslint-disable-next-line
    [clients, updateClients]
  );

  const handleCallRoomMessages = async (e) => {
    const msg = JSON.parse(e.data);
    if (msg.action === "call_room") {
      switch (msg.data.method) {
        case CHAT_CALLROOM_ACTIONS.ACCEPT_CALL: {
          break;
        }
        case CHAT_CALLROOM_ACTIONS.ICE_CANDIDIATE: {
          if (msg.data.peerID !== userInfo.id_user) {
            peerConnections.current[msg.data.peerID].addIceCandidate(new RTCIceCandidate(msg.data.iceCandidate));
            console.log(peerConnections.current);
          }
          break;
        }
        case CHAT_CALLROOM_ACTIONS.SESSION_DESCRIPTION: {
          if (msg.data.peerID !== userInfo.id_user) {
            if (!peerConnections.current[msg.data.peerID]) {
              await handleNewPeer({ peerID: msg.data.peerID });
            }
            setRemoteMedia({ peerID: msg.data.peerID, sessionDescription: msg.data.sessionDescription });
          }
          break;
        }
        default: {
          console.log(CHAT_CALLROOM_SOCKET_ACTION, msg.data.method, "not used");
          break;
        }
      }
    }
  };

  async function startCall() {
    localMediaStream.current = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: {
        width: 100,
        height: 50
      }
    });

    // peerIDs.forEach((peerID) => {
    addNewClient(LOCAL_CLIENT, () => {
      const localVideoElement = peerMediaElements.current[LOCAL_CLIENT];

      if (localVideoElement) {
        localVideoElement.volume = 0;
        localVideoElement.srcObject = localMediaStream.current;
      }
    });
    // });
  }

  useEffect(() => {
    socket.addEventListener("message", handleCallRoomMessages);

    if (config.state === CHAT_CALLROOM.OUTGOING_CALL) {
      startCall(config.contacts)
        .then(() => {
          // initializing call
          socket.send(
            JSON.stringify({
              action: CHAT_CALLROOM_SOCKET_ACTION,
              users_to: config.contacts,
              uid,
              id_user: config.from,
              data: {
                method: CHAT_CALLROOM_ACTIONS.ASK_TO_CONNECT,
                call_type: CHAT_CALLROOM.VOICE_CALL,
                from: {
                  id_user: config.from,
                  icon
                }
              }
            })
          );
        })
        .catch((err) => {
          dispatch(onSetModals(MODALS.ERROR, { open: true, message: __("???? ?????????????? ?????????????????? ??????????/?????????? ??????????????") }));
          console.log(err);
        });
    }

    return () => {
      localMediaStream.current.getTracks().forEach((track) => track.stop());
      socket.send(
        JSON.stringify({
          action: CHAT_CALLROOM_ACTIONS.LEAVE,
          data: {}
        })
      );
      socket?.removeEventListener("message", handleCallRoomMessages);
    };
  }, []); //eslint-disable-line

  const provideMediaRef = useCallback((id, node) => {
    peerMediaElements.current[id] = node;
  }, []);

  async function setRemoteMedia({ peerID, sessionDescription: remoteDescription }) {
    await peerConnections.current[peerID]?.setRemoteDescription(new RTCSessionDescription(remoteDescription));

    if (remoteDescription.type === "offer") {
      const answer = await peerConnections.current[peerID].createAnswer();

      await peerConnections.current[peerID].setLocalDescription(answer);

      socket.send(
        JSON.stringify({
          action: CHAT_CALLROOM_SOCKET_ACTION,
          data: {
            method: CHAT_CALLROOM_ACTIONS.SESSION_DESCRIPTION,
            peerID: userInfo.id_user,
            sessionDescription: answer
          }
        })
      );
    }
  }
  async function handleNewCandidate(event) {
    await socket.send(
      JSON.stringify({
        action: CHAT_CALLROOM_SOCKET_ACTION,
        data: {
          method: CHAT_CALLROOM_ACTIONS.ICE_CANDIDIATE,
          callType: config.callType,
          peerID: userInfo.id_user,
          iceCandidate: {
            candidate: event.candidate,
            sdpMid: event.sdpMid,
            sdpMLineIndex: event.sdpMLineIndex
          }
        }
      })
    );
  }

  const debounceCallback = useDebounce(handleNewCandidate, 100);

  const handleNewPeer = useCallback(
    async ({ peerID, createOffer }) => {
      if (peerID in peerConnections.current) {
        return console.warn(`Already connected to peer ${peerID}`);
      }

      if (!localMediaStream.current) {
        await startCall([peerID]);
      }

      peerConnections.current[peerID] = await new RTCPeerConnection({
        iceServers: freeice()
      });

      peerConnections.current[peerID].onicecandidate = (event) => {
        if (event.candidate) {
          debounceCallback(event.candidate);
        }
      };

      peerConnections.current[peerID].oniceconnectionstatechange = () =>
        console.log(peerConnections.current[peerID].iceConnectionState, peerConnections.current[peerID]);

      let tracksNumber = 0;
      peerConnections.current[peerID].ontrack = ({ streams: [remoteStream] }) => {
        tracksNumber++;

        if (tracksNumber === 2) {
          // video & audio tracks received
          tracksNumber = 0;
          addNewClient(peerID, () => {
            if (peerMediaElements.current[peerID]) {
              peerMediaElements.current[peerID].srcObject = remoteStream;
            } else {
              // FIX LONG RENDER IN CASE OF MANY CLIENTS
              let settled = false;
              const interval = setInterval(() => {
                if (peerMediaElements.current[peerID]) {
                  peerMediaElements.current[peerID].srcObject = remoteStream;
                  settled = true;
                }

                if (settled) {
                  clearInterval(interval);
                }
              }, 1000);
            }
          });
        }
      };

      localMediaStream.current.getTracks().forEach((track) => {
        peerConnections.current[peerID].addTrack(track, localMediaStream.current);
      });

      if (createOffer) {
        const offer = await peerConnections.current[peerID].createOffer();

        await peerConnections.current[peerID].setLocalDescription(offer);

        socket.send(
          JSON.stringify({
            action: CHAT_CALLROOM_SOCKET_ACTION,
            data: {
              method: CHAT_CALLROOM_ACTIONS.SESSION_DESCRIPTION,
              peerID: userInfo.id_user,
              sessionDescription: offer
            }
          })
        );
      }
    },
    //eslint-disable-next-line
    [addNewClient, socket, config]
  );

  return { clients, provideMediaRef, handleNewPeer };
}

export function useStateWithCallback(initialState) {
  const [state, setState] = useState(initialState);
  const cbRef = useRef();

  const updateState = useCallback((newState, cb) => {
    cbRef.current = cb;

    setState((state) => (typeof newState === TYPES.FUNCTION ? newState(state) : newState));
  }, []);

  useEffect(() => {
    if (cbRef.current) {
      cbRef.current(state);
      cbRef.current = null;
    }
  }, [state]); //eslint-disable-line

  return [state, updateState];
}

export function useOutsideClick(ref, callback) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [callback, ref]);
}
export function useDepartmentsOfTasks() {
  const { __ } = useLocales();
  const dispatch = useDispatch();
  const department = useSelector((s) => s.Tasks.dep);

  useEffect(() => {
    const dep = getStorageItem(taskDepartmentKey);
    if (dep !== "null") {
      dispatch(onChoosDep(JSON.parse(dep)));
    } else {
      setStorageItem(taskDepartmentKey, JSON.stringify(department?.[0]));
      dispatch(onChoosDep(department?.[0]));
    }
  }, [department]); //eslint-disable-line

  const work = {
    ...department.find((item) => item.is_system === "1" && item.name === "worktask"),
    name: __("?????????????? ????????????"),
    icon: "bag"
  };
  const home = {
    ...department.find((item) => item.is_system === "1" && item.name === "hometask"),
    name: __("???????????? ????????????"),
    icon: "home"
  };
  const other = department.filter((item) => item.is_system === "0");
  return [work, home, ...other];
}
