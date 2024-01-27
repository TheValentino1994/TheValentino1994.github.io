/* ------------------------------ Basic imports ----------------------------- */
import { FC } from "react";
import "./introStyles.scss";
import { IMAGES } from "../../../../constants/_images";
import SuspenseImage from "../../../../components/SuspenseImage";

const Intro: FC = () => {
  /* --------------------------------- Render --------------------------------- */

  return (
    <section className="intracIntro">
      <div className="intracIntro__container">
        <div className="intracIntro__row">
          <div data-aos="fade-right" className="intracIntro__left">
            <h3>Intrac</h3>
            <p>Productivity 2023</p>
          </div>

          <h2 data-aos="fade-left" className="intracIntro__right">
            Employee management for non-profit organisations
          </h2>
        </div>
      </div>

      <SuspenseImage
        data-aos="zoom-out-up"
        alt="intrac"
        className="intracIntro__demonstration"
        src={IMAGES.projectsPhotos.intrac.intro}
      />

      <div className="intracIntro__container">
        <div className="intracIntro__row">
          <div data-aos="fade-right" className="intracIntro__left">
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

          <div
            data-aos="fade-left"
            className="intracIntro__right intracIntro__mainText"
          >
            <p>
              Intrac is a comprehensive platform designed to streamline empoyee
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
