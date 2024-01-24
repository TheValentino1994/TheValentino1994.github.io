/* ------------------------------ Basic imports ----------------------------- */
import { FC, useMemo } from "react";
import "./footerStyles.scss";

/* ------------------------------ Constant data ----------------------------- */
import { SOCIALS_LIST } from "../../../contentData/_socialsList";
import { useMediaQuery } from "../../../hooks/useMediaQuery";

const Footer: FC = () => {
  const isResponsive = useMediaQuery("(max-width: 1024px)");

  const animationProps = useMemo(() => {
    if (isResponsive) {
      return {};
    }

    return {
      "data-aos": "fade-up",
      "data-aos-offset": 0,
    };
  }, [isResponsive]);

  /* --------------------------------- Render --------------------------------- */

  return (
    <footer className="footer" {...animationProps}>
      <div className="footer__container">
        <div className="footer__info">
          <h3>Valentyn Kuchernoha</h3>
          <span>UX/UI Designer</span>
        </div>

        {SOCIALS_LIST.map((item) => (
          <a key={item.title} href={item.link} target="_blank" rel="noreferrer">
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
