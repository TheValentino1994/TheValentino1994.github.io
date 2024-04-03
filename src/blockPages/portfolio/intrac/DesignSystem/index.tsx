/* ------------------------------ Basic imports ----------------------------- */
import { FC } from "react";
import "./designSystemStyles.scss";
import { IMAGES } from "../../../../constants/_images";
import SuspenseImage from "../../../../components/SuspenseImage";

const DesignSystem: FC = () => {
  /* --------------------------------- Render --------------------------------- */

  return (
    <section className="intracDesignSystem">
      <div className="intracDesignSystem__container">
        <div className="intracDesignSystem__row">
          <p data-aos="fade-right" className="intracDesignSystem__left">
            Design system
          </p>

          <p data-aos="fade-left" className="intracDesignSystem__right">
            When I work on massive projects like this design system and holistic
            documentation is a very important pieces of the puzzle. I created
            and maintained one design language that unites making it easy for
            every user to move without feeling lost or disoriented.
          </p>
        </div>
      </div>

      <div className="intracDesignSystem__container">
        {IMAGES.projectsPhotos.intrac.designSystem.map((item, index) => (
          <SuspenseImage
            data-aos="zoom-out-up"
            key={index}
            src={item}
            alt={`intrac DesignSystem ${index}`}
          />
        ))}
      </div>
    </section>
  );
};

export default DesignSystem;
