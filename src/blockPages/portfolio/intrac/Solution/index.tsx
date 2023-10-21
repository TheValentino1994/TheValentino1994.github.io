/* ------------------------------ Basic imports ----------------------------- */
import { FC } from "react";
import "./solutionStyles.scss";
import { IMAGES } from "../../../../constants/_images";

const Solution: FC = () => {
  /* --------------------------------- Render --------------------------------- */

  return (
    <section className="intracSolution">
      <div className="intracSolution__container">
        <div className="intracSolution__row">
          <p className="intracSolution__left">The Solution</p>

          <p className="intracSolution__right">
            To find and redesign create a platform for schools and other
            non-profit organisations to help them manage inner process
          </p>
        </div>
      </div>

      <div className="intracSolution__container">
        {IMAGES.projectsPhotos.intrac.solution.map((item, index) => (
          <img key={index} src={item} alt={`intrac solution ${index}`} />
        ))}
      </div>
    </section>
  );
};

export default Solution;
