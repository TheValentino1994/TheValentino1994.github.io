/* ------------------------------ Basic imports ----------------------------- */
import { FC } from "react";
import "./introStyles.scss";
import { IMAGES } from "../../../../constants/_images";

const Intro: FC = () => {
  /* --------------------------------- Render --------------------------------- */

  return (
    <section className="neobankIntro">
      <div className="neobankIntro__container">
        <div className="neobankIntro__row">
          <div className="neobankIntro__left">
            <h3>Neobank</h3>
            <p>Cryptocurrency / iOS · Android · </p>
          </div>

          <h2 className="neobankIntro__right">
            Neobanks are new-age banks without any physical location, present
            entirely online. They provide digital, mobile-first financial
            solutions for payments, money transfers, lending, and more.
          </h2>
        </div>
      </div>

      <img
        alt="Neobank"
        className="neobankIntro__demonstration"
        src={IMAGES.projectsPhotos.neobank.intro}
      />

      <div className="neobankIntro__container">
        <div className="neobankIntro__row">
          <div className="neobankIntro__left">
            <h3>My Contribution</h3>
            <div>
              <p>UX Audit</p>
              <p>UX / UI Design</p>
              <p>Research</p>
            </div>
          </div>

          <div className="neobankIntro__right neobankIntro__mainText">
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
