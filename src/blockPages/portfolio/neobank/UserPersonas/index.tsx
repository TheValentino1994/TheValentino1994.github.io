/* ------------------------------ Basic imports ----------------------------- */
import { FC } from "react";
import "./userPersonasStyles.scss";
import { IMAGES } from "../../../../constants/_images";
import SuspenseImage from "../../../../components/SuspenseImage";

const UserPersonas: FC = () => {
  /* --------------------------------- Render --------------------------------- */

  return (
    <section className="neobankUserPersonas">
      <div className="neobankUserPersonas__container">
        <h3 data-aos="fade-right">User Personas</h3>

        <SuspenseImage
          data-aos="zoom-out-up"
          src={IMAGES.projectsPhotos.neobank.userPersonas}
          alt="Neobank user personas"
        />
      </div>
    </section>
  );
};

export default UserPersonas;
