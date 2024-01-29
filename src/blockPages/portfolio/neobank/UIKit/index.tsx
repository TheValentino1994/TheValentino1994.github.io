/* ------------------------------ Basic imports ----------------------------- */
import { FC } from "react";
import "./uiKitStyles.scss";
import { IMAGES } from "../../../../constants/_images";
import SuspenseImage from "../../../../components/SuspenseImage";

const UIKit: FC = () => {
  /* --------------------------------- Render --------------------------------- */

  return (
    <section className="neobankUIKit">
      <div className="neobankUIKit__container">
        <div className="neobankUIKit__row">
          <p data-aos="fade-right" className="neobankUIKit__left">
            UI Kit
          </p>

          <p data-aos="fade-left" className="neobankUIKit__right">
            One of my roles was to create a comprehensive and exhaustive ui kit.
            Handing over the project to the cycle development team was key, and
            thanks to careful planning, I succeeded without any difficulties.
          </p>
        </div>
      </div>

      <div className="neobankUIKit__container">
        <SuspenseImage
          data-aos="zoom-out-up"
          src={IMAGES.projectsPhotos.neobank.uiKit1}
          alt="Neobank uikit 1"
        />
      </div>

      <div className="neobankUIKit__container">
        <SuspenseImage
          data-aos="zoom-out-up"
          src={IMAGES.projectsPhotos.neobank.uiKit2}
          alt="Neobank ui kit 2"
        />
      </div>
    </section>
  );
};

export default UIKit;
