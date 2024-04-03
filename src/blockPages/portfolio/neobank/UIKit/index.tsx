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
            Design system / UI Kit
          </p>

          <div className="neobankUIKit__right">
            <p data-aos="fade-left" className="neobankUIKit__right">
              To present the brand consistently, I create a design system that
              ensures that all designs are compatible. This design language
              ensures consistency across all future products and features.
            </p>

            <p data-aos="fade-left" className="neobankUIKit__right">
              This approach allowed for a more streamlined design workflow,
              saving valuable time and resources compared to building the user
              interface from scratch.
            </p>
          </div>
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
