/* ------------------------------ Basic imports ----------------------------- */
import { FC } from "react";

/* ------------------------------- Block pages ------------------------------ */
import {
  Intro,
  InformationArchitecture,
  DesignSystem,
  ProductDesign,
  Application,
} from "../../blockPages/portfolio/loop";
import { CaseLayout } from "../../layouts";

const Loop: FC = () => {
  /* --------------------------------- Render --------------------------------- */

  return (
    <CaseLayout>
      <Intro />
      <InformationArchitecture />
      <DesignSystem />
      <ProductDesign />
      <Application />
    </CaseLayout>
  );
};

export default Loop;
