/* ------------------------------ Basic imports ----------------------------- */
import { FC } from "react";
import "./challengeStyles.scss";

const Challenge: FC = () => {
  /* --------------------------------- Render --------------------------------- */

  return (
    <section className="intracChallenge">
      <div className="intracChallenge__container">
        <div className="intracChallenge__row">
          <p data-aos="fade-right" className="intracChallenge__left">
            Challenge
          </p>

          <p data-aos="fade-left" className="intracChallenge__right">
            The challenge was to redesign and create a user-friendly and
            visually appealing interface that would enhance productivity, data
            navigation efficiency, and maintain design consistency
          </p>
        </div>
      </div>
    </section>
  );
};

export default Challenge;
