/* ------------------------------ Basic imports ----------------------------- */
import { FC, Suspense, lazy, useCallback, useEffect } from "react";

/* -------------------------------- Libraries ------------------------------- */
import { HashRouter, Route, Routes } from "react-router-dom";
import AOS from "aos";

/* -------------------------------- Constants ------------------------------- */
import { ROUTES } from "../constants/_routes";
import { SuspenseLoader } from "../blockPages/common";

/* ---------------------------------- Pages --------------------------------- */
const Home = lazy(() => import("../pages/portfolio/home"));
const WingTipz = lazy(() => import("../pages/portfolio/wingTipz"));
const Neobank = lazy(() => import("../pages/portfolio/neobank"));
const Intrac = lazy(() => import("../pages/portfolio/intrac"));
const Loop = lazy(() => import("../pages/portfolio/loop"));
const Error404 = lazy(() => import("../pages/error404"));

export const MainRouter: FC = () => {
  const pageScrollHandler = useCallback(() => {
    const pathname = window.location.pathname;

    if (pathname === "/") {
      window.scrollTo(0, 0);
    }
  }, []);

  useEffect(() => {
    AOS.init({ offset: 200, once: false, duration: 650 });
    window.addEventListener("load", AOS.refresh);
    window.addEventListener("unload", pageScrollHandler);

    return () => {
      window.removeEventListener("load", AOS.refresh);
      window.removeEventListener("unload", pageScrollHandler);
    };
  }, []);

  /* --------------------------------- Render --------------------------------- */

  return (
    <Suspense fallback={<SuspenseLoader />}>
      <HashRouter>
        <Routes>
          <Route path={ROUTES.NOT_FOUND} element={<Error404 />} />
          <Route path={ROUTES.HOME} element={<Home />} />
          <Route path={ROUTES.PORTFOLIO_WING_TIPZ} element={<WingTipz />} />
          <Route path={ROUTES.PORTFOLIO_INTRAC} element={<Intrac />} />
          <Route path={ROUTES.PORTFOLIO_NEOBANK} element={<Neobank />} />
          <Route path={ROUTES.PORTFOLIO_LOOP} element={<Loop />} />
        </Routes>
      </HashRouter>
    </Suspense>
  );
};
