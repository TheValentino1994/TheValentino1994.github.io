/* ------------------------------ Basic imports ----------------------------- */
import { FC } from "react";
import "./introStyles.scss";
import { IMAGES } from "../../../../constants/_images";

const Intro: FC = () => {
  /* --------------------------------- Render --------------------------------- */

  return (
    <section className="loopIntro">
      <div className="loopIntro__container">
        <div className="loopIntro__row">
          <div className="loopIntro__left">
            <h3>loop</h3>
            <p>Productivity 2023</p>
          </div>

          <h2 className="loopIntro__right">
            Employee management for non-profit organisations
          </h2>
        </div>
      </div>

      {/* <img
        alt="loop"
        className="loopIntro__demonstration"
        src={IMAGES.projectsPhotos.loop.intro}
      /> */}

      <div className="loopIntro__container">
        <div className="loopIntro__row">
          <div className="loopIntro__left">
            <h3>My Contribution</h3>
            <div>
              <p>Research</p>
              <p>UX / UI Design</p>
              <p>Tablet Design</p>
              <p>Responsive Design</p>
              <p>Interaction Design</p>
              <p>Design System</p>
            </div>
          </div>

          <div className="loopIntro__right loopIntro__mainText">
            <p>
              loop is a comprehensive platform designed to streamline empoyee
              management with a wide range of features.
            </p>

            <p>
              The main challenge was to design a platform that simplify
              perception of complicated interfaces. Help users to make a
              decision by involving users to the entire context. Provide
              different types of management for organizations depending on their
              size and industry
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Intro;
