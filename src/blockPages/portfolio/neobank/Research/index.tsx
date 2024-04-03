/* ------------------------------ Basic imports ----------------------------- */
import { FC } from "react";
import "./researchStyles.scss";

const Research: FC = () => {
  /* --------------------------------- Render --------------------------------- */

  return (
    <section className="neobankResearch">
      <div className="neobankResearch__container">
        <div className="neobankResearch__row">
          <p data-aos="fade-right" className="neobankResearch__left">
            Research & Analysis
          </p>

          <div className="neobankResearch__right">
            <p data-aos="fade-left">
              User requirement meeting was scheduled as a part of the design
              process in order to understand the major problems and challenges
              faced by the admin users.
            </p>

            <p data-aos="fade-left">
              Interviews were conducted which helped to get personalized inputs,
              pain points and frustrations instead of generalized opinion.
            </p>

            <p data-aos="fade-left">
              Based on the data received from users, a personal user was
              developed to organize and find common problems and topics to form
              an idea.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Research;
