/* ------------------------------ Basic imports ----------------------------- */
import React, { FC } from "react";
import "./challengesStyles.scss";

/* -------------------------------- Constants ------------------------------- */
import { VIDEOS } from "../../../constants/_videos";

/* ------------------------------- Components ------------------------------- */
import { IphoneX } from "../../../components";

const Challenges: FC = () => {
  /* --------------------------------- Render --------------------------------- */

  return (
    <div className="wingTipzChallenges">
      <div className="wingTipzChallenges__container">
        <div className="wingTipzChallenges__demonstration">
          <IphoneX
            alt="WingTipz challenges illustration"
            videoSrc={VIDEOS.wingTipz.challenges1}
          />
        </div>

        <div className="wingTipzChallenges__row">
          <div className="wingTipzChallenges__left">
            <div>
              <h3>Challenges</h3>
              <p>Product manufacturing stage</p>
            </div>
          </div>

          <div className="wingTipzChallenges__right wingTipzChallenges__mainText">
            <h2>Seamless appointment booking experience</h2>

            <p>
              The most used and important part of the user journey is to find
              the right coach and sign up for a lesson. To improve it, I've
              simplified the user experience for finding instructors by
              developing a more powerful search and adding the ability to filter
              trainers by various parameters.
            </p>

            <p>
              At the same time, one of most important task was to completely
              rethink the design of instructor profiles - improve data
              visualization, build a clear information priority order, and
              implement new visual design.
            </p>

            <p>
              My main goal was to design these streams in such a way that they
              fit with other features and use the same components and
              interactions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Challenges;
