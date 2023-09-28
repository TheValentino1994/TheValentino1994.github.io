/* ------------------------------ Basic imports ----------------------------- */
import React, { FC } from "react";
import "./worksListStyles.scss";

/* ------------------------------- Block pages ------------------------------ */
import WorkItem from "../WorkItem";

/* ------------------------------ Constant data ----------------------------- */
import { WORKS_LIST } from "../../../contentData/_worksList";

const WorkList: FC = () => {
  /* --------------------------------- Render ------------------------------- */

  return (
    <section className="worksList">
      <ul>
        {WORKS_LIST.map((item) => (
          <WorkItem {...item} key={item.path} />
        ))}
      </ul>
    </section>
  );
};

export default WorkList;
