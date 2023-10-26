/* ------------------------------ Basic imports ----------------------------- */
import { FC } from "react";
import "./webInterfaceStyles.scss";
import { IMAGES } from "../../../../constants/_images";

const WebInterface: FC = () => {
  /* --------------------------------- Render --------------------------------- */

  return (
    <section className="intracWebInterface">
      <div className="intracWebInterface__container">
        <div className="intracWebInterface__row">
          <p data-aos="fade-right" className="intracWebInterface__left">
            Web interface
          </p>

          <div data-aos="fade-left" className="intracWebInterface__right">
            <p>
              We chose side pages as a solution to the problem, taking into
              account the requirements of the existing project and potential
              growth in the future.
            </p>

            <p>
              Even though some side pages have vertical scrolling, they don't
              feel overloaded because the side page fills the entire height of
              the viewport, allowing the user to see more content.
            </p>
          </div>
        </div>
      </div>

      <div className="intracWebInterface__container">
        <img
          data-aos="zoom-out-up"
          src={IMAGES.projectsPhotos.intrac.webInterface1}
          alt={`intrac WebInterface 1`}
        />
      </div>

      <div className="intracWebInterface__container">
        <img
          data-aos="zoom-out-up"
          src={IMAGES.projectsPhotos.intrac.webInterface2}
          alt={`intrac WebInterface 2`}
        />
      </div>
    </section>
  );
};

export default WebInterface;
