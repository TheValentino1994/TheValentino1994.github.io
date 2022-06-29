/* ------------------------------ Basic imports ----------------------------- */
import React, { FC } from "react";

/* ------------------------------- Block pages ------------------------------ */
import {
  Challenges,
  Intro,
  UiProcess,
} from "../../blockPages/portfolio/wildMinds";

const WildMinds: FC = () => {
  /* --------------------------------- Render --------------------------------- */

  return (
    <>
      <Intro />
      <Challenges />
      <UiProcess />
    </>
  );
};

export default WildMinds;
