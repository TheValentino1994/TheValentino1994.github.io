/* ------------------------------ Basic imports ----------------------------- */
import { FC, useCallback, useEffect } from "react";
import "./worksListStyles.scss";

/* ------------------------------- Block pages ------------------------------ */
import WorkItem from "../WorkItem";

/* ------------------------------ Constant data ----------------------------- */
import { WORKS_LIST } from "../../../contentData/_worksList";

/* -------------------------------- Libraries ------------------------------- */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const WorksList: FC = () => {
  const handleFooterVisility = useCallback(
    (position: number) => () => {
      gsap.to("footer", { bottom: position });
    },
    []
  );

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    let ctx = gsap.context(() => {
      gsap.timeline({
        scrollTrigger: {
          start: `top 104px`,
          end: `bottom bottom`,
          trigger: ".worksList__container" as any,
          scrub: 1,
          snap: 1 / 3, //fix, not working properly on laptops and smaller devices
          // onUpdate: () => console.log("update!"),
          onLeave: handleFooterVisility(0),
          onEnterBack: handleFooterVisility(-300),
        },
      });
    });

    return () => {
      ctx.revert();
      ctx.kill();
    };
  }, []);

  /* --------------------------------- Render ------------------------------- */

  return (
    <section className="worksList">
      <ul className="worksList__container">
        {WORKS_LIST.map((item) => {
          return <WorkItem {...item} key={item.path} />;
        })}
      </ul>
    </section>
  );
};

export default WorksList;
