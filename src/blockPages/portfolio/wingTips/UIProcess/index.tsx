/* ------------------------------ Basic imports ----------------------------- */
import React, { FC, useCallback } from "react";
import "./uiProcessStyles.scss";

/* -------------------------------- Constants ------------------------------- */
import { VIDEOS } from "../../../../constants/_videos";

/* ------------------------------- Components ------------------------------- */
import { IphoneX } from "../../../../components";

const UiProcess: FC = () => {
  /* -------------------------------- Handlers -------------------------------- */

  const handleVideoEnd = useCallback(
    (videoToStart: string) => () => {
      //@ts-ignore
      document.querySelector(`#${videoToStart}`)?.play?.();
    },
    []
  );

  /* --------------------------------- Render --------------------------------- */

  return (
    <div className="wingTipzUiProcess">
      <div className="wingTipzUiProcess__container">
        <div className="wingTipzUiProcess__demonstrationContainer">
          <div className="wingTipzUiProcess__demonstration">
            <IphoneX
              videoProps={{
                id: "wingTipzUi1",
                loop: false,
                onEnded: handleVideoEnd("wingTipzUi2"),
              }}
              alt="WingTipz ui process illustration"
              videoSrc={VIDEOS.wingTipz.uiProcess1}
            />
          </div>

          <div className="wingTipzUiProcess__demonstration">
            <IphoneX
              videoProps={{
                id: "wingTipzUi2",
                loop: false,
                autoPlay: false,
                onEnded: handleVideoEnd("wingTipzUi1"),
              }}
              alt="WingTipz ui illustration"
              videoSrc={VIDEOS.wingTipz.uiProcess2}
            />
          </div>
        </div>

        <div className="wingTipzUiProcess__row">
          <div className="wingTipzUiProcess__left">
            <div>
              <h3>UI Process</h3>
              <p>Live product realization stage</p>
            </div>
          </div>

          <div className="wingTipzUiProcess__right wingTipzUiProcess__mainText">
            <h2>Online booking just got easier</h2>

            <p>
              Working closely with the team and taking into account customer
              feedback helped to create a greatly improved participation
              experience for all users.
            </p>

            <p>
              We have simplified the user flow and made it more linear.As a
              result, we achieved much better acceptance and understanding in
              general for new users.
            </p>

            <p>
              And for coaches, we've created new ways to turn their phones into
              full-fledged workstations. These new tools make the online booking
              experience one and the holistic.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UiProcess;
