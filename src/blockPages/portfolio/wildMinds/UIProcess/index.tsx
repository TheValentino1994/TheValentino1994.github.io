/* ------------------------------ Basic imports ----------------------------- */
import React, { FC, useCallback } from "react";
import "./uiProcessStyles.scss";

/* -------------------------------- Constants ------------------------------- */
import { IMAGES } from "../../../../constants/_images";
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
    <div className="wildMindsUIProcess">
      <div className="wildMindsUIProcess__container">
        <div className="wildMindsUIProcess__demonstrationContainer wildMindsUIProcess__row">
          <div className="wildMindsUIProcess__demonstration">
            <img
              src={IMAGES.projectsPhotos.wildMinds.bg4}
              alt="Wild minds bg4"
            />

            <IphoneX
              videoProps={{
                id: "wildMindsUi1",
                loop: false,
                onEnded: handleVideoEnd("wildMindsUi2"),
              }}
              alt="WildMinds ui process illustration 1"
              videoSrc={VIDEOS.wildMinds.uiProcess1}
            />
          </div>

          <div className="wildMindsUIProcess__demonstration">
            <img
              src={IMAGES.projectsPhotos.wildMinds.bg5}
              alt="Wild minds bg5"
            />

            <IphoneX
              videoProps={{
                id: "wildMindsUi2",
                loop: false,
                autoPlay: false,
                onEnded: handleVideoEnd("wildMindsUi1"),
              }}
              alt="WildMinds ui process illustration 2"
              videoSrc={VIDEOS.wildMinds.uiProcess2}
            />
          </div>
        </div>

        <div className="wildMindsUIProcess__row">
          <div className="wildMindsUIProcess__left">
            <div>
              <h3>UI Process</h3>
              <p>Live product realization stage</p>
            </div>
          </div>

          <div className="wildMindsUIProcess__right wildMindsUIProcess__mainText">
            <h2>
              The final results of the design became very complex and very
              light, comfortable and affordable product.
            </h2>

            <p>
              Working closely with the client and end users to select the right
              color palette, user interface approach, and overall product
              appearance. We were able to achieve the desired result
            </p>

            <p>
              At the same time, all the functions and functionality of
              applications have been preserved, and all its features are
              available by few clicks.
            </p>
          </div>
        </div>

        <div className="wildMindsUIProcess__results">
          <img
            src={IMAGES.projectsPhotos.wildMinds.result}
            alt="Wild minds results"
          />
        </div>
      </div>
    </div>
  );
};

export default UiProcess;
