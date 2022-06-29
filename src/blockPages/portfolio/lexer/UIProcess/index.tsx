/* ------------------------------ Basic imports ----------------------------- */
import React, { FC } from "react";
import "./uiProcessStyles.scss";

/* ------------------------------- Components ------------------------------- */
import { IphoneX } from "../../../../components";

/* -------------------------------- Constants ------------------------------- */
import { IMAGES } from "../../../../constants/_images";

/* ---------------------------------- Hooks --------------------------------- */
import { useSlides } from "../../../../hooks/useSlides";

const UiProcess: FC = () => {
  const { slideToShow, runSlides } = useSlides(3, 6400, true);

  /* --------------------------------- Render --------------------------------- */

  return (
    <div className="lexerUiProcess">
      <div className="lexerUiProcess__container">
        <div className="lexerUiProcess__demonstration">
          {IMAGES.projectsPhotos.lexer.slides2.map((item, index) => (
            <IphoneX
              key={index}
              onAnimationIteration={runSlides}
              alt={`Lexer UI process ${index}`}
              screenshotSrc={item[slideToShow]}
            />
          ))}
        </div>

        <div className="lexerUiProcess__row">
          <div className="lexerUiProcess__left">
            <div>
              <h3>UI Process</h3>
              <p>Live product realization stage</p>
            </div>
          </div>

          <div className="lexerUiProcess__right lexerUiProcess__mainText">
            <h2>
              The final results of the design made a very complex and very
              light, comfortable and affordable product.
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UiProcess;
