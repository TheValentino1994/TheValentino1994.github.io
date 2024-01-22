/* ------------------------------ Basic imports ----------------------------- */
import { FC } from "react";
import "./worksListStyles.scss";

/* ------------------------------- Block pages ------------------------------ */
import WorkItem from "../WorkItem";

/* ------------------------------ Constant data ----------------------------- */
import { WORKS_LIST } from "../../../contentData/_worksList";
import { useScroll } from "framer-motion";

/* -------------------------------- Libraries ------------------------------- */

const WorksList: FC = () => {
  const { scrollY } = useScroll();

  /* --------------------------------- Render ------------------------------- */

  return (
    <section className="worksList">
      <ul className="worksList__container">
        {WORKS_LIST.map((item, index, array) => {
          const isLast = index + 1 === array.length;
          const params = { ...item, scrollY, isLast };

          return <WorkItem {...params} key={item.path} />;
        })}
      </ul>
    </section>
  );
};

export default WorksList;
