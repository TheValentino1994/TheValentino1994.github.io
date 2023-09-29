/* ------------------------------ Basic imports ----------------------------- */
import { FC } from "react";
import "./footerStyles.scss";

/* ------------------------------ Constant data ----------------------------- */
import { SOCIALS_LIST } from "../../../contentData/_socialsList";

const Footer: FC = () => {
  /* --------------------------------- Render --------------------------------- */

  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__info">
          <h3>Valentyn Kuchernoha</h3>
          <span>UX/UI Designer</span>
        </div>

        {SOCIALS_LIST.map((item) => (
          <a href={item.link} target="_blank" rel="no-referrer noreferrer">
            {item.title}
            <span>+</span>
          </a>
        ))}
      </div>

      <div className="footer__container">
        <div className="footer__info">
          <h3>Valentyn Kuchernoha</h3>
          <span>UX/UI Designer</span>
        </div>

        <span>&#169; 2023</span>
      </div>
    </footer>
  );
};

export default Footer;
