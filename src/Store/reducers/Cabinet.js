import {
  GET_FOLDERS,
  CHOOSE_FOLDER,
  CHOOSE_FILES,
  LOAD_FILES,
  FILE_DELETE,
  SAFE_FILE_DELETE,
  CONTACT_LIST,
  COMPANY_CONTACT_LIST,
  COMPANY_DOCUMENTS,
  ADD_RECENT_FOLDERS,
  ADD_RECENT_FILES,
  CHOOSE_RECENT_FILES,
  CUSTOMIZE_FILE,
  CUSTOMIZE_SAFE_FILE,
  GET_CATEGORIES,
  GET_SAFES,
  CODE_TEL,
  AUTHORIZED_SAFE,
  CHOOSE_SAFE_FILELIST,
  LOAD_SAFE_FILELIST,
  GET_DEVICES,
  GET_CONNECTED_CONTACTS,
  SET_SIZE,
  SET_WORKELEMENTSVIEW,
  GET_PROJECT_FOLDER,
  GET_PROJECTS,
  SET_CALENDAR_DATE,
  SEARCH,
  CHOOSE_SHARED_FILES,
  CHOOSE_ARCHIVE_FILES,
  SORT_FILES,
  SET_FILTER_COLOR,
  SET_FILTER_EMOJI,
  SET_FILTER_FIGURE,
  SET_REVERSE_CRITERION,
  SET_FILES_PATH,
  SET_CHOSEN_FILE,
  CHOOSE_GUEST_SHARED_FILES,
  NULLIFY_FILTERS,
  SET_SELECTED_DEVICE,
  SET_SELECTED_USER,
  SET_DRAGGED,
  LOAD_PROJECT_FILES,
  SET_CHOSEN_FOLDER,
  SET_CHOSEN_PROJECT,
  LOAD_FILES_NEXT,
  CHOOSE_FILES_NEXT,
  SET_NEXT_FILES_TO_PREVIOUS,
  SET_PAINT,
  CHAT_GROUPS_LIST,
  GET_CHAT_FILES,
  NEW_LAST_GROUP_MESSAGE,
  SET_NOTIFICATION_COUNTER,
  INCREASE_NOTIFICATION_COUNTER,
  RESENT_CHATS_LIST,
  SECRET_CHATS_LIST,
  CHAT_SELECTED_CONTACT,
  CHAT_ID_USER,
  SECRET_CHAT_DELETE,
  GET_MESSAGES,
  GET_PREVIUS_MESSAGES,
  MESSAGE_DELETE,
  ADD_NEW_MESSAGE,
  SET_MESSAGE_LIFE_TIME,
  INSERT_EMODJI,
  CHAT_GROUP_DELETE,
  SET_MODALS,
  CHOOSE_CATEGORY,
  NULLIFY_FILES,
  SET_CHAT_THEME,
  GET_MAIL,
  NULLIFY_MAILS,
  SET_FOLDER_PATH,
  SET_SORT_FILE,
  FILES_USER_SHARED,
  GET_JOURNAL_FOLDERS,
  SET_MESSAGES_TO_READ,
  DATE_FILTER,
  SET_CHAT_CALLROOM
} from "../types";
import { CHAT_CALLROOM, MODALS } from "../../generalComponents/globalVariables";

export const initialCallRoomState = () => ({
  state: CHAT_CALLROOM.NO_CALL,
  callType: CHAT_CALLROOM.VOICE_CALL,
  contacts: null,
  socket: null,
  user_id: null,
  icon: null,
  connectedUsers: []
});

const INITIAL_STATE = {
  global: null,
  other: null,
  folderList: {},
  fileList: {
    files: null,
    path: "global/all",
    filesNext: null
  },
  contactList: null,
  companyContactList: null,
  recentFolders: null,
  recentFiles: null,
  chosenRecentFile: null,
  dragged: null,
  size: "big",
  view: "bars",
  //SORT && FILTER
  fileCriterion: {
    sorting: "byDateCreated&sort_reverse=1&group=ctime",
    sort_reverse: 1,
    reverse: { byName: false },
    filters: {
      color: "",
      emoji: "",
      figure: ""
    },
    dateFilter: {
      year: "",
      day: "",
      month: ""
    },
    sort: "",
    group: ""
  },

  //SEARCH
  search: "",

  //PROGRAMS
  programs: {
    category: {},
    categories: []
  },

  //SAFE
  safe: {
    safeFileList: null,
    safes: null,
    authorizedSafe: null,
    safeCodeToTel: ""
  },

  //PROJECT
  project: {
    projects: [],
    projectFolders: {},
    files: [],
    chosenFolder: "",
    chosenProject: null
  },

  //DEVICES
  devices: [],
  selectedDevice: null,
  selectedUser: null,
  connectedContacts: [],

  // SHARED FILES
  sharedFiles: { sharedMe: null, sharedI: null },
  filesUserShared: {},
  // ARCHIVE
  arhiveFileList: null,

  //JOURNAL
  journalFolders: [],

  //CALENDAR
  calendarDate: new Date(),

  // GUEST MODE
  guestSharedFiles: [],

  //COMPANY
  company: {
    documents: {
      standards: { file: null, preview: null },
      mission: { file: null, preview: null },
      viziya: { file: null, preview: null }
    }
  },

  //PAINT
  paint: {
    tool: undefined,
    color: "rgba(0,0,0,1)",
    size: 2,
    mutualEdit: {
      open: false,
      data: [],
      destination: ""
    }
  },

  //CHAT
  chat: {
    groupsList: [],
    recentGroupsMessages: {},
    notificationsCounter: {},
    recentChatsList: [],
    secretChatsList: [],
    selectedContact: null,
    userId: null,
    files: null,
    messages: null,
    messageLifeTime: 3600,
    insertEmodji: "",
    theme: {
      name: "white",
      background: "#fff",
      textColor: "#49494B",
      iconColor: "#B8B8B8",
      inputBgColor: "#F7F7F7",
      inputColor: "#AEAEAE",
      accentColor: ""
    },
    callRoom: initialCallRoomState()
  },

  //GLOBAL MODALS
  modals: {
    error: { open: false, message: "" },
    success: { open: false, message: "", title: "", icon: "" },
    loader: false,
    share: { open: false, fids: [], fid: undefined, action_type: "", file: {} },
    previewWithComments: { open: false, files: [], chosenFile: null },
    printScreen: { open: false, result: "" },
    previewFile: { open: false, file: null, message: null },
    topMessage: { open: false, type: "message", message: "" }, //type = message(default) || error
    fileAccessRights: { open: false, file: {} },
    contextMenuModals: {
      type: "",
      items: [],
      title: "",
      action_type: "",
      filesPage: 0,
      filePick: null,
      menuItem: "",
      authorizedSafe: null
    }, //type name depends on modal to be opened e.g. Share opens Share comp. (see ContextModal comp.)
    taskModals: { type: MODALS.NO_MODAL, params: null },
    libraryModals: { type: MODALS.NO_MODAL, params: null },
    mailModals: { type: MODALS.NO_MODAL, params: null },
    calendarModals: { type: MODALS.NO_MODAL, params: null }
  },
  //LIBRARY
  library: {
    chosenCategory: null,
    chosenFile: null
  },
  // MAIL
  mailList: {
    mails: [],
    path: ""
  }
};

export default function startPage(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_FOLDERS: {
      return { ...state, ...action.payload };
    }
    case CHOOSE_FOLDER: {
      return { ...state, folderList: action.payload };
    }
    case SET_FOLDER_PATH: {
      return { ...state, folderList: { ...state.folderList, path: action.payload } };
    }
    case CHOOSE_FILES: {
      return { ...state, fileList: { ...state.fileList, ...action.payload } };
    }
    case NULLIFY_FILES: {
      return { ...state, fileList: action.payload };
    }
    case CHOOSE_FILES_NEXT: {
      return {
        ...state,
        fileList: { ...state.fileList, filesNext: action.payload }
      };
    }
    case LOAD_FILES: {
      const addFiles = () => {
        let f = { ...state.fileList.files };
        for (let key in f) {
          if (action.payload.files[key] && Array.isArray(f[key])) f[key] = [...f[key], ...action.payload.files[key]];
        }
        return f;
      };
      const files = Array.isArray(action.payload.files)
        ? [...state.fileList.files, ...action.payload.files]
        : addFiles();
      return { ...state, fileList: { ...state.fileList, files } };
    }
    case LOAD_FILES_NEXT: {
      const addFiles = () => {
        let f = { ...state.fileList.files };
        for (let key in f) {
          if (action.payload.files[key]) f[key] = [...f[key], ...action.payload.files[key]];
        }
        return f;
      };
      const files = Array.isArray(action.payload.files)
        ? [...state.fileList.files, ...action.payload.files]
        : addFiles();
      return { ...state, fileList: { ...state.fileList, filesNext: files } };
    }
    case SET_NEXT_FILES_TO_PREVIOUS: {
      return {
        ...state,
        fileList: {
          files: state.fileList.filesNext.files,
          path: action.payload,
          filesNext: null
        }
      };
    }
    case SET_FILES_PATH: {
      return {
        ...state,
        fileList: { ...state.fileList, files: null, path: action.payload }
      };
    }
    case SET_CHOSEN_FILE: {
      return {
        ...state,
        fileList: { ...state.fileList, chosenFile: action.payload }
      };
    }
    case FILE_DELETE: {
      if (Array.isArray(state.fileList.files)) {
        const files = state.fileList.files.filter((el) => el.fid !== action.payload.fid);
        return { ...state, fileList: { ...state.fileList, files } };
      } else {
        let files = state.fileList.files;
        for (let key in files) {
          files[key].forEach((file, i) => {
            if (file.fid === action.payload.fid) {
              files[key].splice(i, 1);
            }
          });
        }
        return { ...state, fileList: { ...state.fileList, files } };
      }
    }
    case CONTACT_LIST:
      return { ...state, contactList: action.payload };
    case COMPANY_CONTACT_LIST:
      return { ...state, companyContactList: action.payload };
    case ADD_RECENT_FOLDERS:
      return { ...state, recentFolders: action.payload };
    case ADD_RECENT_FILES:
      return { ...state, recentFiles: action.payload };
    case CHOOSE_RECENT_FILES:
      return { ...state, chosenRecentFile: action.payload };
    case CUSTOMIZE_FILE: {
      if (Array.isArray(state.fileList.files)) {
        const files = state.fileList.files.map((file) => {
          if (file.fid !== action.payload.fid) return file;
          return action.payload;
        });
        return { ...state, fileList: { ...state.fileList, files } };
      }
      let files = state.fileList.files;
      for (let key in files) {
        files[key].forEach((file, i) => {
          if (file.fid === action.payload.fid) {
            files[key][i] = action.payload;
          }
        });
      }
      return { ...state, fileList: { ...state.fileList, files } };
    }
    case CUSTOMIZE_SAFE_FILE: {
      const safeFiles = state.safe.safeFileList.map((file) => {
        if (file.fid !== action.payload.fid) return file;
        return action.payload;
      });
      return { ...state, safe: { ...state.safe, safeFileList: safeFiles } };
    }
    case SET_SIZE:
      return { ...state, size: action.payload };
    case SET_WORKELEMENTSVIEW:
      return { ...state, view: action.payload };
    //SEARCH
    case SEARCH: {
      return { ...state, search: action.payload };
    }
    //CHAT
    case CHAT_GROUPS_LIST: {
      return { ...state, chat: { ...state.chat, groupsList: action.payload } };
    }
    case RESENT_CHATS_LIST: {
      return {
        ...state,
        chat: { ...state.chat, recentChatsList: action.payload }
      };
    }
    case SECRET_CHATS_LIST: {
      return {
        ...state,
        chat: { ...state.chat, secretChatsList: action.payload }
      };
    }
    case CHAT_SELECTED_CONTACT: {
      return {
        ...state,
        chat: { ...state.chat, selectedContact: action.payload }
      };
    }
    case CHAT_ID_USER: {
      return { ...state, chat: { ...state.chat, userId: action.payload } };
    }
    case CHAT_GROUP_DELETE: {
      const groups = state.chat.groupsList.filter((gr) => gr.id !== action.payload.id);
      return { ...state, chat: { ...state.chat, groupsList: groups } };
    }
    case SECRET_CHAT_DELETE: {
      const secretChats = state.chat.secretChatsList.filter((gr) => gr.id !== action.payload.id);
      return {
        ...state,
        chat: { ...state.chat, secretChatsList: secretChats }
      };
    }
    case GET_MESSAGES: {
      return {
        ...state,
        chat: { ...state.chat, messages: { today: [], ...action.payload } }
      };
    }
    case GET_CHAT_FILES: {
      return {
        ...state,
        chat: { ...state.chat, files: action.payload }
      };
    }
    case GET_PREVIUS_MESSAGES: {
      let messages = { ...state.chat.messages };
      for (let key in action.payload) {
        messages[key] = messages[key]
          ? [
              ...messages[key].filter((oldMsg) => !action.payload[key].some((newMsg) => newMsg.id === oldMsg.id)),
              ...action.payload[key]
            ]
          : [...action.payload[key]];
      }
      return { ...state, chat: { ...state.chat, messages: messages } };
    }
    case MESSAGE_DELETE: {
      return { ...state, chat: { ...state.chat, messages: action.payload } };
    }
    case ADD_NEW_MESSAGE: {
      return {
        ...state,
        chat: {
          ...state.chat,
          messages: {
            ...state.chat.messages,
            today: state.chat.messages.today ? [action.payload, ...state.chat.messages.today] : [action.payload]
          }
        }
      };
    }
    case NEW_LAST_GROUP_MESSAGE: {
      return {
        ...state,
        chat: {
          ...state.chat,
          recentGroupsMessages: {
            ...state.chat.recentGroupsMessages,
            [action.payload.id_group]: action.payload.text
          }
        }
      };
    }
    case SET_NOTIFICATION_COUNTER: {
      return {
        ...state,
        chat: {
          ...state.chat,
          notificationsCounter: {
            ...state.chat.notificationsCounter,
            [action.payload.id]: action.payload.value
          }
        }
      };
    }
    case INCREASE_NOTIFICATION_COUNTER: {
      return {
        ...state,
        chat: {
          ...state.chat,
          notificationsCounter: {
            ...state.chat.notificationsCounter,
            [action.payload]: (state.chat.notificationsCounter[action.payload] || 0) + 1
          }
        }
      };
    }
    case SET_MESSAGE_LIFE_TIME: {
      return {
        ...state,
        chat: { ...state.chat, messageLifeTime: action.payload }
      };
    }
    case INSERT_EMODJI: {
      return {
        ...state,
        chat: { ...state.chat, insertEmodji: action.payload }
      };
    }
    case SET_CHAT_THEME: {
      return { ...state, chat: { ...state.chat, theme: action.payload } };
    }
    case SET_MESSAGES_TO_READ: {
      let messages = { ...state.chat.messages };
      for (let [key, msgArr] of Object.entries(messages)) {
        msgArr.forEach((msg, i) => {
          if (action.payload.find((el) => el === msg.id)) {
            messages[key][i] = {
              ...msg,
              is_read: "1"
            };
          }
        });
      }
      return {
        ...state,
        chat: {
          ...state.chat,
          messages
        }
      };
    }
    case SET_CHAT_CALLROOM: {
      return {
        ...state,
        chat: {
          ...state.chat,
          callRoom: { ...state.chat.callRoom, ...action.payload }
        }
      };
    }

    // SORT FILES
    case SET_SORT_FILE: {
      return {
        ...state,
        fileCriterion: { ...state.fileCriterion, ...action.payload }
      };
    }
    case SORT_FILES: {
      return {
        ...state,
        fileCriterion: { ...state.fileCriterion, sorting: action.payload }
      };
    }
    case SET_FILTER_COLOR: {
      return {
        ...state,
        fileCriterion: {
          ...state.fileCriterion,
          filters: { ...state.fileCriterion.filters, color: action.payload }
        }
      };
    }
    case SET_FILTER_FIGURE: {
      return {
        ...state,
        fileCriterion: {
          ...state.fileCriterion,
          filters: { ...state.fileCriterion.filters, figure: action.payload }
        }
      };
    }
    case SET_FILTER_EMOJI: {
      return {
        ...state,
        fileCriterion: {
          ...state.fileCriterion,
          filters: { ...state.fileCriterion.filters, emoji: action.payload }
        }
      };
    }
    case SET_REVERSE_CRITERION: {
      return {
        ...state,
        fileCriterion: {
          ...state.fileCriterion,
          reverse: {
            ...state.fileCriterion.reverse,
            [action.payload]: !state.fileCriterion.reverse[action.payload]
          }
        }
      };
    }
    case NULLIFY_FILTERS: {
      return {
        ...state,
        fileCriterion: {
          sorting: "byDateCreated&sort_reverse=1&group=ctime",
          reverse: { byName: false },
          filters: {
            color: "",
            emoji: "",
            figure: ""
          }
        }
      };
    }
    case SET_DRAGGED: {
      return { ...state, dragged: action.payload };
    }

    // PROGRAMS
    case GET_CATEGORIES:
      return {
        ...state,
        programs: { ...state.programs, categories: action.payload }
      };
    case CHOOSE_CATEGORY:
      return {
        ...state,
        programs: { ...state.programs, category: action.payload }
      };

    //SAFE
    case CODE_TEL:
      return {
        ...state,
        safe: { ...state.safe, safeCodeToTel: action.payload }
      };
    case GET_SAFES:
      return { ...state, safe: { ...state.safe, safes: action.payload } };
    case AUTHORIZED_SAFE:
      return {
        ...state,
        safe: { ...state.safe, authorizedSafe: action.payload }
      };
    case CHOOSE_SAFE_FILELIST:
      return {
        ...state,
        safe: { ...state.safe, safeFileList: { ...action.payload } }
      };
    case LOAD_SAFE_FILELIST:
      return {
        ...state,
        safe: {
          ...state.safe,
          safeFileList: {
            ...state.safe.safeFileList,
            files: [...state.safe.safeFileList.files, ...action.payload.files]
          }
        }
      };
    case SAFE_FILE_DELETE: {
      const files = state.safe.safeFileList.files.filter((el) => el.fid !== action.payload);
      return { ...state, safe: { ...state.safe, safeFileList: files } };
    }

    //PROJECT
    case GET_PROJECT_FOLDER: {
      const projectFolders = { ...state.project.projectFolders };
      projectFolders[action.payload.projectId] = [...action.payload.projectFolders];
      return { ...state, project: { ...state.project, projectFolders } };
    }
    case GET_PROJECTS:
      return {
        ...state,
        project: { ...state.project, projects: action.payload }
      };
    case LOAD_PROJECT_FILES: {
      return { ...state, project: { ...state.project, files: action.payload } };
    }
    case SET_CHOSEN_FOLDER: {
      return {
        ...state,
        project: { ...state.project, chosenFolder: action.payload }
      };
    }
    case SET_CHOSEN_PROJECT: {
      return {
        ...state,
        project: { ...state.project, chosenProject: action.payload }
      };
    }

    //DEVICES
    case GET_DEVICES:
      return { ...state, devices: action.payload };
    case SET_SELECTED_DEVICE:
      return { ...state, selectedDevice: action.payload };
    case SET_SELECTED_USER:
      return { ...state, selectedUser: action.payload };
    case GET_CONNECTED_CONTACTS:
      return { ...state, connectedContacts: action.payload };

    // SHARED FILES
    case CHOOSE_SHARED_FILES: {
      return {
        ...state,
        sharedFiles: {
          ...state.sharedFiles,
          [action.payload.key]: { files: action.payload.files }
        }
      };
    }

    case FILES_USER_SHARED: {
      return {
        ...state,
        filesUserShared: { ...state.filesUserShared, [action.payload[0].fid]: [...action.payload] }
      };
    }

    //ARCHIVE
    case CHOOSE_ARCHIVE_FILES: {
      return { ...state, fileList: { ...action.payload } };
    }

    //JOURNAL
    case GET_JOURNAL_FOLDERS:
      return { ...state, journalFolders: action.payload };

    //CALENDAR && TASK PAGE
    case SET_CALENDAR_DATE:
      return { ...state, calendarDate: action.payload };

    //GUEST MODE
    case CHOOSE_GUEST_SHARED_FILES:
      return { ...state, guestSharedFiles: action.payload };

    default:
      return state;

    //COMPANY
    case COMPANY_DOCUMENTS:
      return {
        ...state,
        company: {
          ...state.company,
          documents: {
            ...state.company.documents,
            [action.payload.type]: action.payload
          }
        }
      };

    //PAINT
    case SET_PAINT: {
      return {
        ...state,
        paint: { ...state.paint, [action.payload.key]: action.payload.value }
      };
    }

    //GLOBAL MODAL
    case SET_MODALS: {
      if (action.payload.key.open) {
        return state;
      }
      return {
        ...state,
        modals: { ...state.modals, [action.payload.key]: action.payload.value }
      };
    }

    // MAIL
    case GET_MAIL: {
      return { ...state, mailList: { ...state.mailList, ...action.payload } };
    }
    case NULLIFY_MAILS: {
      return { ...state, mailList: action.payload };
    }

    case DATE_FILTER: {
      return {
        ...state,
        fileCriterion: { ...state.fileCriterion, dateFilter: { ...state.dateFilter, ...action.payload } }
      };
    }
  }
}
