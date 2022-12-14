import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { onGetContacts } from "../../../../Store/actions/CabinetActions";

import styles from "./MyProfile.module.sass";
import { ReactComponent as UploadIcon } from "../../../../assets/PrivateCabinet/upload.svg";

import SearchField from "../SearchField";
import StorageSize from "../StorageSize";
import Notifications from "../Notifications";
import Profile from "../Profile/Profile";
import BottomPanel from "../BottomPanel";
import TellFriend from "./TellFriends/TellFriend";
import Support from "./Support";
import DataMemory from "./DataMemory";
import Personal from "./Personal/Personal";
import Confident from "./Confident";
import PrimaryButton from "./PrimaryButton";
import TariffPlan from "./TariffPlan/increase_storage";
import { useLocales } from "react-localized";
import classnames from "classnames";

const Settings = () => {
  const { __ } = useLocales();
  const { theme } = useSelector((state) => state.user.userInfo);
  const dispatch = useDispatch();
  const [pageOption, setPageOption] = useState("confident");
  const [popup, setPopup] = useState(false);

  useEffect(() => {
    dispatch(onGetContacts());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <SearchField />
        <div className={styles.infoHeader}>
          <StorageSize />
          <Notifications />
          <Profile />
        </div>
      </div>

      <div className={classnames(styles.content, `scrollbar-${theme}`)}>
        <div className={styles.buttons}>
          <div className={styles.buttonsList}>
            <PrimaryButton
              text={__("Конфиденциальность")}
              active={pageOption === "confident"}
              onClick={() => setPageOption("confident")}
            />
            <PrimaryButton
              text={__("Персонализация")}
              active={pageOption === "personal"}
              onClick={() => setPageOption("personal")}
            />
            <PrimaryButton
              text={__("Данные и память")}
              active={pageOption === "data_memory"}
              onClick={() => setPageOption("data_memory")}
            />
            <PrimaryButton
              text={__("Вопросы о 4HUB")}
              active={pageOption === "questions"}
              onClick={() => setPageOption("questions")}
            />

            <div className={styles.buttonsRight}>
              <PrimaryButton
                text={__("Рассказать друзьям")}
                icon={<UploadIcon />}
                alt="Upload"
                active={popup}
                onClick={() => setPopup(true)}
              />
            </div>
          </div>
        </div>

        {pageOption === "confident" && <Confident />}
        {pageOption === "personal" && <Personal />}
        {pageOption === "data_memory" && <DataMemory setPageOption={setPageOption} />}
        {pageOption === "questions" && <Support />}

        {pageOption === "tariff_plan" && <TariffPlan />}
      </div>

      {popup && <TellFriend set={setPopup} />}

      <BottomPanel />
    </div>
  );
};

export default Settings;
