/* ------------------------------ Basic imports ----------------------------- */
import { FC } from "react";
import "./designPhasesStyles.scss";
import { IMAGES } from "../../../../constants/_images";

const PHASES = [
  {
    animation: "fade-right",
    title: "Discovery",
    description:
      "The discovery phase defines the project scope and establishes project goals and objectives. During this phase, research is conducted",
  },
  {
    animation: "fade-up",
    title: "Design",
    description:
      "At this stage, wireframes, prototypes, and visual designs are created to communicate the solution to stakeholders. ",
  },
  {
    animation: "fade-left",
    title: "Delivery",
    description:
      "Regular meetings should be held at each stage to ensure that the project is on track, stakeholders are kept informed.",
  },
];

const DesignPhases: FC = () => {
  /* --------------------------------- Render --------------------------------- */

  return (
    <section className="neobankDesignPhases">
      <div className="neobankDesignPhases__container">
        <h3 data-aos="fade-right">Design phases</h3>

        <div className="neobankDesignPhases__phases">
          {PHASES.map((item) => (
            <div data-aos={item.animation} key={item.title}>
              <h4>{item.title}</h4>
              <p>{item.description}</p>
            </div>
          ))}
        </div>

        <div className="neobankDesignPhases__diagram">
          <div className="neobankDesignPhases__diagramHeader">
            <div data-aos="fade-right">UX Design Process</div>
            <div data-aos="fade-left">UI Design</div>
          </div>

          <div className="neobankDesignPhases__diagramImage" data-aos="fade-up">
            <IMAGES.projectsPhotos.neobank.Neobank_designPhases />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DesignPhases;
