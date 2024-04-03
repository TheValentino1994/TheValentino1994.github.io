/* ------------------------------ Basic imports ----------------------------- */
import React, { FC } from "react";
import "./introStyles.scss";
import { useIntroAnimation } from "./useIntroAnimation";
import { motion } from "framer-motion";
import SuspenseImage from "../../../components/SuspenseImage";
import { IMAGES } from "../../../constants/_images";

const Intro: FC = () => {
  const { ref, opacity, translateY, scale } = useIntroAnimation();

  /* --------------------------------- Render --------------------------------- */

  return (
    <motion.section
      style={{ opacity, scale, y: translateY }}
      ref={ref}
      className="homeIntro"
    >
      <div className="homeIntro__content">
        <h2>Valentyn Kuchernoha</h2>
        <span>UX/UI Designer</span>

        <SuspenseImage
          alt="Valentyn Kuchernoha UX/UI Designer"
          src={IMAGES.avatar}
        />
      </div>

      <div className="homeIntro__content">
        <h1>
          I’m a UX / UI Designer from Lviv, dedicated to turning complex
          problems into user-friendly solutions.
        </h1>
        <p>Currently Rolling at Fivecube.</p>
        <p>
          Over my work as a designer has been dedicated to using design for
          crafting intuitive products that seamlessly integrate into daily life
          and turn complex problems into simple, user-friendly solutions that
          are accessible to all.
        </p>
      </div>
    </motion.section>
  );
};

export default Intro;
