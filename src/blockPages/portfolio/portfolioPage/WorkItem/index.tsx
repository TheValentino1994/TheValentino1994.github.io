/* ------------------------------ Basic imports ----------------------------- */
import React, { FC } from "react";
import "./workItemStyles.scss";

/* -------------------------------- Libraries ------------------------------- */
import { Link } from "react-router-dom";

/* ---------------------------------- Types --------------------------------- */
import { WorkItemDto } from "../../../../conatantData/_worksList";

/* -------------------------------- Constants ------------------------------- */
import { ICONS } from "../../../../constants/_icons";

const WorkItem: FC<WorkItemDto> = ({
  previewImage,
  title,
  subtitle,
  path,
  id,
}) => {
  /* --------------------------------- Render ------------------------------- */

  return (
    <li className="workItem">
      <Link to={path}>
        <div className="workItem__imgContainer">
          <img src={previewImage} alt={id} />
          <div className="workItem__viewCase">
            <p>View Case Study</p>
            <ICONS.Utils.ArrowIcon />
          </div>
        </div>

        <h4>{title}</h4>

        <p>{subtitle}</p>
      </Link>
    </li>
  );
};

export default WorkItem;
