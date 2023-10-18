/* ------------------------------ Basic imports ----------------------------- */
import { FC } from "react";

/* ------------------------------- Block pages ------------------------------ */
import { Challenges, Intro } from "../../blockPages/portfolio/neobank";

const Neobank: FC = () => {
  /* --------------------------------- Render --------------------------------- */

  return (
    <>
      <Intro />
      <Challenges />
    </>
  );
};

export default Neobank;
