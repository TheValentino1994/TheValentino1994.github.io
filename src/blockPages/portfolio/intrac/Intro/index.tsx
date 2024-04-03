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
            <p>Platform Web & Responsive </p>
            <p>Productivity 2023</p>
          </div>

          <h2 data-aos="fade-left" className="intracIntro__right">
            Intrac is a comprehensive platform designed to streamline empoyee
            management with a wide range of features.
          </h2>
        </div>
      </div>

      <SuspenseImage
        data-aos="zoom-out-up"
        alt="intrac intro"
        className="intracIntro__demonstration"
        src={IMAGES.projectsPhotos.intrac.intro}
      />

      <div className="intracIntro__container">
        <div className="intracIntro__row">
          <div data-aos="fade-right" className="intracIntro__left">
            <h3>My Contribution</h3>
            <div>
              <p>Research & Analysis</p>
              <p>Redesign</p>
              <p>Wireframing & Visual Design</p>
              <p>Design System</p>
            </div>
          </div>

          <div
            data-aos="fade-left"
            className="intracIntro__right intracIntro__mainText"
          >
            <p>
              A Intac is a web-based platform that works entirely online and via
              mobile phone.
            </p>

            <p>
              With a rather complex and extensive functionality, the platform
              helps to keep track of students' and teachers' schedules, as well
              as various types of documentation and reporting.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Intro;
