/* ------------------------------ Basic imports ----------------------------- */
import React, { FC, useCallback, useEffect, useRef } from "react";
import "./headerStyles.scss";

/* -------------------------------- Libraries ------------------------------- */
import { NavLink, Link } from "react-router-dom";

/* ------------------------------ Constant data ----------------------------- */
import { HEADER_TABS } from "../../../conatantData/_headerTabs";

/* -------------------------------- Constants ------------------------------- */
import { ICONS } from "../../../constants/_icons";
import { ROUTES } from "../../../constants/_routes";

const Header: FC = () => {
  const headerRef = useRef<HTMLElement | null>(null);

  /* ----------------------------- Blur on scroll ----------------------------- */

  const scrollHandler = useCallback(() => {
    const scrollValue = window.scrollY;

    if (scrollValue) headerRef.current?.classList.add("header_blured");
    else headerRef.current?.classList.remove("header_blured");
  }, [headerRef]);

  useEffect(() => {
    window.addEventListener("scroll", scrollHandler);

    return () => window.removeEventListener("scroll", scrollHandler);
  }, []);

  /* --------------------------------- Render ------------------------------- */

  return (
    <header ref={headerRef} className="header">
      <div className="header__container">
        <Link to={ROUTES.HOME} className="header__logo">
          <ICONS.Logo />

          <h4>Valentyn Kuchernoha</h4>
        </Link>

        {/* <nav className="header__nav">
          <ul className="header__list">
            {HEADER_TABS.map(({ title, to }) => (
              <li key={title}>
                {to ? <NavLink to={to}>{title}</NavLink> : <span>{title}</span>}
              </li>
            ))}
          </ul>
        </nav> */}
      </div>
    </header>
  );
};

export default Header;
