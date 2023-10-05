/* ------------------------------ Basic imports ----------------------------- */
import { FC, useEffect } from "react";
import "./worksListStyles.scss";

/* ------------------------------- Block pages ------------------------------ */
import WorkItem from "../WorkItem";

/* ------------------------------ Constant data ----------------------------- */
import { WORKS_LIST } from "../../../contentData/_worksList";

/* -------------------------------- Libraries ------------------------------- */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";

const WorkList: FC = () => {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    let ctx = gsap.context(() => {
      let cards = gsap.utils.toArray<gsap.TweenTarget>(".card");

      const timeLine = gsap.timeline({
        scrollTrigger: {
          start: `top 76px`,
          end: `bottom bottom`,
          toggleActions: "play pause resume pause",
          trigger: ".worksList__container",
          markers: true,
          scrub: true,
          pin: true,
          onLeave: (self) => {
            self.trigger?.classList.toggle("pinned");
            gsap.to("footer", { bottom: 0 });
          },
          onEnterBack: (self) => {
            self.trigger?.classList.toggle("pinned");
            gsap.to("footer", { bottom: -300 });
          },
        },
      });

      cards.forEach((card, index) => {
        timeLine.to(card, {
          top: 24 * index,
        });
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

export default WorkList;
