/* ------------------------------ Basic imports ----------------------------- */
import { FC } from "react";

/* ------------------------------- Block pages ------------------------------ */
import {
  Challenges,
  Intro,
  DesignArchitecture,
  Solution,
  DesignSystem,
  WebInterface,
  Application,
  Challenge,
} from "../../blockPages/portfolio/intrac";
import { CaseLayout } from "../../layouts";

const Intrac: FC = () => {
  /* --------------------------------- Render --------------------------------- */

  return (
    <CaseLayout>
      <Intro />
      <Challenges />
      <Challenge />
      <DesignArchitecture />
      <Solution />
      <DesignSystem />
      <WebInterface />
      <Application />
    </CaseLayout>
  );
};

export default Intrac;
