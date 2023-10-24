/* ------------------------------ Basic imports ----------------------------- */
import { FC } from "react";
import "./informationArchitectureStyles.scss";
import { IMAGES } from "../../../../constants/_images";

const InformationArchitecture: FC = () => {
  /* --------------------------------- Render --------------------------------- */

  return (
    <section className="loopInformationArchitecture">
      <div className="loopInformationArchitecture__container">
        {/* <img
          src={IMAGES.projectsPhotos.loop.architectureDiagram}
          alt="loop Information architecture diagram"
        /> */}
      </div>
    </section>
  );
};

export default InformationArchitecture;
