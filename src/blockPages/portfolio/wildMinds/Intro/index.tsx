/* ------------------------------ Basic imports ----------------------------- */
import React, { FC, useCallback, useEffect, useState } from "react";
import "./introStyles.scss";

/* -------------------------------- Constants ------------------------------- */
import { IMAGES } from "../../../../constants/_images";
import { VIDEOS } from "../../../../constants/_videos";
import { ICONS } from "../../../../constants/_icons";

/* ------------------------------- Components ------------------------------- */
import { IphoneX } from "../../../../components";

const Intro: FC = () => {
  /* ---------------------------------- Hooks --------------------------------- */

  const [played, setPlayed] = useState<boolean>(false);

  /* -------------------------------- Hendlers -------------------------------- */

  const handleVideoEnded = useCallback(() => {
    setPlayed(true);
  }, [played]);

  function handleLaunchVideo() {
    if (!played && window.scrollY > 250) {
      //@ts-ignore
      document.querySelector("#wildMindsIntroVideo")?.play?.();
    }
  }

  useEffect(() => {
    if (played) window.removeEventListener("scroll", handleLaunchVideo);

    window.addEventListener("scroll", handleLaunchVideo);

    return () => {
      window.removeEventListener("scroll", handleLaunchVideo);
    };
  }, [played]);

  /* --------------------------------- Render --------------------------------- */

  return (
    <div className="wildMindsIntro">
      <div className="wildMindsIntro__container">
        <div className="wildMindsIntro__row">
          <div className="wildMindsIntro__left">
            <div>
              <h3>Wild Minds</h3>
              <p>Fitness /Health /iOS · Android · </p>
            </div>

            <div>
              <h3>Interested?</h3>
              <a
                href="https://apps.apple.com/ua/app/wild-minds-meditation/id1598957508?l=uk"
                target="_blank"
                rel="noreferrer"
              >
                App Store <ICONS.Utils.ArrowIcon />{" "}
              </a>
              <a
                href="https://play.google.com/store/apps/details?id=com.wildminds_front"
                target="_blank"
                rel="noreferrer"
              >
                Google Play <ICONS.Utils.ArrowIcon />
              </a>
            </div>
          </div>

          <h2 className="wildMindsIntro__right">
            Wild Minds is a mindfulness meditation app designed to meet your
            experience level wherever you are
          </h2>
        </div>

        <div className="wildMindsIntro__demonstration">
          <img
            src={IMAGES.projectsPhotos.wildMinds.bg1}
            alt="Wild minds intro"
          />

          <IphoneX
            videoProps={{
              loop: false,
              autoPlay: false,
              id: "wildMindsIntroVideo",
              onEnded: handleVideoEnded,
            }}
            alt="WildMinds intro illustration"
            videoSrc={VIDEOS.wildMinds.intro}
          />
        </div>

        <div className="wildMindsIntro__row">
          <div className="wildMindsIntro__left">
            <div>
              <h3>My Contribution</h3>
              <p>App redesign</p>
              <p>UX strategy</p>
              <p>Design system</p>
              <p>Prototyping</p>
            </div>

            <div>
              <h3>Timeline</h3>
              <p>1,5 month</p>
              <p>(Sep 2022 - Nov 2022)</p>
            </div>
          </div>

          <div className="wildMindsIntro__right wildMindsIntro__mainText">
            <p>
              The main idea of ​​Wild Minds is to offer daily meditation
              wherever you are. From beginners embarking on their first journey
              towards a better life through mindfulness to seasoned experts
            </p>

            <p>
              Wild Mild is my first project that was immediately released. Here
              I worked on creating a complete brand experience for WildMinds:
              problem solving, redesign, design guidelines, app design for a
              user with an existing product
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Intro;
