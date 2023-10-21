/* ------------------------------ Basic imports ----------------------------- */
import { FC } from "react";
import "./applicationStyles.scss";
import { IMAGES } from "../../../../constants/_images";

const Application: FC = () => {
  /* --------------------------------- Render --------------------------------- */

  return (
    <section className="intracApplication">
      <div className="intracApplication__container">
        <div className="intracApplication__row">
          <p className="intracApplication__left">Mobile Application</p>

          <p className="intracApplication__right intracApplication__mainText">
            The mobile experience required specific UX and UI thinking to allow
            for optimal productivity for users on the go. Prioritization of
            actions and reduction of functionality allowed for a focussed User
            Experience.
          </p>
        </div>
      </div>

      <div className="intracApplication__container">
        <img
          src={IMAGES.projectsPhotos.intrac.application}
          alt="intrac application"
        />
      </div>
    </section>
  );
};

export default Application;
