/* ------------------------------ Basic imports ----------------------------- */
import { FC } from "react";
import "./notFoundStyles.scss";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../constants/_routes";

const NotFound: FC = () => {
  /* ---------------------------------- Hooks --------------------------------- */

  const navigate = useNavigate();

  /* -------------------------------- Hendlers -------------------------------- */

  const handleBackHome = () => {
    navigate(ROUTES.HOME, { replace: true });
  };

  /* --------------------------------- Render --------------------------------- */

  return (
    <section className="notFound" data-aos="zoom-in-up">
      <h1>404</h1>

      <p>
        The page you are looking for doesn't exist. Please go back to the
        homepage.
      </p>

      <button onClick={handleBackHome}>Go back home</button>
    </section>
  );
};

export default NotFound;
