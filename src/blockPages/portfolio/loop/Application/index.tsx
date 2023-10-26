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
          <p data-aos="fade-right" className="loopApplication__left">
            Mobile app
          </p>

          <p data-aos="fade-left" className="loopApplication__right">
            The mobile experience required specific UX and UI thinking to allow
            for optimal productivity for users on the go. Prioritization of
            actions and reduction of functionality allowed for a focussed User
            Experience.
          </p>
        </div>
      </div>

      <div className="loopApplication__container">
        <img
          data-aos="zoom-out-up"
          src={IMAGES.projectsPhotos.loop.application1}
          alt={`loop application 1`}
        />
        <img
          data-aos="zoom-out-up"
          src={IMAGES.projectsPhotos.loop.application2}
          alt={`loop application 2`}
        />
      </div>

      <div className="loopApplication__container-mobile">
        {IMAGES.projectsPhotos.loop.applicationMobile.map((item, index) => (
          <img
            data-aos="zoom-out-up"
            key={index}
            src={item}
            alt={`loop application ${index}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Application;
