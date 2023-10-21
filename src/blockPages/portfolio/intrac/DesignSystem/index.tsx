/* ------------------------------ Basic imports ----------------------------- */
import { FC } from "react";
import "./designSystemStyles.scss";
import { IMAGES } from "../../../../constants/_images";

const DesignSystem: FC = () => {
  /* --------------------------------- Render --------------------------------- */

  return (
    <section className="intracDesignSystem">
      <div className="intracDesignSystem__container">
        <div className="intracDesignSystem__row">
          <p className="intracDesignSystem__left">Design system</p>

          <p className="intracDesignSystem__right">
            One of my roles was to create a comprehensive and exhaustive design
            system that would take into account all user flows, actions, and
            component states. Handing over the project to the cycle development
            team was key, and thanks to careful planning, I succeeded without
            any difficulties.
          </p>
        </div>
      </div>

      <div className="intracDesignSystem__container">
        {IMAGES.projectsPhotos.intrac.designSystem.map((item, index) => (
          <img key={index} src={item} alt={`intrac DesignSystem ${index}`} />
        ))}
      </div>
    </section>
  );
};

export default DesignSystem;
