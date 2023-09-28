/* ------------------------------ Basic imports ----------------------------- */
import React, { FC } from "react";

/* ------------------------------- Block pages ------------------------------ */
import { HomeIntro, WorksList } from "../../blockPages/home";

const Home: FC = () => {
  /* --------------------------------- Render --------------------------------- */

  return (
    <>
      <HomeIntro />
      <WorksList />
    </>
  );
};

export default Home;
