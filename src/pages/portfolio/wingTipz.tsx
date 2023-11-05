/* ------------------------------ Basic imports ----------------------------- */
import React, { FC } from "react";

/* ------------------------------- Block pages ------------------------------ */
import {
  Challenges,
  Intro,
  Results,
  Elements,
  UIProcess,
} from "../../blockPages/portfolio/wingTips";

const WingTipz: FC = () => {
  /* --------------------------------- Render --------------------------------- */

  return (
    <>
      <Intro />
      <Challenges />
      <UIProcess />
      <Elements />
      <Results />
    </>
  );
};

export default WingTipz;
