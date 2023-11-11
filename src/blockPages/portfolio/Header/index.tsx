/* ------------------------------ Basic imports ----------------------------- */
import { FC, useCallback } from "react";
import "./headerStyles.scss";
import { ICONS } from "../../../constants/_icons";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Header: FC = () => {
  const navigate = useNavigate();

  const rotate = useMotionValue(0);
  const scale = useMotionValue(1);

  const springRotate = useSpring(rotate, {
    stiffness: 600,
    damping: 15,
    mass: 1,
  });
  const springScale = useSpring(scale, {
    stiffness: 600,
    damping: 15,
    mass: 1,
  });

  const handleHover = useCallback(
    (rotateValue: number, scaleValue: number) => () => {
      rotate.set(rotateValue);
      scale.set(scaleValue);
    },
    []
  );

  const handleGoBack = () => navigate(-1);

  /* --------------------------------- Render ------------------------------- */

  return (
    <header data-aos="fade-down" className="portfolioHeader">
      <div className="portfolioHeader__container">
        <div>
          <h3>Valentyn Kuchernoha</h3>
          <p>UX/UI Designer</p>
        </div>

        <motion.button
          style={{ scale: springScale }}
          onHoverStart={handleHover(90, 1.05)}
          onHoverEnd={handleHover(0, 1)}
          onClick={handleGoBack}
        >
          <motion.div style={{ rotate: springRotate }}>
            <ICONS.Utils.CloseIcon />
          </motion.div>
        </motion.button>
      </div>
    </header>
  );
};

export default Header;
