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
          <p className="loopApplication__left">Mobile app</p>

          <p className="loopApplication__right">
            The mobile experience required specific UX and UI thinking to allow
            for optimal productivity for users on the go. Prioritization of
            actions and reduction of functionality allowed for a focussed User
            Experience.
          </p>
        </div>
      </div>

      <div className="loopApplication__container">
        <img
          src={IMAGES.projectsPhotos.loop.application1}
          alt={`loop application 1`}
        />
        <img
          src={IMAGES.projectsPhotos.loop.application2}
          alt={`loop application 2`}
        />
      </div>

      <div className="loopApplication__container-mobile">
        {IMAGES.projectsPhotos.loop.applicationMobile.map((item, index) => (
          <img key={index} src={item} alt={`loop application ${index}`} />
        ))}
      </div>
    </section>
  );
};

export default Application;
