/* ------------------------------ Basic imports ----------------------------- */
import React, { FC } from "react";
import "./designSystemStyles.scss";

/* -------------------------------- Constants ------------------------------- */
import { IMAGES } from "../../../../constants/_images";

const DesignSystem: FC = () => {
  /* --------------------------------- Render --------------------------------- */

  return (
    <div className="lexerDesignSystem">
      <div className="lexerDesignSystem__container">
        <div className="lexerDesignSystem__demonstration">
          <img
            src={IMAGES.projectsPhotos.lexer.designSystem}
            alt="Lexer design system"
          />
        </div>

        <div className="lexerDesignSystem__row">
          <div className="lexerDesignSystem__left">
            <h3>Design System</h3>
          </div>

          <div className="lexerDesignSystem__right lexerDesignSystem__mainText">
            <p>
              A robust design system and extensive documentation are the keys to
              successful collaboration and consistency in design and
              development. The use of design tokens, automatic layout,
              variations, and interactive components gives us the ability to
              iterate quickly and keep the product ecosystem consistent.
            </p>

            <p>
              At the same time, keeping all the functions of the mobile
              application
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignSystem;
