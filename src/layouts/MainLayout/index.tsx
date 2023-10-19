/* ------------------------------ Basic imports ----------------------------- */
import { FC, useEffect } from "react";

/* -------------------------------- Libraries ------------------------------- */
import { useLocation } from "react-router-dom";

/* ------------------------------- Block pages ------------------------------ */
import { Footer } from "../../blockPages/common";
import { DefaultLayoutProps } from "../../types";

const MainLayout: FC<DefaultLayoutProps> = ({ children }) => {
  /* ---------------------------------- Hooks --------------------------------- */

  const { pathname } = useLocation();

  /* -------------------------------- Handlers -------------------------------- */

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  /* --------------------------------- Render --------------------------------- */

  return (
    <>
      {children}

      <Footer />
    </>
  );
};

export default MainLayout;
