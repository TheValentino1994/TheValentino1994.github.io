/* ------------------------------ Basic imports ----------------------------- */
import { FC, ReactNode, useEffect } from "react";

/* -------------------------------- Libraries ------------------------------- */
import { useLocation } from "react-router-dom";

/* ------------------------------- Block pages ------------------------------ */
import { Header } from "../../blockPages/home";
import { DefaultLayoutProps } from "../../types";
import { Footer } from "../../blockPages/common";

const HomeLayout: FC<DefaultLayoutProps> = ({ children }) => {
  /* ---------------------------------- Hooks --------------------------------- */

  const { pathname } = useLocation();

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

export default HomeLayout;
