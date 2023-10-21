/* ------------------------------ Basic imports ----------------------------- */
import { FC } from "react";
import "./designArchitectureStyles.scss";
import { IMAGES } from "../../../../constants/_images";

const DesignArchitecture: FC = () => {
  /* --------------------------------- Render --------------------------------- */

  return (
    <section className="intracDesignArchitecture">
      <div className="intracDesignArchitecture__container">
        <img
          src={IMAGES.projectsPhotos.intrac.architectureDiagram}
          alt="intrac design architecture diagram"
        />
      </div>
    </section>
  );
};

export default DesignArchitecture;
