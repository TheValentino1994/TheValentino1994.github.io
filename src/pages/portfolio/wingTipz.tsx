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
import { CaseLayout } from "../../layouts";

const WingTipz: FC = () => {
  /* --------------------------------- Render --------------------------------- */

  return (
    <CaseLayout>
      <Intro />
      <Challenges />
      <UIProcess />
      <Elements />
      <Results />
    </CaseLayout>
  );
};

export default WingTipz;
