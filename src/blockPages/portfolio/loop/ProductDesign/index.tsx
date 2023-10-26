/* ------------------------------ Basic imports ----------------------------- */
import { FC } from "react";
import "./productDesignStyles.scss";
import { IMAGES } from "../../../../constants/_images";

const ProductDesign: FC = () => {
  /* --------------------------------- Render --------------------------------- */

  return (
    <section className="loopProductDesign">
      <div className="loopProductDesign__container">
        <div className="loopProductDesign__row">
          <p data-aos="fade-right" className="loopProductDesign__left">
            Product design
          </p>

          <div
            data-aos="fade-left"
            className="loopProductDesign__right loopProductDesign__mainText"
          >
            <p>
              I also assumed that there should be a solution for first-time
              users, and it should focus on well-designed onboarding that
              clearly introduces the user to the main features of the product to
              demonstrate its usefulness immediately.
            </p>

            <p className="loopProductDesign__right">
              In addition, I designed my solution with one main call to action
              on the screens, no distracting colors or messages, and a very
              clearly organized grouping of information, tools, and
              functionality.
            </p>
          </div>
        </div>
      </div>

      <div className="loopProductDesign__container">
        <img
          data-aos="zoom-out-up"
          src={IMAGES.projectsPhotos.loop.productDesign1}
          alt={`loop product design 1`}
        />
        <img
          data-aos="zoom-out-up"
          src={IMAGES.projectsPhotos.loop.productDesign2}
          alt={`loop product design 2`}
        />
      </div>

      <div className="loopProductDesign__container">
        <img
          data-aos="zoom-out-up"
          src={IMAGES.projectsPhotos.loop.productDesign3}
          alt={`loop product design 3`}
        />
      </div>

      <div className="loopProductDesign__container">
        <img
          data-aos="zoom-out-up"
          src={IMAGES.projectsPhotos.loop.productDesign4}
          alt={`loop product design 4`}
        />
        <img
          data-aos="zoom-out-up"
          src={IMAGES.projectsPhotos.loop.productDesign5}
          alt={`loop product design 5`}
        />
      </div>
    </section>
  );
};

export default ProductDesign;
