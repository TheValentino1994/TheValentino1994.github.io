/* ------------------------------ Basic imports ----------------------------- */
import React, { FC } from "react";
import "./introStyles.scss";

/* -------------------------------- Constants ------------------------------- */
import { IMAGES } from "../../../constants/_images";

const Intro: FC = () => {
  /* --------------------------------- Render --------------------------------- */

  return (
    <section className="homeIntro">
      <div className="homeIntro__container">
        <h3>UX/UI Designer</h3>
        <h2>
          Hey I'm Valentyn! I build digital products, brands <br /> and
          experience
        </h2>
        <button>
          <a
            href={`${window.location.origin}/Valentyn_Kuchernoha_CV.pdf`}
            download
          >
            Download CV
          </a>
        </button>

        <div className="homeIntro__mouse">
          <div></div>
        </div>
      </div>
      <div className="homeIntro__illustration">
        <IMAGES.Illustrations.HomeIntroBigLava />
      </div>
      <div className="homeIntro__illustration">
        <IMAGES.Illustrations.HomeIntroSmallLava />
      </div>
      <div className="homeIntro__illustration">
        <IMAGES.Illustrations.HomeIntroWave />
      </div>
    </section>
  );
};

export default Intro;
