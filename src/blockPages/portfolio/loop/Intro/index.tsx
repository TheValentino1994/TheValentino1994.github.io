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
          <div data-aos="fade-right" className="loopIntro__left">
            <h3>Loop</h3>
            <p>Web & Responsive Design</p>
            <p>Productivity 2022</p>
          </div>

          <h2 data-aos="fade-left" className="loopIntro__right">
            A centralized productivity platform that allows Users to connect all
            tools in one place to streamline workflow and maximize output.
          </h2>
        </div>
      </div>

      <img
        data-aos="zoom-out-up"
        alt="loop"
        className="loopIntro__demonstration"
        src={IMAGES.projectsPhotos.loop.intro1}
      />

      <div className="loopIntro__container">
        <div className="loopIntro__row">
          <div data-aos="fade-right" className="loopIntro__left">
            <h3>My Contribution</h3>
            <div>
              <p>Research</p>
              <p>UX Audit</p>
              <p>Tablet Design</p>
              <p>Product Design</p>
              <p>Interaction Design</p>
              <p>Design System</p>
            </div>
          </div>

          <div
            data-aos="fade-left"
            className="loopIntro__right loopIntro__mainText"
          >
            <p>
              As the second designer on the Loop product, my role was to focus
              on the immediate needs of the users in sessions, ease of
              integration, adaptation, and intuitive user flows.
            </p>

            <p>
              I packed a huge amount of functionality and data into the user
              interface without overwhelming the user experience. Design is
              highly functional, streamlined, intuitive, responsive, and
              beautiful.
            </p>
          </div>
        </div>
      </div>

      <div data-aos="zoom-out-up" className="loopIntro__container">
        <img
          alt="loop"
          className="loopIntro__demonstration"
          src={IMAGES.projectsPhotos.loop.intro2}
        />
      </div>
    </section>
  );
};

export default Intro;
