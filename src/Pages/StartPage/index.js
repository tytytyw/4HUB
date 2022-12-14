import React, { useState, useEffect } from "react";
import { useLocales } from "react-localized";

import styles from "./StartPage.module.sass";
import { ReactComponent as InfoIcon } from "../../assets/StartPage/info.svg";
import Intro from "./Components/Intro";
import UploadFile from "./Components/UploadFile";
import Infopage from "./Components/InfoPage";
import DownloadFile from "./Components/DownloadFile";
import EnterProfile from "./Components/EnterProfile";
import RegisterProfile from "./Components/RegisterProfile/index";
import ForgotPassword from "./Components/ForgotPassword";
import RenewPassword from "./Components/RenewPassword";
import Landing from "./Components/Landing/Landing";
import BusinessLanding from "../Cabinet/Components/Business/Landing/Landing";
import DownloadFolder from "./Components/DownloadFolder";
import { imageSrc } from "../../generalComponents/globalVariables";
import BusinessRegistration from "./Components/BusinessRegistration";
import LangPicker from "../../generalComponents/LangPicker";
import Error from "../../generalComponents/Error";
import PropTypes from "prop-types";

function StartPage({ setOptions, setLoadingType }) {
  const { __ } = useLocales();
  const [pageOption, setPage] = useState("init");
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    if (/action=download&fid/.test(window.location.search)) {
      setPage("downloadFile");
    }
    if (/action=pass_remember/.test(window.location.search)) {
      setPage("renewPassword");
    }
    if (/action=forder/.test(window.location.search)) {
      setPage("downloadFolder");
    }
    setLoadingType("");
  }, []); //eslint-disable-line

  const isLanding = () => pageOption === "landing" || pageOption === "business-landing";

  const onRegister = () => {
    setPage("register");
  };

  return (
    <div className={`${styles.wrapper} ${pageOption === "info" && styles.longWrap} ${isLanding() && styles.longWrap}`}>
      <header className={styles.header}>
        {isLanding() && (
          <a className={styles.logo} href="./">
            <img className={styles.logo_img} src={imageSrc + "assets/StartPage/logo.svg"} alt="4hub logo"></img>
          </a>
        )}
        <InfoIcon className={`${styles.listItem} ${styles.info}`} onClick={() => setPage("info")} />
        <LangPicker />
        <div className={styles.listItem} onClick={() => setPage("enter")}>
          {__("????????")}
        </div>
        <div className={`${styles.registerButton} ${styles.listItem}`} onClick={onRegister}>
          {__("??????????????????????")}
        </div>
      </header>
      <main className={styles.main}>
        {pageOption === "init" && <Intro setPage={setPage} setOptions={setOptions} />}
        {pageOption === "sendFile" && <UploadFile setPage={setPage} />}
        {pageOption === "develop" && (
          <div className={styles.main}>
            <img className={styles.hubIcon} src={imageSrc + "assets/StartPage/4HUB.svg"} alt="4HUB" />
            <div style={{ fontSize: "5vw", margin: "3vw 0" }}>{__("C?????????????? ?? ????????????????????")}</div>
            <div className={styles.buttonBack} onClick={() => setPage("init")}>
              {__("?????????? ???? ??????????????")}
            </div>
          </div>
        )}
        {pageOption === "landing" && <Landing />}
        {pageOption === "business-landing" && <BusinessLanding />}
        {pageOption === "info" && <Infopage setPage={setPage} />}
        {pageOption === "downloadFile" && <DownloadFile setPage={setPage} />}
        {pageOption === "downloadFolder" && (
          <DownloadFolder setPage={setPage} setOptions={setOptions} loader={loader} setLoader={setLoader} />
        )}
        {pageOption === "enter" && <EnterProfile setPage={setPage} />}
        {(pageOption === "register" || pageOption === "registerSuccess") && (
          <RegisterProfile setPage={setPage} pageOption={pageOption} />
        )}
        {pageOption === "business-register" && <BusinessRegistration setPage={setPage} pageOption={pageOption} />}

        {pageOption === "forgotPassword" && <ForgotPassword setPage={setPage} />}
        {pageOption === "renewPassword" && <RenewPassword setPage={setPage} />}
        {pageOption === "errorEnter" && (
          <Error error={true} message={__("???????????????? ?????????? ?????? ????????????")} set={() => setPage("enter")} />
        )}
      </main>
    </div>
  );
}

export default StartPage;

StartPage.propTypes = {
  setOptions: PropTypes.func,
  setLoadingType: PropTypes.func
};
