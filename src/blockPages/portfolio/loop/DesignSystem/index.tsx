/* ------------------------------ Basic imports ----------------------------- */
import { FC } from "react";
import "./designSystemStyles.scss";
import { IMAGES } from "../../../../constants/_images";

const DesignSystem: FC = () => {
  /* --------------------------------- Render --------------------------------- */

  return (
    <section className="loopDesignSystem">
      <div className="loopDesignSystem__container">
        <div className="loopDesignSystem__row">
          <p className="loopDesignSystem__left">Design system</p>

          <p className="loopDesignSystem__right">
            One of my roles was to create a comprehensive and exhaustive design
            system that would take into account all user flows, actions, and
            component states. Handing over the project to the cycle development
            team was key, and thanks to careful planning, I succeeded without
            any difficulties.
          </p>
        </div>
      </div>

      <div className="loopDesignSystem__container">
        <img
          src={IMAGES.projectsPhotos.loop.designSystem1}
          alt={`loop design system 1`}
        />
        <img
          src={IMAGES.projectsPhotos.loop.designSystem2}
          alt={`loop design system 2`}
        />
      </div>

      <div className="loopDesignSystem__container">
        <img
          src={IMAGES.projectsPhotos.loop.designSystem3}
          alt={`loop design system 3`}
        />
      </div>
    </section>
  );
};

export default DesignSystem;
