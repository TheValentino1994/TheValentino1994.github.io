/* ------------------------------ Basic imports ----------------------------- */
import { FC, Suspense, lazy, useEffect } from "react";

/* -------------------------------- Libraries ------------------------------- */
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AOS from "aos";

/* --------------------------------- Layouts -------------------------------- */
import { MainLayout } from "../layouts";

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
  useEffect(() => {
    AOS.init({ offset: 200, duration: 650 });
    window.addEventListener("load", AOS.refresh);

    return () => {
      window.removeEventListener("load", AOS.refresh);
    };
  }, []);

  /* --------------------------------- Render --------------------------------- */

  return (
    <Suspense fallback={<SuspenseLoader />}>
      <BrowserRouter>
        <MainLayout>
          <Routes>
            <Route path={ROUTES.NOT_FOUND} element={<Error404 />} />
            <Route path={ROUTES.HOME} element={<Home />} />
            <Route path={ROUTES.PORTFOLIO_WING_TIPZ} element={<WingTipz />} />
            <Route path={ROUTES.PORTFOLIO_INTRAC} element={<Intrac />} />
            <Route path={ROUTES.PORTFOLIO_NEOBANK} element={<Neobank />} />
            <Route path={ROUTES.PORTFOLIO_LOOP} element={<Loop />} />
          </Routes>
        </MainLayout>
      </BrowserRouter>
    </Suspense>
  );
};
