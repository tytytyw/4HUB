import React, { useState } from "react";
import styles from "./BoardServicePanel.module.sass";
import PropTypes from "prop-types";
import { BOARDS } from "../../../../../../../generalComponents/globalVariables";
import { useTaskBoardTitle } from "../../../../../../../generalComponents/collections";
import { ReactComponent as FrameIcon } from "assets/PrivateCabinet/tasks/frame.svg";
import classNames from "classnames";
import { ReactComponent as AddIcon } from "../../../../../../../assets/PrivateCabinet/plus-3.svg";
import ThreeDots from "../../../../../../../generalComponents/ThreeDots/ThreeDots";
import { ReactComponent as LinesIcon } from "assets/PrivateCabinet/lines.svg";
import { ReactComponent as BarsIcon } from "assets/PrivateCabinet/tasks/bars.svg";
import { ReactComponent as CalendarIcon } from "assets/PrivateCabinet/tasks/calendar.svg";
import { ReactComponent as ListIcon } from "assets/PrivateCabinet/tasks/list.svg";
import TabsPicker from "../../../../../../../generalComponents/TabsPicker/TabsPicker";

function BoardServicePanel({ type, isLastElement }) {
  const TITLE = useTaskBoardTitle();
  const [tabSelect, setTabSelect] = useState(2);

  const ELEMENTS = [ListIcon, BarsIcon, LinesIcon, CalendarIcon];

  return (
    <div className={styles.boardServicePanelWrap}>
      <span className={styles.boardTitle}>{TITLE[type]}</span>
      <div className={styles.buttonsWrap}>
        <FrameIcon className={styles.frameIcon} />
        {!isLastElement ? <AddIcon className={classNames(styles.addIcon)} /> : null}
        {isLastElement ? <TabsPicker ELEMENTS={ELEMENTS} selected={tabSelect} onClick={setTabSelect} /> : null}
        <div className={styles.threeDots}>
          <ThreeDots onClick={() => {}} />
        </div>
      </div>
    </div>
  );
}

export default BoardServicePanel;

BoardServicePanel.propTypes = {
  type: PropTypes.oneOf(Object.values(BOARDS)).isRequired,
  isLastElement: PropTypes.bool
};