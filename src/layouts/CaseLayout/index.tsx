/* ------------------------------ Basic imports ----------------------------- */
import { FC, useEffect } from "react";

/* -------------------------------- Libraries ------------------------------- */
import { useLocation } from "react-router-dom";

/* ------------------------------- Block pages ------------------------------ */
import { Header } from "../../blockPages/portfolio/components";
import { DefaultLayoutProps } from "../../types";
import { gsap } from "gsap-trial";
import { ScrollSmoother } from "gsap-trial/ScrollSmoother";
import { ScrollTrigger } from "gsap-trial/ScrollTrigger";

const CaseLayout: FC<DefaultLayoutProps> = ({ children }) => {
  /* ---------------------------------- Hooks --------------------------------- */

  const { pathname } = useLocation();

  /* -------------------------------- Handlers -------------------------------- */

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

    ScrollSmoother.create({
      smooth: 1, // how long (in seconds) it takes to "catch up" to the native scroll position
      effects: false, // looks for data-speed and data-lag attributes on elements
      smoothTouch: 0.1, // much shorter smoothing time on touch devices (default is NO smoothing on touch devices)
    });
  });

  /* --------------------------------- Render --------------------------------- */

  return (
    <>
      <Header />

      {children}
    </>
  );
};

export default CaseLayout;
