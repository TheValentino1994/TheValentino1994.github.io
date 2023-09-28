/* ------------------------------ Basic imports ----------------------------- */
import React, { FC } from "react";
import "./introStyles.scss";

const Intro: FC = () => {
  /* --------------------------------- Render --------------------------------- */

  return (
    <section className="homeIntro">
      <div className="homeIntro__content">
        <h2>Valentyn Kuchernoha</h2>
        <span>UX/UI Designer</span>
      </div>

      <div className="homeIntro__content">
        <h1>
          I’m a UX / UI Designer from Lviv, dedicated to turning complex
          problems into user-friendly solutions.
        </h1>
        <span>Currently Designing at Fivecube.</span>
      </div>
    </section>
  );
};

export default Intro;
