/* ------------------------------ Basic imports ----------------------------- */
import { FC } from "react";
import "./applicationStyles.scss";
import { IMAGES } from "../../../../constants/_images";

const Application: FC = () => {
  /* --------------------------------- Render --------------------------------- */

  return (
    <section className="loopApplication">
      <div className="loopApplication__container">
        <div className="loopApplication__row">
          <p className="loopApplication__left">Mobile Application</p>

          <p className="loopApplication__right loopApplication__mainText">
            The mobile experience required specific UX and UI thinking to allow
            for optimal productivity for users on the go. Prioritization of
            actions and reduction of functionality allowed for a focussed User
            Experience.
          </p>
        </div>
      </div>

      <div className="loopApplication__container">
        {/* <img
          src={IMAGES.projectsPhotos.loop.application}
          alt="loop application"
        /> */}
      </div>
    </section>
  );
};

export default Application;
