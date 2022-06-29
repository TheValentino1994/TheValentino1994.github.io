/* ------------------------------ Basic imports ----------------------------- */
import React, { FC } from "react";
import "./challengesStyles.scss";

/* -------------------------------- Constants ------------------------------- */
import { IMAGES } from "../../../../constants/_images";
import { VIDEOS } from "../../../../constants/_videos";

/* ------------------------------- Components ------------------------------- */
import { IphoneX } from "../../../../components";

const Challenges: FC = () => {
  /* --------------------------------- Render --------------------------------- */

  return (
    <div className="wildMindsChallenges">
      <div className="wildMindsChallenges__container">
        <div className="wildMindsChallenges__demonstrationContainer wildMindsChallenges__row">
          <div className="wildMindsChallenges__demonstration">
            <img
              src={IMAGES.projectsPhotos.wildMinds.bg2}
              alt="Wild minds bg2"
            />

            <IphoneX
              alt="WildMinds challenges illustration 1"
              videoSrc={VIDEOS.wildMinds.challenges1}
            />
          </div>

          <div className="wildMindsChallenges__demonstration">
            <img
              src={IMAGES.projectsPhotos.wildMinds.bg3}
              alt="Wild minds bg3"
            />

            <IphoneX
              alt="WildMinds challenges illustration 2"
              videoSrc={VIDEOS.wildMinds.challenges2}
            />
          </div>
        </div>

        <div className="wildMindsChallenges__row">
          <div className="wildMindsChallenges__left">
            <div>
              <h3>Challenges</h3>
              <p>Product manufacturing stage</p>
            </div>
          </div>

          <div className="wildMindsChallenges__right wildMindsChallenges__mainText">
            <h2>
              Updating an existing product and make it easier to work with
            </h2>

            <p>
              Despite the popularity of the platforms and the high demand for
              its services, the company began considering complaints about the
              convenience of service.
            </p>

            <p>
              Due to inconvenient and complex UX design, as well as outdated and
              chaotic UI design, the popularity of the service began declining
              significantly. As a result, there was an outflow of customers.
            </p>

            <p>
              Clients could not quickly and easily achieve their main goals,
              which means that the key function of the mobile application could
              not be realized
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Challenges;
