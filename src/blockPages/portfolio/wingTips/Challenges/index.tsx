/* ------------------------------ Basic imports ----------------------------- */
import { FC } from "react";
import "./challengesStyles.scss";
import { IMAGES } from "../../../../constants/_images";

const Challenges: FC = () => {
  /* --------------------------------- Render --------------------------------- */

  return (
    <section className="wingTipzChallenges">
      <div className="wingTipzChallenges__container">
        <div className="wingTipzChallenges__row">
          <p data-aos="fade-right" className="wingTipzChallenges__left">
            Challenges
          </p>

          <div data-aos="fade-left" className="wingTipzChallenges__right">
            <p>
              The most used and important part of the user journey is to find
              the right coach and sign up for a lesson. To improve it, I've
              simplified the user experience for finding instructors by
              developing a more powerful search and adding the ability to filter
              trainers by various parameters.
            </p>

            <p>
              At the same time, completely rethinking the design of instructor
              profiles - improved data visualization, a clear order of
              information priority, a new visual design.
            </p>

            <p>
              My main goal was to design these streams in such a way that they
              fit with other features and use the same components and
              interactions.
            </p>
          </div>
        </div>
      </div>

      <img
        className="wingTipzChallenges__demonstration"
        data-aos="zoom-out-up"
        src={IMAGES.projectsPhotos.wingTipz.challenges}
        alt={`wingTipz Challenges`}
      />
    </section>
  );
};

export default Challenges;
