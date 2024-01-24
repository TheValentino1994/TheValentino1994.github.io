/* ------------------------------ Basic imports ----------------------------- */
import { FC, useEffect } from "react";

/* -------------------------------- Libraries ------------------------------- */
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AOS from "aos";

/* --------------------------------- Layouts -------------------------------- */
import { MainLayout } from "../layouts";

/* ---------------------------------- Pages --------------------------------- */
import { WingTipz, Home, Neobank, Intrac, Loop, Error404 } from "../pages";

/* -------------------------------- Constants ------------------------------- */
import { ROUTES } from "../constants/_routes";

export const MainRouter: FC = () => {
  useEffect(() => {
    AOS.init({ offset: window.innerHeight / 4, duration: 650 });
    window.addEventListener("load", AOS.refresh);

    return () => {
      window.removeEventListener("load", AOS.refresh);
    };
  }, []);

  /* --------------------------------- Render --------------------------------- */

  return (
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
  );
};
