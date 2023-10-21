/* ------------------------------ Basic imports ----------------------------- */
import { FC } from "react";
import "./uiKitStyles.scss";
import { IMAGES } from "../../../../constants/_images";

const UIKit: FC = () => {
  /* --------------------------------- Render --------------------------------- */

  return (
    <section className="neobankUIKit">
      <div className="neobankUIKit__container">
        <div className="neobankUIKit__row">
          <p className="neobankUIKit__left">UI Kit</p>

          <p className="neobankUIKit__right">
            One of my roles was to create a comprehensive and exhaustive ui kit.
            Handing over the project to the cycle development team was key, and
            thanks to careful planning, I succeeded without any difficulties.
          </p>
        </div>
        <img src={IMAGES.projectsPhotos.neobank.uiKit1} alt="Neobank uikit" />

        <img src={IMAGES.projectsPhotos.neobank.uiKit2} alt="Neobank ui kit" />
      </div>
    </section>
  );
};

export default UIKit;
