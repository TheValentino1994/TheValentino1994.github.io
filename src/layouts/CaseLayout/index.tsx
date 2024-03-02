/* ------------------------------ Basic imports ----------------------------- */
import { FC, useEffect } from "react";

/* -------------------------------- Libraries ------------------------------- */
import { useLocation } from "react-router-dom";

/* ------------------------------- Block pages ------------------------------ */
import Header from "../../blockPages/portfolio/Header";
import { DefaultLayoutProps } from "../../types";
import { Footer } from "../../blockPages/common";

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

      <Footer />
    </>
  );
};

export default CaseLayout;
