/* ------------------------------ Basic imports ----------------------------- */
import { FC } from "react";
import "./elementsStyles.scss";
import { IMAGES } from "../../../../constants/_images";
import SuspenseImage from "../../../../components/SuspenseImage";

const Elements: FC = () => {
  /* --------------------------------- Render --------------------------------- */

  return (
    <section className="wingTipzElements">
      <div className="wingTipzElements__container">
        <div className="wingTipzElements__row">
          <p data-aos="fade-right" className="wingTipzElements__left">
            Elements
          </p>

          <div data-aos="fade-left" className="wingTipzElements__right">
            <p>
              Creating a comprehensive design system that would take into
              account and speed up the design development with elements and
              their interactions and component states. Handing over the design
              to the cycle development team was key, and thanks to careful
              planning, I was able to do so without any difficulties.
            </p>
          </div>
        </div>
      </div>

      <div className="wingTipzElements__container">
        <SuspenseImage
          data-aos="zoom-out-up"
          src={IMAGES.projectsPhotos.wingTipz.elements}
          alt={`wingTipz Elements`}
        />
      </div>
    </section>
  );
};

export default Elements;
