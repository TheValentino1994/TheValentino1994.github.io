/* ------------------------------ Basic imports ----------------------------- */
import { FC } from "react";
import "./animatedLinkStyles.scss";

import { motion } from "framer-motion";
import { SOCIALS_LIST } from "../../contentData/_socialsList";
import { useHoverSpring } from "../../hooks/useHoveSpring";
import { ICONS } from "../../constants/_icons";

type AnimatedLinkProps = Partial<(typeof SOCIALS_LIST)[0]>;

const AnimatedLink: FC<AnimatedLinkProps> = ({
  type,
  title,
  link,
  ...linkProps
}) => {
  const { svgSize, marginLeft, ref, width, handleHover } = useHoverSpring();

  return (
    <motion.a
      {...linkProps}
      className="animatedLink"
      href={link}
      onHoverStart={handleHover(12, 8)}
      onHoverEnd={handleHover(10, 4, true)}
    >
      <span ref={ref}>{title}</span>

      <motion.div style={{ width }} id="line" />
      <motion.div style={{ width: svgSize, height: svgSize, marginLeft }}>
        <ICONS.Utils.LinkIcon />
      </motion.div>
    </motion.a>
  );
};

export default AnimatedLink;
