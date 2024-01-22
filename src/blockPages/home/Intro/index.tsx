/* ------------------------------ Basic imports ----------------------------- */
import React, { FC } from "react";
import "./introStyles.scss";
import { useIntroAnimation } from "./useIntroAnimation";
import { motion } from "framer-motion";

const Intro: FC = () => {
  const { ref, opacity, scale } = useIntroAnimation();

  /* --------------------------------- Render --------------------------------- */

  return (
    <motion.section style={{ opacity, scale }} ref={ref} className="homeIntro">
      <div className="homeIntro__content">
        <h2>Valentyn Kuchernoha</h2>
        <span>UX/UI Designer</span>

        <img
          alt="Valentyn Kuchernoha UX/UI Designer"
          src={require("../../../assets/images/illustrations/Project.png")}
        />
      </div>

      <div className="homeIntro__content">
        <h1>
          I’m a UX / UI Designer from Lviv, dedicated to turning complex
          problems into user-friendly solutions.
        </h1>
        <p>Currently Designing at Fivecube.</p>
        <p>
          Over the past 2 years, my journey as a designer has led me to build
          design and ship mobile and web products from the ground up.
        </p>

        <p>
          My work has been dedicated to using design to turn complex problems
          into simple, user-friendly solutions that are accessible to all.
        </p>
      </div>
    </motion.section>
  );
};

export default Intro;
