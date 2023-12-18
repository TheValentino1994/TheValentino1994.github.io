/* ------------------------------ Basic imports ----------------------------- */
import { FC, useCallback } from "react";
import "./uiProcessStyles.scss";
import { IphoneX } from "../../../../components";
import { VIDEOS } from "../../../../constants/_videos";

const UIProcess: FC = () => {
  /* -------------------------------- Handlers -------------------------------- */

  const handleVideoEnd = useCallback(
    (videoToStart: string) => () => {
      //@ts-ignore
      document.querySelector(`#${videoToStart}`)?.play?.();
    },
    []
  );

  /* --------------------------------- Render --------------------------------- */

  return (
    <section className="wingTipzUIProcess">
      <div className="wingTipzUIProcess__container">
        <div className="wingTipzUIProcess__row">
          <p data-aos="fade-right" className="wingTipzUIProcess__left">
            UI Process
          </p>

          <div data-aos="fade-left" className="wingTipzUIProcess__right">
            <p>
              Working closely with the team and taking into account customer
              feedback, we have created a greatly improved participation
              experience for all users.
            </p>

            <p>
              For users, I have simplified the user flow and made it more
              linear. In this way, I have achieved much better acceptance and
              understanding in general for new users.
            </p>

            <p>
              And for coaches, I created new ways to turn their phones into
              full-fledged workstations. These new tools make the online booking
              experience one and the most holistic.
            </p>
          </div>
        </div>
      </div>

      <div className="wingTipzUIProcess__container wingTipzUIProcess__demonstrationContainer">
        <div data-aos="fade-right" className="wingTipzUIProcess__demonstration">
          <IphoneX
            videoProps={{
              id: "wingTipzUi1",
              loop: false,
              onEnded: handleVideoEnd("wingTipzUi2"),
            }}
            alt="WingTipz ui process illustration"
            videoSrc={VIDEOS.wingTipz.uiProcess2}
          />
        </div>

        <div data-aos="fade-left" className="wingTipzUIProcess__demonstration">
          <IphoneX
            videoProps={{
              id: "wingTipzUi2",
              loop: false,
              autoPlay: false,
              onEnded: handleVideoEnd("wingTipzUi1"),
            }}
            alt="WingTipz ui illustration"
            videoSrc={VIDEOS.wingTipz.challenges1}
          />
        </div>
      </div>
    </section>
  );
};

export default UIProcess;
