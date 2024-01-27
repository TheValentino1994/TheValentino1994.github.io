/* ------------------------------ Basic imports ----------------------------- */
import { FC } from "react";
import "./resultsStyles.scss";
import { IMAGES } from "../../../../constants/_images";
import SuspenseImage from "../../../../components/SuspenseImage";

const Results: FC = () => {
  /* --------------------------------- Render --------------------------------- */

  return (
    <section className="wingTipzResults">
      <div className="wingTipzResults__container">
        <div className="wingTipzResults__row">
          <p data-aos="fade-right" className="wingTipzResults__left">
            Results
          </p>

          <div data-aos="fade-left" className="wingTipzResults__right">
            <p>New mobile application for instructors and users.</p>

            <p>
              Based on user feedback on the first version of the app, i focused
              on updating the core tasks in the mobile app - scheduling
              appointments, communicating with coaches, and managing
              availability.
            </p>

            <p>
              And for coaches, I created new ways to turn their phones into
              full-fledged workstations. These new tools make the online booking
              experience one and the most holistic.
            </p>
          </div>
        </div>
      </div>

      <div className="wingTipzResults__container">
        <SuspenseImage
          data-aos="zoom-out-up"
          src={IMAGES.projectsPhotos.wingTipz.results}
          alt={`wingTipz Results`}
        />
      </div>
    </section>
  );
};

export default Results;
