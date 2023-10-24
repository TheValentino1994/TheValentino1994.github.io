/* ------------------------------ Basic imports ----------------------------- */
import { FC } from "react";
import "./informationArchitectureStyles.scss";
import { IMAGES } from "../../../../constants/_images";

const InformationArchitecture: FC = () => {
  /* --------------------------------- Render --------------------------------- */

  return (
    <section className="loopInformationArchitecture">
      <div className="loopInformationArchitecture__container">
        <div className="loopInformationArchitecture__row">
          <p className="loopInformationArchitecture__left">
            Information Architecture and UX Design
          </p>

          <p className="loopInformationArchitecture__right loopInformationArchitecture__mainText">
            When I created the architecture, I refocused and prioritized what
            mattered most - quickly sorting new work. I made strategic UX
            decisions to simplify the platform, establish hierarchy, and speed
            up task completion. By working holistically, I was able to improve
            usability at all levels, enhance contextual actions, and create a
            lively aesthetic to make work fun.
          </p>
        </div>
      </div>

      <div className="loopInformationArchitecture__container">
        <img
          src={IMAGES.projectsPhotos.loop.informationArchitectureDiagram}
          alt="loop information architecture"
        />
      </div>
    </section>
  );
};

export default InformationArchitecture;
