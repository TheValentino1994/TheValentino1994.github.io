/* ------------------------------ Basic imports ----------------------------- */
import React, { FC } from "react";

/* ------------------------------- Block pages ------------------------------ */
import {
  Challenges,
  Intro,
  DesignSystem,
  UiProcess,
} from "../../blockPages/portfolio/lexer";

const Lexer: FC = () => {
  /* --------------------------------- Render --------------------------------- */

  return (
    <>
      <Intro />
      <Challenges />
      <UiProcess />
      <DesignSystem />
    </>
  );
};

export default Lexer;
