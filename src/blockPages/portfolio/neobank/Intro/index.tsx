/* ------------------------------ Basic imports ----------------------------- */
import { FC } from "react";
import "./introStyles.scss";
import { IMAGES } from "../../../../constants/_images";
import SuspenseImage from "../../../../components/SuspenseImage";

const Intro: FC = () => {
  /* --------------------------------- Render --------------------------------- */

  return (
    <section className="neobankIntro">
      <div className="neobankIntro__container">
        <div className="neobankIntro__row">
          <div data-aos="fade-right" className="neobankIntro__left">
            <h3>Neobank</h3>
            <p>Platform Mobile App</p>
            <p>Productivity 2023</p>
          </div>

          <h2 data-aos="fade-left" className="neobankIntro__right">
            The mobile experience required specific UX and UI thinking to allow
            for optimal productivity for users on the go. Prioritization of
            actions and reduction of functionality allowed for a focussed User
            Experience.
          </h2>
        </div>
      </div>

      <SuspenseImage
        data-aos="zoom-out-up"
        alt="Neobank"
        className="neobankIntro__demonstration"
        src={IMAGES.projectsPhotos.neobank.intro}
      />

      <div className="neobankIntro__container">
        <div className="neobankIntro__row">
          <div data-aos="fade-right" className="neobankIntro__left">
            <h3>My Contribution</h3>
            <div>
              <p>Research & Analysis</p>
              <p>Brainstorming & Ideation</p>
              <p>Wireframing & Visual Design</p>
              <p>Usability Testing & Iteration</p>
            </div>
          </div>

          <div
            data-aos="fade-left"
            className="neobankIntro__right neobankIntro__mainText"
          >
            <p>
              A Fintech mobile Neobank is a new type of digital bank that
              operates entirely online and through mobile applications.
            </p>

            <p>
              It may sound easy, but in reality, such a task is quite
              challenging because you need to focus only on the basics. So I
              tried to cope with this task and created a mobile application for
              our client - with a minimalistic dark green design.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Intro;
