/* ------------------------------ Basic imports ----------------------------- */
import { FC } from "react";

/* ------------------------------- Block pages ------------------------------ */
import {
  Challenges,
  Intro,
  DesignPhases,
  UserPersonas,
  DesignArchitecture,
  UIKit,
  Application,
} from "../../blockPages/portfolio/intrac";
import { CaseLayout } from "../../layouts";

const Intrac: FC = () => {
  /* --------------------------------- Render --------------------------------- */

  return (
    <CaseLayout>
      <Intro />
      <Challenges />
      <DesignArchitecture />
      <DesignPhases />
      <UserPersonas />
      <UIKit />
      <Application />
    </CaseLayout>
  );
};

export default Intrac;
