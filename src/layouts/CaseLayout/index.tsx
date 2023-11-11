/* ------------------------------ Basic imports ----------------------------- */
import { FC, useEffect } from "react";

/* -------------------------------- Libraries ------------------------------- */
import { useLocation } from "react-router-dom";

/* ------------------------------- Block pages ------------------------------ */
import Header from "../../blockPages/portfolio/Header";
import { DefaultLayoutProps } from "../../types";

const CaseLayout: FC<DefaultLayoutProps> = ({ children }) => {
  /* ---------------------------------- Hooks --------------------------------- */

  const { pathname } = useLocation();

  /* -------------------------------- Handlers -------------------------------- */

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  /* --------------------------------- Render --------------------------------- */

  return (
    <>
      <Header />

      {children}
    </>
  );
};

export default CaseLayout;
