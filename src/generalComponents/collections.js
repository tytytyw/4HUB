import { useLocales } from "react-localized";
import {
  contextMenuFolder,
  contextMenuTask,
  LIBRARY_MODALS,
  MAIL_MODALS,
  STATUS_TYPES,
  TaskFilters,
  TASK_MODALS,
  TASK_TYPES,
  URGENCY_TYPES
} from "./globalVariables";
// global folders
export function useFolders() {
  // eslint-disable-line
  const { __ } = useLocales();
  return [
    { name: "all", nameRu: __("Общая папка"), path: "global/all" },
    { name: "video", nameRu: __("Фильмы"), path: "global/video" },
    { name: "music", nameRu: __("Музыка"), path: "global/music" },
    { name: "images", nameRu: __("Изображения"), path: "global/images" },
    { name: "docs", nameRu: __("Документы"), path: "global/docs" }
  ];
}

export function useTags() {
  const { __ } = useLocales();
  return [
    __("Фото"),
    __("Видео"),
    __("Музыка"),
    __("Работа"),
    __("Спорт"),
    __("Развлечения"),
    __("Игры"),
    __("Документы"),
    __("Другое")
  ];
}

export const colors = [
  { dark: "#efeeee", light: "#efeeee", color: "grey", name: "grey" },
  {
    dark: "#c4aa8f",
    light: "rgb(254, 220, 184)",
    color: "rgb(254, 220, 184)",
    name: "wheat"
  },
  {
    dark: "#326bc1",
    light: "rgb(64, 134, 242)",
    color: "rgb(64, 134, 242)",
    name: "blue"
  },
  {
    dark: "#27967a",
    light: "rgb(52, 198, 162)",
    color: "rgb(52, 198, 162)",
    name: "green"
  },
  {
    dark: "#cb8d40",
    light: "rgb(249, 173, 80)",
    color: "rgb(249, 173, 80)",
    name: "orange"
  },
  {
    dark: "#c15862",
    light: "rgb(244, 112, 125)",
    color: "rgb(244, 112, 125)",
    name: "pink"
  },
  {
    dark: "#792794",
    light: "rgb(160, 51, 195)",
    color: "rgb(160, 51, 195)",
    name: "purple"
  },
  {
    dark: "#992928",
    light: "rgb(194, 52, 51)",
    color: "rgb(194, 52, 51)",
    name: "red"
  },
  {
    dark: "#267d8d",
    light: "rgb(52, 174, 196)",
    color: "rgb(52, 174, 196)",
    name: "aqua"
  },
  {
    dark: "rgb(161,98,125)",
    light: "rgb(196, 118, 151)",
    color: "rgb(196, 118, 151)",
    name: "brown"
  },
  {
    dark: "#40289b",
    light: "rgb(81, 52, 197)",
    color: "rgb(81, 52, 197)",
    name: "darkblue"
  }
];

export const signs = [
  "triangle",
  "circle",
  "heart",
  "star",
  "pentagon",
  "rectangle",
  "notification",
  "stop",
  "shield-2",
  "like",
  "price-tag"
];

export const smiles = [
  "angry",
  "angry-2",
  "bored",
  "confused",
  "cool",
  "favorite",
  "grinning",
  "happy",
  "happy-2",
  "in-love",
  "kissing",
  "nerd",
  "quiet",
  "sad",
  "shocked",
  "smart",
  "smiling",
  "surprised",
  "suspicious",
  "thinking",
  "tongue-out",
  "unhappy"
];

//Deprecated
//TODO - Needs to be checked and deleted - new array in ContextMenuFileList
export function useContextMenuFile() {
  const { __ } = useLocales();
  return {
    main: [
      { name: __("Расшарить"), img: "share", type: "share" },
      { name: __("Скопировать ссылку"), img: "link-4", type: "copyLink" },
      { name: __("Редактировать файл"), img: "edit", type: "customize" },
      {
        name: __("Ред. несколько файлов"),
        img: "editSeveral",
        type: "customizeSeveral"
      },
      { name: __("Переместить в архив"), img: "archive", type: "archive" },
      { name: __("Сжать в Zip"), img: "zip", type: "intoZip" },
      {
        name: __("Сжать несколько файлов в Zip"),
        img: "severalZip",
        type: "intoZipSeveral"
      },
      { name: __("Свойства"), img: "info", type: "properties" },
      { name: __("Скачать"), img: "download-blue", type: "download" },
      { name: __("Печать"), img: "print-2", type: "print" }
    ],
    additional: [{ name: __("Удалить"), img: "garbage", type: "delete" }]
  };
}

export function useContextMenuProfile() {
  const { __ } = useLocales();
  return {
    main: [
      { name: __("Мой профиль"), img: "profile-icon" },
      { name: __("Служба поддержки"), img: "question-icon" },
      { name: __("Настройки"), img: "settings-icon" }
    ],
    additional: [{ name: __("Выход"), img: "sign-out-icon" }]
  };
}

export function useContextMenuFilters() {
  const { __ } = useLocales();
  return {
    main: [
      {
        name: __(`По имени от А до Я`),
        reverseName: __("По имени от Я до А"),
        img: "",
        ext: "byName"
      },
      {
        name: __(`По дате архивирования`),
        reverseName: __("По дате архивирования"),
        img: "",
        ext: "byDateArchived&sort_reverse=1&group=date_archive"
      },
      {
        name: __(`По дате добавления/создания`),
        reverseName: __("По дате добавления/создания"),
        img: "",
        ext: "byDateCreated&sort_reverse=1&group=ctime"
      },
      {
        name: __("По дате изменения"),
        reverseName: __("По дате изменения"),
        img: "",
        ext: "byDateChanged&sort_reverse=1&group=mtime"
      },
      {
        name: __("По дате последнего открытия"),
        reverseName: __("По дате последнего открытия"),
        img: "",
        ext: "byDateOpened"
      },
      {
        name: __("По размеру (от больших к малым)"),
        reverseName: __("По размеру (от малых к большим)"),
        img: "",
        ext: "bySize&sort_reverse=1"
      },
      {
        name: __("По размеру (от малых к большим)"),
        reverseName: __(""),
        img: "",
        ext: "bySize"
      },
      {
        name: __("По типу"),
        reverseName: __("По типу U+21FD"),
        img: "",
        ext: "byType"
      },
      {
        name: __("По тэгам"),
        reverseName: __("По тэгам"),
        img: "",
        ext: "byTags"
      }
    ],
    additional: []
  };
}

export function useContextMenuFiltersJournal() {
  const { __ } = useLocales();
  return {
    main: [
      {
        name: __(`По имени от А до Я`),
        reverseName: __("По имени от Я до А"),
        ext: "byName"
      },
      {
        name: __("По дате изменения"),
        ext: "mtime"
      },
      {
        name: __("По размеру (С больших)"),
        reverseName: __("По размеру (С маленьких)"),
        ext: "bySize"
      },
      {
        name: __("По типу"),
        ext: "byType"
      },
      {
        name: __("По тэгам"),
        ext: "byTags"
      }
    ],
    additional: []
  };
}
export function useContextMenuCreateFile() {
  const { __ } = useLocales();
  return {
    other: [{ name: __("ONLYOFFICE"), img: "microsoft-oneOffice" }],
    microsoft: [
      { name: __("Документ Word"), img: "word", ext: "docx" },
      { name: __("Книга Excel"), img: "excel", ext: "xlsx" },
      { name: __("Презентация PowerPoint"), img: "powerpoint", ext: "pptx" }
    ],
    google: [
      { name: __("Документ Google"), img: "google-doc" },
      { name: __("Таблица Google"), img: "google-table" },
      { name: __("Презентация Google"), img: "google-presentation" }
    ]
  };
}

export function useContextMenuProjects() {
  const { __ } = useLocales();
  return {
    main: [
      { name: __("Добавить участника"), img: "add-user", type: "addMember" },
      { name: __("Скопировать ссылку"), img: "perm-set", type: "copyLink" },
      { name: __("Создать папку"), img: "add-folder", type: "addFolder" },
      { name: __("Редактировать"), img: "rename", type: "customize" },
      { name: __("Архивировать"), img: "archive", type: "archive" },
      { name: __("Все участники"), img: "all-users" },
      {
        name: __("Свойства"),
        img: "property",
        margin: true,
        type: "propertiesProject"
      }
    ],
    additional: [
      { name: __("Покинуть проект"), img: "leave", type: "leave" },
      { name: __("Удалить проект"), img: "delete", type: "delete" }
    ]
  };
}

export function useContextMenuFolderGeneral() {
  const { __ } = useLocales();
  return {
    main: [
      { name: __("Добавить папку"), img: "settings-work-tool" },
      { name: __("Свойства"), img: "info" }
    ],
    additional: []
  };
}

export function useContextMenuFolder() {
  const { __ } = useLocales();
  return {
    main: [
      { name: __("Редактировать"), img: "edit", type: "customizeFolder" },
      { name: __("Расшарить"), img: "resend" },
      { name: __("Скопировать ссылку"), img: "shareFile" },
      { name: __("Добавить папку"), img: "settings-work-tool" },
      { name: __("Свойства"), img: "info" },
      { name: __("Удалить папку"), img: "garbage" }
    ],
    additional: []
  };
}

export function useContextMenuSubFolder() {
  const { __ } = useLocales();
  return {
    main: [
      { name: __("Редактировать"), img: "edit", type: "customizeFolder" },
      { name: __("Расшарить"), img: "resend" },
      {
        name: __("Скопировать ссылку"),
        img: "shareFile",
        type: "setAccessFolder"
      },
      { name: __("Свойства"), img: "info", type: "propertiesFolder" },
      { name: __("Удалить папку"), img: "garbage", type: "deleteFolder" }
    ],
    additional: []
  };
}

// Devices
export const getDeviceIconName = (device) => {
  switch (device) {
    case "Mobile":
      return "iphone";
    case "Desktop":
      return "Desktop";
    case "Tablet":
      return "pad";
    default:
      return "unknown";
  }
};

export function useContextMenuDevice() {
  const { __ } = useLocales();
  return {
    main: [
      {
        name: __("Блокировать устройство"),
        img: "edit",
        type: "disconnectItem"
      },
      {
        name: __("Блокировать несколько"),
        img: "shareFile",
        type: "disconnectAllItem"
      },
      { name: __("Отключить"), img: "shareFile", type: "offItem" },
      { name: __("Отключить несколько"), img: "shareFile", type: "offAllItem" }
    ],
    additional: []
  };
}

export function useContextMenuDeviceUser() {
  const { __ } = useLocales();
  return {
    main: [
      {
        name: __("Блокировать пользователя"),
        img: "edit",
        type: "disconnectItem"
      },
      {
        name: __("Блокировать несколько"),
        img: "shareFile",
        type: "disconnectAllUser"
      }
    ],
    additional: []
  };
}

export function useContextMenuSafeItem() {
  const { __ } = useLocales();
  return {
    main: [
      { name: __("Предоставить доступ"), img: "download-blue" },
      { name: __("Редактировать"), img: "edit", type: "customizeSafe" },
      { name: __("Сменить пароль"), img: "settings-work-tool" },
      { name: __("Свойства"), img: "info", type: "propertiesSafe" }
    ],
    additional: [{ name: __("Удалить"), img: "garbage" }]
  };
}

// Programs
export function useContextProgramFolder() {
  const { __ } = useLocales();
  return {
    main: [
      { name: __("Расшарить"), img: "shareFile" },
      { name: __("Скопировать ссылку"), img: "link-4" },
      { name: __("Редактировать"), img: "edit" },
      { name: __("Переместить в архив"), img: "archive" },
      { name: __("Свойства"), img: "info" }
    ],
    additional: [{ name: __("Удалить"), img: "garbage" }]
  };
}

export function useContextProgram() {
  const { __ } = useLocales();
  return {
    main: [
      { name: __("Открыть"), img: "open-file-button" },
      { name: __("Переслать"), img: "resend" },
      { name: __("Скопировать ссылку"), img: "link-4" }
    ],
    additional: [{ name: __("Удалить"), img: "garbage" }]
  };
}

export const previewTypes = ["application/msword", "application/excel"];
export const previewFormats = ["doc", "xls", "ppt", "rtf", "xlt", "csv"];

//Project
export const projectIcons = ["lamp", "coworking", "rocket", "suitcase", "clipboard", "thunder", "pen"];

export const figuresPaint = [
  { id: 1, figure: "font" },
  { id: 2, figure: "circle-outlined" },
  { id: 3, figure: "square-outlined" },
  { id: 4, figure: "arrow-outlined" },
  { id: 5, figure: "pencil-outlined" },
  { id: 6, figure: "brush-outlined" }
];

export const colorsPaint = [
  { id: 1, color: "#E0A512", colorRGBA: "rgba(224,165,18,0.2)" },
  { id: 2, color: "#9C0050", colorRGBA: "rgba(156,0,80,0.2)" },
  { id: 3, color: "#BEBEBE", colorRGBA: "rgba(190,190,190,0.2)" },
  { id: 4, color: "#CD0C21", colorRGBA: "rgba(205,12,33,0.2)" },
  { id: 5, color: "#000000", colorRGBA: "rgba(0,0,0,0.2)" },
  { id: 6, color: "#5026B8", colorRGBA: "rgba(80,38,184,0.2)" },
  { id: 7, color: "#04C6F4", colorRGBA: "rgba(4,198,244,0.2)" },
  { id: 8, color: "#6D3FD7", colorRGBA: "rgba(109,63,215,0.2)" },
  { id: 9, color: "#67AB3E", colorRGBA: "rgba(103,171,62,0.2)" }
];

export const dotsPaint = [
  { id: 1, width: 16 },
  { id: 2, width: 14 },
  { id: 3, width: 12 },
  { id: 4, width: 10 },
  { id: 5, width: 8 },
  { id: 6, width: 6 },
  { id: 7, width: 5 },
  { id: 8, width: 2 }
];

// Company

export function useContextMenuDocFile() {
  const { __ } = useLocales();
  return [
    { name: __("Редактировать"), img: "edit", type: "editFile" },
    { name: __("Удалить"), img: "garbage", type: "deleteFile" }
  ];
}

// Chat

export function useContextMenuChat() {
  const { __ } = useLocales();
  return {
    group: [
      { name: __("Редактировать"), img: "edit", type: "editChatGroup" },
      { name: __("Удалить"), img: "garbage", type: "deleteChatGroup" },
      {
        name: __("Покинуть группу"),
        img: "garbage",
        type: "leaveFromChatGroup"
      }
    ],
    secretChat: [{ name: __("Удалить"), img: "garbage", type: "deleteSecretChat" }],
    userInGroup: [
      { name: __("Очистить историю у меня"), img: "brush-2", type: "clearMessages" },
      { name: __("Очистить историю у всех"), img: "brush-2", type: "clearAllMessages" },
      { name: __("Заблокировать"), img: "block-user", type: "blockUser" },
      {
        name: __("Удалить из группы"),
        img: "garbage",
        type: "deleteUserFromGroup"
      }
    ],
    recentChat: [
      { name: __("Очистить историю у меня"), img: "brush-2", type: "clearMessages" },
      { name: __("Очистить историю у всех"), img: "brush-2", type: "clearAllMessages" },
      { name: __("Заблокировать"), img: "block-user", type: "blockUser" },
      {
        name: __("Отметить непрочитанным"),
        img: "mark-unread",
        type: "markAsUnread"
      }
    ],
    contact: [
      { name: __("Очистить историю у меня"), img: "brush-2", type: "clearMessages" },
      { name: __("Очистить историю у всех"), img: "brush-2", type: "clearAllMessages" },
      { name: __("Заблокировать"), img: "block-user", type: "blockUser" },
      {
        name: __("Отметить непрочитанным"),
        img: "mark-unread",
        type: "markAsUnread"
      },
      { name: __("Удалить"), img: "garbage", type: "deleteContact" }
    ],
    timer: [
      { name: __("1 час") },
      { name: __("45 мин.") },
      { name: __("30 мин.") },
      { name: __("15 мин.") },
      { name: __("10 мин.") },
      { name: __("5 мин.") },
      { name: __("1 мин.") },
      { name: __("30 сек.") },
      { name: __("20 сек.") }
    ],
    message: [
      { name: __("Редактировать сообщение"), img: "edit", type: "editMessage" },
      { name: __("Скачать"), img: "download-blue", type: "download" },
      { name: __("Удалить сообщение"), img: "garbage", type: "deleteMessage" }
    ],
    uploadFile: [
      { name: __("Камера"), img: "camera", type: "createMediaFromCamera" },
      { name: __("Файлы с системы 4Hub"), img: "files", type: "add4hubFile" },
      { name: __("Файлы с компьютера"), img: "files", type: "addPcFile" }
    ]
  };
}

// org structure

export function useContextMenuPerson() {
  const { __ } = useLocales();
  return [
    { name: __("Добавить сотрудника"), img: "plus-3", type: "add-employee" },
    { name: __("Редактировать"), img: "edit", type: "customize" },
    { name: __("Информация о сотруднике"), img: "info", type: "info" },
    { name: __("Удалить"), img: "garbage", type: "delete" }
  ];
}

export function usePersonStatus() {
  const { __ } = useLocales();
  return [
    { color: "#fff", name: "white", text: __("Без статуса") },
    { color: "#20C8D2", name: "aqua", text: __("Отпуск") },
    { color: "#39B31E", name: "green", text: __("Декретный отпуск") },
    { color: "#F4A862", name: "orange", text: __("Открытая вакансия") },
    { color: "#A30BEB", name: "violet", text: __("Испытательный срок") }
  ];
}

export function usePersonPositions() {
  const { __ } = useLocales();
  return [
    __("Руководитель компании"),
    __("Генеральный директор"),
    __("Исполнительный директор"),
    __("Финансовый директор"),
    __("Арт-директор"),
    __("Маркетинговый директор"),
    __("Директор по производству"),
    __("Директор по развитию"),
    __("Коммерческий директор"),
    __("Начальник отдела продаж"),
    __("Финансовый директор"),
    __("Офис-менеджер"),
    __("Секретарь"),
    __("Ассистент руководителя"),
    __("Главный бухгалтер"),
    __("Бухгалтер"),
    __("Финансист"),
    __("Финансовый консультант"),
    __("Экономист"),
    __("Юрист"),
    __("Адвокат"),
    __("Бизнес-аналитик"),
    __("Бизнес-консультант"),
    __("Маркетолог"),
    __("Менеджер по закупкам"),
    __("Менеджер по качеству"),
    __("Менеджер по развитию"),
    __("Менеджер по продажам"),
    __("Event-менеджер"),
    __("PR-менеджер"),
    __("Бренд-менеджер"),
    __("Торговый представитель"),
    __("Торговый агент"),
    __("Бизнес-тренер"),
    __("Директор по персоналу"),
    __("Менеджер по персоналу"),
    __("Начальник отдела кадров"),
    __("Тренинг-менеджер"),
    __("Рекрутер"),
    __("HR-менеджер"),
    __("HR-директор"),
    __("Проектный менеджер"),
    __("Веб-аналитик"),
    __("Веб-дизайнер"),
    __("Верстальщик"),
    __("Геймдизайнер"),
    __("Интернет-маркетолог"),
    __("Контент-менеджер"),
    __("Копирайтер"),
    __("Оператор ПК"),
    __("Программист"),
    __("Программист 1С"),
    __("Продакт-менеджер"),
    __("Разработчик игр"),
    __("Системный администратор"),
    __("Системный аналитик"),
    __("Тестировщик"),
    __("Художник компьютерной графики"),
    __("SEO-специалист"),
    __("Python-разработчик"),
    __("3D-визуализатор"),
    __("Flash-программист"),
    __("Frontend-разработчик"),
    __("Backend-разработчик"),
    __("PHP-программист"),
    __("SMM специалист"),
    __("UX-дизайнер"),
    __("Team leader"),
    __("Android-разработчик")
  ];
}

// FileLoader
export const loadDest = {
  myFolders: "",
  safe: "safe_",
  myFiles: "",
  project: "project_"
};

export function usePeriods() {
  const { __ } = useLocales();
  return {
    1: __("Сегодня"),
    7: __("На этой неделе"),
    14: __("Более недели"),
    30: __("В этом месяце"),
    60: __("В прошлом месяце"),
    365: __("В этом году"),
    999: __("Папки")
  };
}

// Shared files

export function useContextMenuSharedFiles() {
  const { __ } = useLocales();
  return {
    main: [
      { name: __("Расшарить"), img: "share", type: "share" },
      { name: __("Скопировать ссылку"), img: "link-4", type: "copyLink" },
      { name: __("Редактировать файл"), img: "edit", type: "customize" },
      {
        name: __("Ред. несколько файлов"),
        img: "editSeveral",
        type: "customizeSeveral"
      },
      { name: __("Свойства"), img: "info", type: "properties" },
      { name: __("Скачать"), img: "download-blue", type: "download" },
      { name: __("Печать"), img: "print-2", type: "print" }
    ],
    additional: [{ name: __("Удалить"), img: "garbage", type: "delete" }]
  };
}

export function useAccessRightsConst() {
  const { __ } = useLocales();
  return {
    WATCH: __("Просмотр"),
    DOWNLOAD: __("Скачивание"),
    EDIT: __("Редактировать")
  };
}

export function useFileSharedPeriods() {
  const { __ } = useLocales();
  return {
    DAY: __("1 день"),
    WEEK: __("1 неделя"),
    MONTH: __("1 месяц")
  };
}

export function useTaskBoardTitle() {
  const { __ } = useLocales();
  return {
    [TASK_TYPES.MEETINGS]: __("Встречи"),
    [TASK_TYPES.CALLS]: __("Звонки"),
    [TASK_TYPES.MAILS]: __("Письма"),
    [TASK_TYPES.TASK]: __("Создать новую задачу")
  };
}

export function useTypesMeeting() {
  const { __ } = useLocales();
  return [
    { name: __("Онлайн"), id: TASK_TYPES.ONLINE_MEETING },
    { name: __("Офлайн"), id: TASK_TYPES.OFFLINE_MEETING }
  ];
}

export function useUrgencyTask() {
  const { __ } = useLocales();
  return [
    { name: __("Срочные задачи"), id: URGENCY_TYPES.URGENT },
    { name: __("Плановые адачи"), id: URGENCY_TYPES.PLANNED }
  ];
}

export function useContextMenuTasks() {
  const { __ } = useLocales();
  return {
    [TASK_TYPES.MEETINGS]: [
      { name: __("Перенести встречу"), img: "clock", type: contextMenuTask.RESCHEDULE_ONE },
      { name: __("Перенести все встречи"), img: "clock", type: contextMenuTask.RESCHEDULE_ALL },
      { name: __("Редактировать встречу"), img: "edit", type: contextMenuTask.CUSTOMIZE },
      { name: __("Заметка"), img: "note", type: contextMenuTask.ADD_MEETING_NOTE },
      { name: __("Удалить "), img: "garbage", type: contextMenuTask.DELETE }
    ],
    [TASK_TYPES.CALLS]: [
      { name: __("Редактировать звонок"), img: "edit", type: contextMenuTask.CUSTOMIZE },
      { name: __("Удалить звонок "), img: "garbage", type: contextMenuTask.DELETE }
    ],
    [TASK_TYPES.TASK]: [
      { name: __("Редактировать задачу"), img: "editing", type: contextMenuTask.CUSTOMIZE },
      { name: __("Комментарий"), img: "chat", type: contextMenuTask.ADD_COMMENT },
      { name: __("Напоминание"), img: "clock", type: contextMenuTask.ADD_REMINDER },
      { name: __("Удалить задачу"), img: "garbage", type: contextMenuTask.DELETE }
    ],
    [TASK_TYPES.NOTES]: [
      { name: __("Редактировать заметку"), img: "edit", type: contextMenuTask.CUSTOMIZE },
      { name: __("Удалить заметку "), img: "garbage", type: contextMenuTask.DELETE }
    ]
  };
}

export function useMenuTasksStatus() {
  const { __ } = useLocales();
  return {
    [STATUS_TYPES.DONE]: { name: __("Готово"), color: "#41D87D" },
    [STATUS_TYPES.IN_PROGRESS]: { name: __("В работе"), color: "#D4AA3D" },
    [STATUS_TYPES.CLARIFICATION]: { name: __("Требует уточнения"), color: "#9A6CAE" },
    [STATUS_TYPES.NOT_DONE]: { name: __("Не выполненно"), color: "#EB4545" },
    [STATUS_TYPES.DEFAULT]: { name: __("Без статуса"), color: "#CFCFCF" }
  };
}

export function useTaskMessages() {
  const { __ } = useLocales();
  return {
    [TASK_MODALS.DELETE_TASK]: {
      success: __("Задача успешно удалена"),
      error: __("Что-то пошло не так, попробуйте еще раз")
    },

    [TASK_MODALS.ADD_SECTION]: { success: __("Раздел добавлен"), error: __("Что-то пошло не так, попробуйте еще раз") },
    [TASK_MODALS.EDIT_SECTION]: { success: __("Раздел изменен"), error: __("Что-то пошло не так, попробуйте еще раз") },
    [TASK_MODALS.DELETE_SECTION]: {
      success: __("Раздел удален"),
      error: __("Что-то пошло не так")
    },
    [TASK_MODALS.RESCHEDULE_ONE]: {
      success: __("Встреча перенесена"),
      error: __("Что-то пошло не так, попробуйте еще раз")
    },
    [TASK_MODALS.RESCHEDULE_ALL]: {
      success: __("Встречи перенесены"),
      error: __("Что-то пошло не так, попробуйте еще раз")
    },
    [TASK_MODALS.ADD_COMMENT_TASK]: {
      success: __("Комментарий добавлен"),
      error: __("Что-то пошло не так, попробуйте еще раз")
    },

    [TASK_TYPES.NOTES]: {
      [TASK_MODALS.ADD_NOTE]: {
        success: __("Заметка добавлена"),
        error: __("Что-то пошло не так, попробуйте еще раз")
      },
      [TASK_MODALS.EDIT_TASK]: { success: __("Заметка изменена"), error: __("Что-то пошло не так, попробуйте еще раз") }
    },
    [TASK_TYPES.MEETINGS]: {
      [TASK_MODALS.ADD_MEETING]: {
        success: __("Встреча добавлена"),
        error: __("Что-то пошло не так, попробуйте еще раз")
      },
      [TASK_MODALS.EDIT_TASK]: {
        success: __("Встреча изменена"),
        error: __("Что-то пошло не так, попробуйте еще раз")
      },
      [TASK_MODALS.ADD_NOTE_TO_MEETING]: {
        success: __("Заметка добавлена"),
        error: __("Что-то пошло не так, попробуйте еще раз")
      }
    },
    [TASK_TYPES.CALLS]: {
      [TASK_MODALS.ADD_CALL]: { success: __("Звонок добавлен"), error: __("Что-то пошло не так, попробуйте еще раз") },
      [TASK_MODALS.EDIT_TASK]: { success: __("Звонок изменен"), error: __("Что-то пошло не так, попробуйте еще раз") }
    },
    [TASK_TYPES.MAILS]: {
      [TASK_MODALS.ADD_LETTER]: {
        success: __("Письмо добавлено"),
        error: __("Что-то пошло не так, попробуйте еще раз")
      },
      [TASK_MODALS.EDIT_TASK]: { success: __("Письмо изменено"), error: __("Что-то пошло не так, попробуйте еще раз") }
    },
    [TASK_TYPES.TASK]: {
      [TASK_MODALS.ADD_TASK]: { success: __("Задача добавлена"), error: __("Что-то пошло не так, попробуйте еще раз") },
      [TASK_MODALS.EDIT_TASK]: { success: __("Задача изменена"), error: __("Что-то пошло не так, попробуйте еще раз") }
    },
    STATUS: {
      success: "Статус изменен",
      error: __("Что-то пошло не так, попробуйте еще раз")
    }
  };
}

export const useTaskFiltersMenu = () => {
  const { __ } = useLocales();
  return {
    [TaskFilters.TODAY]: __("Задачи на сегодня"),
    [TaskFilters.BY_DAY]: __("Задачи на день"),
    [TaskFilters.BY_WEEK]: __("Задачи на неделю"),
    [TaskFilters.BY_MONTH]: __("Задачи на месяц"),
    [TaskFilters.BY_YEAR]: __("Задачи на год")
  };
};

export const useDayWeekName = () => {
  const { __ } = useLocales();
  return {
    0: __("Воскресенье"),
    1: __("Понедельник"),
    2: __("Вторник"),
    3: __("Среда"),
    4: __("Четверг"),
    5: __("Пятница"),
    6: __("Суббота")
  };
};

export function useStandardLibraries() {
  const { __ } = useLocales();
  return {
    EDUCATION: {
      name: __("Образование"),
      path: "education"
    },
    PHOTO: {
      name: __("Фото"),
      path: "photo"
    },
    VIDEO: {
      name: __("Видео"),
      path: "video"
    },
    DOCUMENTS: {
      name: __("Документы"),
      path: "doc"
    },
    ARTICLES: {
      name: __("Статьи"),
      path: "article"
    }
  };
}

export function useTaskModalTitles() {
  const { __ } = useLocales();
  return {
    [TASK_MODALS.ADD_SECTION]: __("Создать раздел"),
    [TASK_MODALS.EDIT_SECTION]: __("Редактировать раздел"),
    [TASK_MODALS.DELETE_SECTION]: __("Удалить раздел"),
    [TASK_MODALS.ADD_NOTE]: __("Создать заметку"),
    [TASK_MODALS.EDIT_NOTE]: __("Редактировать заметку"),
    [TASK_MODALS.ADD_TASK]: __("Добавление задачи"),
    [TASK_MODALS.ADD_MEETING]: __("Создать встречу"),
    [TASK_MODALS.RESCHEDULE_ONE]: __("Перенести встречу"),
    [TASK_MODALS.RESCHEDULE_ALL]: __("Перенести все встречи"),
    [TASK_MODALS.ADD_CALL]: __("Создать звонок"),
    [TASK_MODALS.ADD_LETTER]: __("Создать письмо"),
    [TASK_MODALS.DELETE_TASK]: __("Удаление задачи"),
    [TASK_MODALS.ADD_COMMENT_TASK]: __("Комментарий к задаче"),
    [TASK_MODALS.ADD_REMINDER]: __("Создать напоминание"),
    [TASK_MODALS.ADD_NOTE_TO_MEETING]: __("Добавить заметку к встрече"),
    [TASK_MODALS.ADD_PASSWORD]: __("Добавить пароль"),
    [TASK_MODALS.OPEN_TASK]: __("Задача"),
    [TASK_TYPES.TASK]: __("Редактировать задачу"),
    [TASK_TYPES.MEETINGS]: __("Редактировать встречу"),
    [TASK_TYPES.CALLS]: __("Редактировать звонок"),
    [TASK_TYPES.NOTES]: __("Редактировать заметку")
  };
}

export function useContextMenuFolderLibrary() {
  const { __ } = useLocales();
  return [
    { name: __("Редактировать"), img: "edit", type: contextMenuFolder.CUSTOMIZE },
    { name: __("Удалить раздел"), img: "garbage", type: contextMenuFolder.DELETE }
  ];
}

export function useLibraryModalTitles() {
  const { __ } = useLocales();
  return {
    [LIBRARY_MODALS.ADD_SECTION]: __("Создать раздел"),
    [LIBRARY_MODALS.RENAME_SECTION]: __("Редактировать")
  };
}

// MAIL

export function useStandardMail(mail) {
  const { __ } = useLocales();
  return {
    INBOX: {
      name: __("Входящие"),
      path: `${mail}/inbox`
    },
    SEND: {
      name: __("Исходящие"),
      path: `${mail}/send`
    },
    ARCHIVE: {
      name: __("Архив"),
      path: `${mail}/archive`
    },
    DRAFT: {
      name: __("Черновик"),
      path: `${mail}/draft`
    },
    FAVORITES: {
      name: __("Избранное"),
      path: `${mail}/favorites`
    },
    TIME: {
      name: __("Отложенные"),
      path: `${mail}/time`
    },
    SPAM: {
      name: __("Спам"),
      path: `${mail}/spam`
    },
    CART: {
      name: __("Корзина"),
      path: `${mail}/cart`
    }
  };
}

export function useMailModalTitles() {
  const { __ } = useLocales();
  return {
    [MAIL_MODALS.NEW_MAIL]: __("Новое сообщение")
  };
}
