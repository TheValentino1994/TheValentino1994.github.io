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
          <p className="loopProductDesign__left">The ProductDesign</p>

          <p className="loopProductDesign__right">
            To find and redesign create a platform for schools and other
            non-profit organisations to help them manage inner process
          </p>
        </div>
      </div>

      <div className="loopProductDesign__container">
        {/* {IMAGES.projectsPhotos.loop.ProductDesign.map((item, index) => (
          <img key={index} src={item} alt={`loop ProductDesign ${index}`} />
        ))} */}
      </div>
    </section>
  );
};

export default ProductDesign;
