/* ------------------------------ Basic imports ----------------------------- */
import { FC } from "react";
import "./headerStyles.scss";
import { SOCIALS_LIST } from "../../../contentData/_socialsList";
import { ICONS } from "../../../constants/_icons";
import { useHoverSpring } from "../../../hooks/useHoveSpring";

import { motion } from "framer-motion";

const AnimatedLink = ({ ...item }: (typeof SOCIALS_LIST)[0]) => {
  const { svgSize, marginLeft, handleHover } = useHoverSpring();

  return (
    <motion.a
      onHoverStart={handleHover(12, 8)}
      onHoverEnd={handleHover(10, 4)}
      key={item.title}
      href={item.link}
      target="_blank"
      rel="noreferrer"
    >
      {item.title}
      <motion.div style={{ width: svgSize, height: svgSize, marginLeft }}>
        <ICONS.Utils.LinkIcon />
      </motion.div>
    </motion.a>
  );
};
const Header: FC = () => {
  /* --------------------------------- Render ------------------------------- */

  return (
    <header className="header">
      <div className="header__container">
        {SOCIALS_LIST.map((item) => (
          <AnimatedLink key={item.title} {...item} />
        ))}
      </div>
    </header>
  );
};

export default Header;
