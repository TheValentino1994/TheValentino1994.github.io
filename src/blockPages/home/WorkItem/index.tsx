/* ------------------------------ Basic imports ----------------------------- */
import { FC } from "react";
import "./workItemStyles.scss";

/* -------------------------------- Libraries ------------------------------- */
import { Link } from "react-router-dom";

/* ---------------------------------- Types --------------------------------- */
import { WorkItem as IWorkItem } from "../../../contentData/_worksList";
import { motion } from "framer-motion";

/* -------------------------------- Constants ------------------------------- */
import { ICONS } from "../../../constants/_icons";
import { useHoverSpring } from "../../../hooks/useHoveSpring";

const WorkItem: FC<IWorkItem> = ({
  previewImage,
  title,
  subtitle,
  description,
  timeline,
  path,
}) => {
  const { svgSize, marginLeft, handleHover } = useHoverSpring();

  /* --------------------------------- Render ------------------------------- */

  return (
    <li className="workItem card">
      <div className="workItem__content">
        <div>
          <h3>{title}</h3>
          <h4>{subtitle}</h4>

          <p>{description}</p>

          <motion.div
            onHoverStart={handleHover(12, 8)}
            onHoverEnd={handleHover(10, 4)}
          >
            <Link to={path}>
              Case Study
              <motion.div
                style={{ width: svgSize, height: svgSize, marginLeft }}
              >
                <ICONS.Utils.LinkIcon />
              </motion.div>
            </Link>
          </motion.div>
        </div>

        <img alt={`${title} ${subtitle}`} src={previewImage} />
      </div>

      <div className="workItem__timeline">
        <span>Establishment</span>
        <span>{timeline}</span>
      </div>
    </li>
  );
};

export default WorkItem;
