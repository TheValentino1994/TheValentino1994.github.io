/* ------------------------------ Basic imports ----------------------------- */
import { FC } from "react";
import "./designArchitectureStyles.scss";
import { IMAGES } from "../../../../constants/_images";
import SuspenseImage from "../../../../components/SuspenseImage";

const DesignArchitecture: FC = () => {
  /* --------------------------------- Render --------------------------------- */

  return (
    <section className="intracDesignArchitecture">
      <div className="intracDesignArchitecture__container">
        <SuspenseImage
          data-aos="zoom-out-up"
          src={IMAGES.projectsPhotos.intrac.architectureDiagram}
          alt="intrac design architecture diagram"
        />
      </div>
    </section>
  );
};

export default DesignArchitecture;
