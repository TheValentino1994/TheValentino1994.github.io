/* ------------------------------ Basic imports ----------------------------- */
import React, { FC } from "react";

/* ------------------------------- Block pages ------------------------------ */
import {
  Challenges,
  Intro,
  DesignSystem,
  UiProcess,
} from "../../blockPages/portfolio/neobank";

const Neobank: FC = () => {
  /* --------------------------------- Render --------------------------------- */

  return (
    <>
      <Intro />
      {/* <Challenges />
      <UiProcess />
      <DesignSystem /> */}
    </>
  );
};

export default Neobank;
