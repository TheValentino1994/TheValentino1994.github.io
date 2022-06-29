/* ------------------------------ Basic imports ----------------------------- */
import React, { FC } from "react";
import "./resultsStyles.scss";

/* -------------------------------- Constants ------------------------------- */
import { IMAGES } from "../../../../constants/_images";

const Results: FC = () => {
  /* --------------------------------- Render --------------------------------- */

  return (
    <div className="wingTipzResults">
      <div className="wingTipzResults__container">
        <div className="wingTipzResults__demonstration">
          <img
            src={IMAGES.projectsPhotos.wingTipz.result}
            alt="WingTipz results"
          />
        </div>

        <div className="wingTipzResults__row">
          <div className="wingTipzResults__left">
            <h3>Results</h3>
          </div>

          <div className="wingTipzResults__right wingTipzResults__mainText">
            <h2>New mobile application for instructors and users</h2>

            <p>
              Based on user feedback about the first version of the app, we
              focused on updating the core tasks in the mobile app - scheduling
              appointments, communicating with coaches, managing availability.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;
