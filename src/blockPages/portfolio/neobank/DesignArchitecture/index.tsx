/* ------------------------------ Basic imports ----------------------------- */
import { FC } from "react";
import "./designArchitectureStyles.scss";
import { IMAGES } from "../../../../constants/_images";

const DesignArchitecture: FC = () => {
  /* --------------------------------- Render --------------------------------- */

  return (
    <section className="neobankDesignArchitecture">
      <div className="neobankDesignArchitecture__container">
        <div className="neobankDesignArchitecture__row">
          <div className="neobankDesignArchitecture__left">
            <p>Information Architecture and UX Design</p>
          </div>

          <div className="neobankDesignArchitecture__right">
            <p>
              I refocused and prioritize the experience on what matters most -
              quickly triaging new work. Made strategic UX decisions to simplify
              the platform, adjust hierarchies, and accelerate tasks. By working
              holistically, we we able to improve usability across the board,
              improve contextual actions, and create a lively aesthetic to make
              work a pleasurable experience.
            </p>
          </div>
        </div>
        <img
          src={IMAGES.projectsPhotos.neobank.architectureDiagram}
          alt="Neobank design architecture diagram"
        />

        <img
          src={IMAGES.projectsPhotos.neobank.architectureIllustration}
          alt="Neobank design architecture illustration"
        />
      </div>
    </section>
  );
};

export default DesignArchitecture;