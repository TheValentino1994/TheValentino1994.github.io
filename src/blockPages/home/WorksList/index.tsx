/* ------------------------------ Basic imports ----------------------------- */
import { FC, useCallback, useEffect } from "react";
import "./worksListStyles.scss";

/* ------------------------------- Block pages ------------------------------ */
import WorkItem from "../WorkItem";

/* ------------------------------ Constant data ----------------------------- */
import { WORKS_LIST } from "../../../contentData/_worksList";

/* -------------------------------- Libraries ------------------------------- */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";

const WorksList: FC = () => {
  const handleFooterVisility = useCallback(
    (position: number) => () => {
      gsap.to("footer", { bottom: position });
    },
    []
  );

  const handleCardSnap = useCallback((value: number) => {
    const snapPoints = [0, 0.33160415003990423, 0.664804469273743, 1]; //need to calculate somehow

    return snapPoints.reduce(function (prev, curr) {
      return Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev;
    });
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    let ctx = gsap.context(() => {
      gsap.timeline({
        scrollTrigger: {
          start: `top 76px`,
          end: `bottom bottom`,
          trigger: ".worksList__container" as any,
          scrub: 1,
          snap: handleCardSnap,
          onLeave: handleFooterVisility(0),
          onEnterBack: handleFooterVisility(-300),
        },
      });
    });

    return () => {
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
