/* ------------------------------ Basic imports ----------------------------- */
import React, { FC } from "react";

/* -------------------------------- Libraries ------------------------------- */
import { BrowserRouter, Route, Routes } from "react-router-dom";

/* --------------------------------- Layouts -------------------------------- */
import { MainLayout } from "../layouts";

/* ---------------------------------- Pages --------------------------------- */
import { Home, WingTipz, Portfolio, Lexer, WildMinds } from "../pages";

/* -------------------------------- Constants ------------------------------- */
import { ROUTES } from "../constants/_routes";

export const MainRouter: FC = () => {
  /* --------------------------------- Render --------------------------------- */

  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path={ROUTES.HOME} element={<Portfolio />} />
          {/* <Route path={ROUTES.HOME} element={<Home />} /> */}
          {/* <Route path={ROUTES.PORTFOLIO} element={<Portfolio />} /> */}
          <Route path={ROUTES.PORTFOLIO_WING_TIPZ} element={<WingTipz />} />
          <Route path={ROUTES.PORTFOLIO_WILD_MINDS} element={<WildMinds />} />
          <Route path={ROUTES.PORTFOLIO_LEXER} element={<Lexer />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
};
