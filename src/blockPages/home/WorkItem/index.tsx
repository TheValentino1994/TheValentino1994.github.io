/* ------------------------------ Basic imports ----------------------------- */
import React, { FC } from "react";
import "./workItemStyles.scss";

/* -------------------------------- Libraries ------------------------------- */
import { Link } from "react-router-dom";

/* ---------------------------------- Types --------------------------------- */
import { WorkItem as IWorkItem } from "../../../contentData/_worksList";

/* -------------------------------- Constants ------------------------------- */
import { ICONS } from "../../../constants/_icons";

const WorkItem: FC<IWorkItem> = ({
  previewImage,
  title,
  subtitle,
  description,
  timeline,
  path,
}) => {
  /* --------------------------------- Render ------------------------------- */

  return (
    <li className="workItem card">
      <div className="workItem__content">
        <div>
          <h3>{title}</h3>
          <h4>{subtitle}</h4>

          <p>{description}</p>

          <Link to={path}>
            Case Study
            <ICONS.Utils.LinkIcon />
          </Link>
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
