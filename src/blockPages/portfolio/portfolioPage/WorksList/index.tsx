/* ------------------------------ Basic imports ----------------------------- */
import React, { FC } from "react";
import "./worksListStyles.scss";

/* ------------------------------- Block pages ------------------------------ */
import WorkItem from "../WorkItem";

/* ------------------------------ Constant data ----------------------------- */
import { WORKS_LIST } from "../../../../conatantData/_worksList";

/* -------------------------------- Constants ------------------------------- */
import { ICONS } from "../../../../constants/_icons";

const WorkList: FC = () => {
  /* --------------------------------- Render ------------------------------- */

  return (
    <section className="worksList">
      <div className="worksList__container">
        <h2>
          The work I do,
          <br />
          and business I help.
        </h2>
        <ul>
          {WORKS_LIST.map((item) => (
            <WorkItem {...item} key={item.id} />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default WorkList;
