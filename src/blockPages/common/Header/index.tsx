/* ------------------------------ Basic imports ----------------------------- */
import React, { FC } from "react";
import "./headerStyles.scss";
import { SOCIALS_LIST } from "../../../contentData/_socialsList";
import { ICONS } from "../../../constants/_icons";

const Header: FC = () => {
  /* --------------------------------- Render ------------------------------- */

  return (
    <header className="header">
      <div className="header__container">
        {SOCIALS_LIST.map((item) => (
          <a
            key={item.title}
            href={item.link}
            target="_blank"
            rel="no-referrer noreferrer"
          >
            {item.title}
            <ICONS.Utils.LinkIcon />
          </a>
        ))}
      </div>
    </header>
  );
};

export default Header;
