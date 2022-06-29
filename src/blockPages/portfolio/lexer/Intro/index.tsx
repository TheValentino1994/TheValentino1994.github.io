/* ------------------------------ Basic imports ----------------------------- */
import React, { FC } from "react";
import "./introStyles.scss";

/* -------------------------------- Constants ------------------------------- */
import { VIDEOS } from "../../../../constants/_videos";

/* ------------------------------- Components ------------------------------- */
import { IphoneX } from "../../../../components";

const Intro: FC = () => {
  /* --------------------------------- Render --------------------------------- */

  return (
    <div className="lexerIntro">
      <div className="lexerIntro__container">
        <div className="lexerIntro__row">
          <div className="lexerIntro__left">
            <h3>Lexer</h3>
            <p>Cryptocurrency / iOS · Android · </p>
          </div>

          <h2 className="lexerIntro__right">
            Single mobile app for managing all your data, cryptocurrencies, and
            more.
          </h2>
        </div>

        <div className="lexerIntro__demonstration">
          <IphoneX
            alt="Lexer intro illustration"
            videoSrc={VIDEOS.lexer.intro}
          />
        </div>

        <div className="lexerIntro__row">
          <div className="lexerIntro__left">
            <div>
              <h3>My Contribution</h3>
              <p>Product strategy</p>
              <p>Design system</p>
              <p>Branding</p>
              <p>Delivery</p>
            </div>

            <div>
              <h3>Timeline</h3>
              <p>2 months</p>
              <p>(Apr 2022 - June 2022)</p>
            </div>
          </div>

          <div className="lexerIntro__right lexerIntro__mainText">
            <p>
              Lexer is a new and modern cryptocurrency exchange that offers easy
              trading in seconds!
            </p>

            <p>
              App's heart is privacy technology that stores all of your data,
              such as identities, while giving you an ability to manage your
              cryptocurrencies.
            </p>

            <p>
              I worked on creating a complete brand experience for Lexer:
              strategy, brand, design guidelines, user app design that
              transparently links all aspects of a cryptocurrency transaction.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Intro;
