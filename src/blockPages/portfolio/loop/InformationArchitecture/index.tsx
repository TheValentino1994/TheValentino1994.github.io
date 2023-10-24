/* ------------------------------ Basic imports ----------------------------- */
import { FC } from "react";
import "./informationArchitectureStyles.scss";
import { IMAGES } from "../../../../constants/_images";

const InformationArchitecture: FC = () => {
  /* --------------------------------- Render --------------------------------- */

  return (
    <section className="loopInformationArchitecture">
      <div className="loopInformationArchitecture__container">
        <div className="loopInformationArchitecture__row">
          <p className="loopInformationArchitecture__left">
            Mobile Application
          </p>

          <p className="loopInformationArchitecture__right loopInformationArchitecture__mainText">
            The mobile experience required specific UX and UI thinking to allow
            for optimal productivity for users on the go. Prioritization of
            actions and reduction of functionality allowed for a focussed User
            Experience.
          </p>
        </div>
      </div>

      <div className="loopInformationArchitecture__container">
        <img
          src={IMAGES.projectsPhotos.loop.informationArchitectureDiagram}
          alt="loop information architecture"
        />
      </div>
    </section>
  );
};

export default InformationArchitecture;
