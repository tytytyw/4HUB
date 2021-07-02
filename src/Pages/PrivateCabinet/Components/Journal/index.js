import React, {useState} from 'react'

import styles from './Journal.module.sass'
import SearchField from '../SearchField'
import StorageSize from '../StorageSize'
import Notifications from '../Notifications'
import Profile from '../Profile'
import ServePanel from '../ServePanel'
import FileLine from './WorkElements/FileLine'
import {useSelector} from 'react-redux'
import DateBlock from './DateBlock'
import ContextMenu from '../../../../generalComponents/ContextMenu'
import {contextMenuFile} from '../../../../generalComponents/collections'
import ContextMenuItem from '../../../../generalComponents/ContextMenu/ContextMenuItem'
import ActionApproval from "../../../../generalComponents/ActionApproval";
import File from "../../../../generalComponents/Files";
import classNames from "classnames";
import {ReactComponent as PlayIcon} from "../../../../assets/PrivateCabinet/play-grey.svg";
import List from "../List";

const Journal = () => {

    const [workElementsView, setWorkElementsView] = useState('workLinesPreview')
    const [search, setSearch] = useState(null)
    const fileList = useSelector((state) => state.PrivateCabinet.fileList)

    const [year, setYear] = useState(null)
    const [collapse, setCollapse] = useState(false)
    const [listCollapsed, setListCollapsed] = useState(false)
    const [month, setMonth] = useState(null)

    const [chosenFile, setChosenFile] = useState(null)
    const [action, setAction] = useState({ type: "", name: "", text: "" })
    const [mouseParams, setMouseParams] = useState(null)
    const [filePreview, setFilePreview] = useState(null)

    const nullifyAction = () => setAction({ type: "", name: "", text: "" });

    const callbackArrMain = [
        {type: 'resend', name: '', text: ``, callback: (list, index) => setAction(list[index])},
        {type: 'share', name: '', text: ``, callback: (list, index) => setAction(list[index])},
        {type: 'copyLink', name: '', text: ``, callback: () => {}},
        {type: 'customize', name: 'Редактирование файла', text: ``, callback: (list, index) => setAction(list[index])},
        {type: 'customizeSeveral', name: `Редактирование файлов`, text: ``, callback: () => {}},
        {type: 'archive', name: 'Добавить файл в архив', text: `Вы действительно хотите архивировать файл ${chosenFile?.name}?`, callback: (list, index) => setAction(list[index])},
        {type: 'intoZip', name: 'Сжать в ZIP', text: ``, callback: (list, index) => setAction({...action, type: list[index].type, name: list[index].name})},
        {type: 'properties', name: 'Свойства', text: ``, callback: () => setAction({...action, type: 'properties', name: 'Свойства'})},
        {type: 'download', name: 'Загрузка файла', text: ``, callback: () => {}},
        {type: 'print', name: 'Распечатать файл', text: ``, callback: () => {}},
    ]
    const additionalMenuItems = [
        {
            type: 'delete',
            name: 'Удаление файла',
            text: `Вы действительно хотите удалить файл ${chosenFile?.name}?`,
            callback: (list, index) => setAction(list[index])
        },
    ]

    const renderMenuItems = (target, type) => {
        return target.map((item, i) => {
            return (
                <ContextMenuItem
                    key={i}
                    width={mouseParams.width}
                    height={mouseParams.height}
                    text={item.name}
                    callback={() => type[i]?.callback(type, i)}
                    imageSrc={`./assets/PrivateCabinet/contextMenuFile/${item.img}.svg`}
                />
            )
        })
    }

    const renderFile = () => {
        const file = fileList?.files?.[fileList.files.length - 1]
        if (!file) return null
        return (
            <FileLine
                file={file}
                setChosenFile={setChosenFile}
                chosenFile={chosenFile}
                setMouseParams={setMouseParams}
                setAction={setAction}
                filePreview={filePreview}
                setFilePreview={setFilePreview}
            />
        )
    }

    const renderFiles = () => {
        if (!fileList) return null
        return fileList.files?.map((file, index) => (
            <FileLine
                key={index}
                file={file}
                setChosenFile={setChosenFile}
                chosenFile={chosenFile}
                setMouseParams={setMouseParams}
                setAction={setAction}
                filePreview={filePreview}
                setFilePreview={setFilePreview}
            />
        ))
    }

    return (
        <div className={styles.parentWrapper}>

            <div className={styles.sideWrap}>
                <List
                    icon={false}
                    title='Программы'
                    src='add-folder.svg'
                    setListCollapsed={setListCollapsed}
                    listCollapsed={listCollapsed}
                    onCreate={(boolean) => {}}
                >
                    <div className={styles.folderListWrap}>

                    </div>
                </List>
            </div>

            <div className={styles.wrapper}>

                <div className={styles.header}>
                    <SearchField />
                    <div className={styles.infoHeader}>
                        <StorageSize />
                        <Notifications />
                        <Profile />
                    </div>
                </div>

                <ServePanel
                    setView={setWorkElementsView}
                    view={workElementsView}
                />

                <div className={styles.contentWrap}>

                    <DateBlock
                        search={search}
                        setSearch={setSearch}
                        year={year}
                        setYear={setYear}
                        month={month}
                        setMonth={setMonth}
                    />

                    <div className={styles.filesWrap}>

                        <div className={styles.fileWrap}>

                            <div
                                onClick={() => setCollapse(!collapse)}
                                className={styles.collapseHeader}
                            >
                                <p className={styles.dateName}>Август</p>
                                <button className={styles.collapseBtn}>
                                    2 объектов
                                </button>
                                <div
                                    className={classNames({
                                        [styles.arrowFile]: true,
                                        [styles.active]: !!collapse
                                    })}
                                >
                                    <PlayIcon
                                        className={classNames({
                                            [styles.playButton]: true,
                                            [styles.revert]: !!collapse
                                        })}
                                    />
                                </div>
                            </div>

                            {collapse &&
                            <div className={styles.fileDate}>
                                <p>10.08.2020</p>
                            </div>}

                            <div className={styles.collapseContent}>
                                {collapse ?
                                    renderFiles() :
                                    renderFile()}
                            </div>

                        </div>

                    </div>

                </div>

                {mouseParams !== null && (
                    <ContextMenu
                        params={mouseParams}
                        setParams={setMouseParams}
                        tooltip={true}
                    >
                        <div className={styles.mainMenuItems}>
                            {renderMenuItems(contextMenuFile.main, callbackArrMain)}
                        </div>
                        <div className={styles.additionalMenuItems}>
                            {renderMenuItems(contextMenuFile.additional, additionalMenuItems)}
                        </div>
                    </ContextMenu>
                )}

                {action.type === "delete" ? (
                    <ActionApproval
                        name={action.name}
                        text={action.text}
                        set={nullifyAction}
                        callback={() => {}}
                        approve={"Удалить"}
                    >
                        <div className={styles.fileActionWrap}>
                            <File format={chosenFile?.ext} color={chosenFile?.color} />
                        </div>
                    </ActionApproval>
                ) : null}
            </div>

        </div>
    )
}

export default Journal