/* ------------------------------ Basic imports ----------------------------- */
import React, { FC } from "react";
import "./challengesStyles.scss";

/* -------------------------------- Constants ------------------------------- */
import { VIDEOS } from "../../../../constants/_videos";
import { IMAGES } from "../../../../constants/_images";

/* ------------------------------- Components ------------------------------- */
import { IphoneX } from "../../../../components";

/* ---------------------------------- Hooks --------------------------------- */
import { useSlides } from "../../../../hooks/useSlides";

const Challenges: FC = () => {
  const { slideToShow } = useSlides(5, 4000);

  /* --------------------------------- Render --------------------------------- */

  return (
    <div className="lexerChallenges">
      <div className="lexerChallenges__container">
        <div className="lexerChallenges__demonstrationContainer">
          <div className="lexerChallenges__demonstration">
            <IphoneX
              alt="Lexer challenges illustration"
              videoSrc={VIDEOS.lexer.challanges1}
            />
          </div>

          <div className="lexerChallenges__demonstration">
            <IphoneX
              alt="Lexer challenges illustration"
              screenshotSrc={IMAGES.projectsPhotos.lexer.slides1[slideToShow]}
            />
          </div>
        </div>

        <div className="lexerChallenges__row">
          <div className="lexerChallenges__left">
            <div>
              <h3>Challenges</h3>
              <p>Product manufacturing stage</p>
            </div>
          </div>

          <div className="lexerChallenges__right lexerChallenges__mainText">
            <h2>
              Great ideas attract users, and thoughtful design makes them stay.
            </h2>

            <p>
              One of the most demanded feature that Lexer provides to its users
              is simple interaction with cryptocurrency.
            </p>

            <p>
              Using Lexer, users get free access to wallets and fast,
              transparent withdrawals and exchanges of cryptocurrency money.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Challenges;
