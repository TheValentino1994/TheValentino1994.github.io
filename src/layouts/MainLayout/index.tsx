/* ------------------------------ Basic imports ----------------------------- */
import { FC, useEffect, useMemo } from "react";

/* -------------------------------- Libraries ------------------------------- */
import { useLocation } from "react-router-dom";

/* ------------------------------- Block pages ------------------------------ */
import { Footer } from "../../blockPages/common";
import { DefaultLayoutProps } from "../../types";
import { ROUTES } from "../../constants/_routes";

const MainLayout: FC<DefaultLayoutProps> = ({ children }) => {
  /* ---------------------------------- Hooks --------------------------------- */

  const { pathname } = useLocation();

  const showFooter = useMemo(() => {
    return Object.values(ROUTES).includes(pathname as ROUTES);
  }, [pathname]);

  /* -------------------------------- Handlers -------------------------------- */

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  /* --------------------------------- Render --------------------------------- */

  return (
    <>
      {children}

      {showFooter && <Footer />}
    </>
  );
};

export default MainLayout;
