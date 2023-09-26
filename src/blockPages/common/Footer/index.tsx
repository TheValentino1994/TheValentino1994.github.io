/* ------------------------------ Basic imports ----------------------------- */
import React, { FC, useCallback } from "react";
import "./footerStyles.scss";

/* ------------------------------ Constant data ----------------------------- */
import { SOCIALS_LIST } from "../../../conatantData/_socialsList";

/* -------------------------------- Constants ------------------------------- */
import { IMAGES } from "../../../constants/_images";

const Footer: FC = () => {
  /* --------------------------------- Render --------------------------------- */

  const renderSmallPlanets = useCallback(
    (count: number, planetType: 1 | 2) =>
      new Array(count)
        .fill(0)
        .map((item, index) => (
          <img
            className={`footer__planet${planetType}`}
            id={`Planet_${index + 1}`}
            key={index}
            src={
              planetType === 1
                ? IMAGES.Illustrations.Planet1
                : IMAGES.Illustrations.Planet2
            }
            alt={`Planet ${index}`}
          />
        )),
    []
  );

  const renderBigPlanets = useCallback(
    (count: number, planetType: 1 | 2) =>
      new Array(count).fill(0).map((item, index) => (
        <div
          key={index}
          className={`footer__planet planet${planetType}_big`}
          id={`Planet_big_${index + 1}`}
        >
          <img
            src={
              planetType === 1
                ? IMAGES.Illustrations.Planet1
                : IMAGES.Illustrations.Planet2
            }
            alt={`Planet ${index}`}
          />
          <img
            src={
              planetType === 1
                ? IMAGES.Illustrations.Astronaut1
                : IMAGES.Illustrations.Astronaut2
            }
            alt={`Astronaut ${index}`}
          />
        </div>
      )),
    []
  );

  return (
    <footer className="footer">
      {/* <div className="footer__container">
        <h2>Have an idea?</h2>
        <h3>Let’s discuss </h3>
        <div className="footer__socials"> */}
      {/* {SOCIALS_LIST.slice(0, SOCIALS_LIST.length - 1).map(
            ({ Icon, link, title }) => (
              <button key={title}>
                <a href={link}>
                  <Icon />
                </a>
              </button>
            )
          )} */}
      {/* </div>
      </div> */}
      {/* <div className="footer__illustration">
        {renderSmallPlanets(4, 2)}
        {renderSmallPlanets(3, 1)}
        {renderBigPlanets(1, 1)}
        {renderBigPlanets(1, 2)}
        <IMAGES.Illustrations.FooterWaves />
      </div> */}
    </footer>
  );
};

export default Footer;
