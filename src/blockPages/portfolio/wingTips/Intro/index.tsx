/* ------------------------------ Basic imports ----------------------------- */
import { FC } from "react";
import "./introStyles.scss";
import { IMAGES } from "../../../../constants/_images";
import { IphoneX } from "../../../../components";
import { VIDEOS } from "../../../../constants/_videos";
import SuspenseImage from "../../../../components/SuspenseImage";

const Intro: FC = () => {
  /* --------------------------------- Render --------------------------------- */

  return (
    <section className="wingTipzIntro">
      <div className="wingTipzIntro__container">
        <div className="wingTipzIntro__row">
          <div data-aos="fade-right" className="wingTipzIntro__left">
            <h3>Wingtipz</h3>
            <p>Mobile App</p>
            <p>Productivity 2022</p>
          </div>

          <h2 data-aos="fade-left" className="wingTipzIntro__right">
            An online application for finding lessons offering various sports in
            your city.
          </h2>
        </div>
      </div>

      <div data-aos="zoom-out-up" className="wingTipzIntro__demonstration">
        <IphoneX
          alt="WingTipz intro illustration"
          videoSrc={VIDEOS.wingTipz.uiProcess1}
        />

        <SuspenseImage
          alt="wingTipz"
          src={IMAGES.projectsPhotos.wingTipz.intro1}
        />
      </div>

      <div className="wingTipzIntro__container">
        <div className="wingTipzIntro__row">
          <div data-aos="fade-right" className="wingTipzIntro__left">
            <h3>My Contribution</h3>
            <div>
              <p>Research</p>
              <p>UX / UI Design</p>
            </div>
          </div>

          <div
            data-aos="fade-left"
            className="wingTipzIntro__right wingTipzIntro__mainText"
          >
            <p>
              The service was launched in 2022. This is the MVP version to check
              if there is demand in the market.
            </p>

            <p>
              After the first users and instructors appeared on the platform,
              the highly appreciated the interaction with users and the quality
              of applications in general.
            </p>

            <p>
              So I started working with the team to improve the UX, visual
              design, and prepare the service for its upcoming growth.
            </p>
          </div>
        </div>
      </div>

      <SuspenseImage
        data-aos="zoom-out-up"
        alt="wingTipz intro"
        className="wingTipzIntro__demonstration"
        src={IMAGES.projectsPhotos.wingTipz.intro2}
      />
    </section>
  );
};

export default Intro;
