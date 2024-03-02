/* ------------------------------ Basic imports ----------------------------- */
import { FC, useMemo } from "react";
import "./footerStyles.scss";

/* ------------------------------ Constant data ----------------------------- */
import { SOCIALS, SOCIALS_LIST } from "../../../contentData/_socialsList";
import { useMediaQuery } from "../../../hooks/useMediaQuery";
import AnimatedLink from "../../../components/AnimatedLink";

export const Link = ({ type, ...props }: (typeof SOCIALS_LIST)[0]) => {
  const linkProps = useMemo(
    () =>
      type !== SOCIALS.EMAIL
        ? { target: "_blank", rel: "noreferrer", ...props }
        : { ...props },
    [type, props]
  );

  return <AnimatedLink {...linkProps} />;
};

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
          <Link key={item.title} {...item} />
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
