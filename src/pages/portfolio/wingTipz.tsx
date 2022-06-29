/* ------------------------------ Basic imports ----------------------------- */
import React, { FC } from "react";

/* ------------------------------- Block pages ------------------------------ */
import {
  Challenges,
  Intro,
  Results,
  UiProcess,
} from "../../blockPages/portfolio/wingTips";

const WingTipz: FC = () => {
  /* --------------------------------- Render --------------------------------- */

  return (
    <>
      <Intro />
      <Challenges />
      <UiProcess />
      <Results />
    </>
  );
};

export default WingTipz;
