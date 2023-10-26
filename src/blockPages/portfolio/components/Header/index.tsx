/* ------------------------------ Basic imports ----------------------------- */
import { FC } from "react";
import "./headerStyles.scss";
import { ICONS } from "../../../../constants/_icons";

const Header: FC = () => {
  /* --------------------------------- Render ------------------------------- */

  return (
    <header data-aos="fade-down" className="portfolioHeader">
      <div className="portfolioHeader__container">
        <div>
          <h3>Valentyn Kuchernoha</h3>
          <p>UX/UI Designer</p>
        </div>

        <button>
          <ICONS.Utils.CloseIcon />
        </button>
      </div>
    </header>
  );
};

export default Header;
