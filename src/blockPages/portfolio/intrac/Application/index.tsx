/* ------------------------------ Basic imports ----------------------------- */
import { FC } from "react";
import "./applicationStyles.scss";
import { IMAGES } from "../../../../constants/_images";
import SuspenseImage from "../../../../components/SuspenseImage";

const Application: FC = () => {
  /* --------------------------------- Render --------------------------------- */

  return (
    <section className="intracApplication">
      <div className="intracApplication__container">
        <div className="intracApplication__row">
          <p data-aos="fade-right" className="intracApplication__left">
            Mobile Application
          </p>

          <p
            data-aos="fade-left"
            className="intracApplication__right intracApplication__mainText"
          >
            The mobile experience required specific UX and UI thinking to allow
            for optimal productivity for users on the go. Prioritization of
            actions and reduction of functionality allowed for a focussed User
            Experience.
          </p>
        </div>
      </div>

      <div className="intracApplication__container">
        <SuspenseImage
          data-aos="zoom-out-up"
          src={IMAGES.projectsPhotos.intrac.application}
          alt="intrac application"
        />
      </div>
    </section>
  );
};

export default Application;
