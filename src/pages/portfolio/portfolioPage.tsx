/* ------------------------------ Basic imports ----------------------------- */
import React, { FC } from "react";
import { HomeIntro } from "../../blockPages/home";

/* ------------------------------- Block pages ------------------------------ */
import { WorksList } from "../../blockPages/portfolio/portfolioPage";

const Portfolio: FC = () => {
  /* --------------------------------- Render --------------------------------- */

  return (
    <>
      <HomeIntro />
      {/* <WorksList /> */}
    </>
  );
};

export default Portfolio;
