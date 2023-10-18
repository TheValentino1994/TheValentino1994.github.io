/* ------------------------------ Basic imports ----------------------------- */
import React, { FC } from "react";

/* -------------------------------- Libraries ------------------------------- */
import { BrowserRouter, Route, Routes } from "react-router-dom";

/* --------------------------------- Layouts -------------------------------- */
import { MainLayout } from "../layouts";

/* ---------------------------------- Pages --------------------------------- */
import { WingTipz, Home, Neobank, WildMinds } from "../pages";

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
          <Route path={ROUTES.PORTFOLIO_WILD_MINDS} element={<WildMinds />} />
          <Route path={ROUTES.PORTFOLIO_NEOBANK} element={<Neobank />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
};
