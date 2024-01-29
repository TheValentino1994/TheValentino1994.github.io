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
        <div className="neobankDesignArchitecture__row">
          <p data-aos="fade-right" className="neobankDesignArchitecture__left">
            Information Architecture and UX Design
          </p>

          <p data-aos="fade-left" className="neobankDesignArchitecture__right">
            I refocused and prioritize the experience on what matters most -
            quickly triaging new work. Made strategic UX decisions to simplify
            the platform, adjust hierarchies, and accelerate tasks. By working
            holistically, we we able to improve usability across the board,
            improve contextual actions, and create a lively aesthetic to make
            work a pleasurable experience.
          </p>
        </div>
        <SuspenseImage
          data-aos="zoom-out-up"
          src={IMAGES.projectsPhotos.neobank.architectureDiagram}
          alt="Neobank design architecture diagram"
        />
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
