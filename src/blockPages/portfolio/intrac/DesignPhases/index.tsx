/* ------------------------------ Basic imports ----------------------------- */
import { FC } from "react";
import "./designPhasesStyles.scss";
import { IMAGES } from "../../../../constants/_images";

const PHASES = [
  {
    title: "Discovery",
    description:
      "The discovery phase defines the project scope and establishes project goals and objectives. During this phase, research is conducted",
  },
  {
    title: "Design",
    description:
      "At this stage, wireframes, prototypes, and visual designs are created to communicate the solution to stakeholders. ",
  },
  {
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
        <h3>Design phases</h3>

        <div className="neobankDesignPhases__phases">
          {PHASES.map((item) => (
            <div key={item.title}>
              <h4>{item.title}</h4>
              <p>{item.description}</p>
            </div>
          ))}
        </div>

        <div className="neobankDesignPhases__diagram">
          <div className="neobankDesignPhases__diagramHeader">
            <div>UX Design Process</div>
            <div>UI Design</div>
          </div>

          <IMAGES.projectsPhotos.neobank.Neobank_designPhases />
        </div>
      </div>
    </section>
  );
};

export default DesignPhases;
