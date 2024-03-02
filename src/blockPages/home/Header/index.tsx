/* ------------------------------ Basic imports ----------------------------- */
import { FC, useMemo } from "react";
import "./headerStyles.scss";
import { SOCIALS, SOCIALS_LIST } from "../../../contentData/_socialsList";

import { motion } from "framer-motion";
import { useHeaderAnimation } from "./useHeaderAnimation";
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

const Header: FC = () => {
  /* ---------------------------------- Hooks --------------------------------- */
  const { y, ref } = useHeaderAnimation();

  /* --------------------------------- Render ------------------------------- */

  return (
    <motion.header ref={ref} style={{ y }} className="header">
      <div className="header__container">
        {SOCIALS_LIST.map((item) => (
          <Link key={item.title} {...item} />
        ))}
      </div>
    </motion.header>
  );
};

export default Header;
