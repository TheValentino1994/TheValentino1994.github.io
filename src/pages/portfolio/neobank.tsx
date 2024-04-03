/* ------------------------------ Basic imports ----------------------------- */
import { FC } from "react";

/* ------------------------------- Block pages ------------------------------ */
import {
  Challenges,
  Intro,
  DesignPhases,
  UserPersonas,
  Research,
  DesignArchitecture,
  UIKit,
  Application,
} from "../../blockPages/portfolio/neobank";
import { CaseLayout } from "../../layouts";

const Neobank: FC = () => {
  /* --------------------------------- Render --------------------------------- */

  return (
    <CaseLayout>
      <Intro />
      <Challenges />
      <DesignPhases />
      <Research />
      <UserPersonas />
      <DesignArchitecture />
      <UIKit />
      <Application />
    </CaseLayout>
  );
};

export default Neobank;
