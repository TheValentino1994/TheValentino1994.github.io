/* ------------------------------ Basic imports ----------------------------- */
import { FC, useMemo } from "react";
import "./headerStyles.scss";
import { SOCIALS, SOCIALS_LIST } from "../../../contentData/_socialsList";
import { ICONS } from "../../../constants/_icons";
import { useHoverSpring } from "../../../hooks/useHoveSpring";

import { motion } from "framer-motion";
import { useHeaderAnimation } from "./useHeaderAnimation";

const AnimatedLink = ({ type, link, title }: (typeof SOCIALS_LIST)[0]) => {
  const { svgSize, marginLeft, handleHover } = useHoverSpring();

  const linkProps = useMemo(
    () =>
      type !== SOCIALS.EMAIL ? { target: "_blank", rel: "noreferrer" } : {},
    [type]
  );

  return (
    <motion.a
      onHoverStart={handleHover(12, 8)}
      onHoverEnd={handleHover(10, 4)}
      key={title}
      href={link}
      download={type === SOCIALS.CV}
      {...linkProps}
    >
      {title}
      <motion.div style={{ width: svgSize, height: svgSize, marginLeft }}>
        <ICONS.Utils.LinkIcon />
      </motion.div>
    </motion.a>
  );
};
const Header: FC = () => {
  /* ---------------------------------- Hooks --------------------------------- */
  const { y, ref } = useHeaderAnimation();

  /* --------------------------------- Render ------------------------------- */

  return (
    <motion.header ref={ref} style={{ y }} className="header">
      <div className="header__container">
        {SOCIALS_LIST.map((item) => (
          <AnimatedLink key={item.title} {...item} />
        ))}
      </div>
    </motion.header>
  );
};

export default Header;
