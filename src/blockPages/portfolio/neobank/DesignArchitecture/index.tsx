/* ------------------------------ Basic imports ----------------------------- */
import { FC } from "react";
import "./designArchitectureStyles.scss";
import { IMAGES } from "../../../../constants/_images";
import SuspenseImage from "../../../../components/SuspenseImage";

const DesignArchitecture: FC = () => {
  /* --------------------------------- Render --------------------------------- */

  return (
    <section className="neobankDesignArchitecture">
      <div className="neobankDesignArchitecture__container">
        <SuspenseImage
          data-aos="zoom-out-up"
          src={IMAGES.projectsPhotos.neobank.architectureDiagram}
          alt="Neobank design architecture diagram"
        />

        <div className="neobankDesignArchitecture__row">
          <p data-aos="fade-right" className="neobankDesignArchitecture__left">
            Wireframing initial solution
          </p>

          <p data-aos="fade-left" className="neobankDesignArchitecture__right">
            The strategic decision to leverage a design system proved
            instrumental in achieving efficiency and consistency throughout the
            design process also capitalized on a pre-established set of reusable
            components, patterns, and guidelines.
          </p>
        </div>
      </div>

      <div className="neobankDesignArchitecture__container">
        <SuspenseImage
          data-aos="zoom-out-up"
          src={IMAGES.projectsPhotos.neobank.architectureIllustration}
          alt="Neobank design architecture illustration"
        />
      </div>
    </section>
  );
};

export default DesignArchitecture;
