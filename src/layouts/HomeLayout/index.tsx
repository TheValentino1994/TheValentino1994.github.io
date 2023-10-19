/* ------------------------------ Basic imports ----------------------------- */
import { FC, ReactNode, useEffect } from "react";

/* -------------------------------- Libraries ------------------------------- */
import { useLocation } from "react-router-dom";

/* ------------------------------- Block pages ------------------------------ */
import { Header } from "../../blockPages/home";
import { DefaultLayoutProps } from "../../types";

const HomeLayout: FC<DefaultLayoutProps> = ({ children }) => {
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

export default HomeLayout;
