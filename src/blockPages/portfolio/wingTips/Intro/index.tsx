/* ------------------------------ Basic imports ----------------------------- */
import React, { FC } from "react";
import "./introStyles.scss";

/* -------------------------------- Constants ------------------------------- */
import { IMAGES } from "../../../../constants/_images";

const Intro: FC = () => {
  /* --------------------------------- Render --------------------------------- */

  return (
    <div className="wingTipzIntro">
      <div className="wingTipzIntro__container">
        <div className="wingTipzIntro__row">
          <div className="wingTipzIntro__left">
            <h3>Wingtipz</h3>
            <p>Fitness /Health /iOS · Android · </p>
          </div>

          <h2 className="wingTipzIntro__right">
            An online application for finding various sports lessons in your
            city.
          </h2>
        </div>

        <img src={IMAGES.projectsPhotos.wingTipz.intro} alt="Lexer intro" />

        <div className="wingTipzIntro__row">
          <div className="wingTipzIntro__left">
            <div>
              <h3>My Contribution</h3>
              <p>iOS App design</p>
              <p>Research</p>
              <p>Design system</p>
            </div>

            <div>
              <h3>Timeline</h3>
              <p>2 month</p>
              <p>(May 2022 - Now)</p>
            </div>
          </div>

          <div className="wingTipzIntro__right wingTipzIntro__mainText">
            <p>
              The service was launched in 2022. This is the MVP version, that
              was created to discover demand on the market.
            </p>

            <p>
              After the first users and instructors appeared on the platform,
              instructors highly appreciated the interaction with users and the
              quality of applications in general.
            </p>

            <p>
              So I started working with team to improve the UX, visual design,
              and prepare the service for its upcoming growth.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Intro;
