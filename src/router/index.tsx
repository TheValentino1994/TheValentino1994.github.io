/* ------------------------------ Basic imports ----------------------------- */
import React, { FC } from "react";

/* -------------------------------- Libraries ------------------------------- */
import { BrowserRouter, Route, Routes } from "react-router-dom";

/* --------------------------------- Layouts -------------------------------- */
import { MainLayout } from "../layouts";

/* ---------------------------------- Pages --------------------------------- */
import { WingTipz, Home, Neobank, Intrac, Loop } from "../pages";

/* -------------------------------- Constants ------------------------------- */
import { ROUTES } from "../constants/_routes";

export const MainRouter: FC = () => {
  /* --------------------------------- Render --------------------------------- */

  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
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
