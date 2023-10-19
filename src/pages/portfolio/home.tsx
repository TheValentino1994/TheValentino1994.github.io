/* ------------------------------ Basic imports ----------------------------- */
import { FC } from "react";

/* ------------------------------- Block pages ------------------------------ */
import { HomeIntro, WorksList } from "../../blockPages/home";
import { HomeLayout } from "../../layouts";

const Home: FC = () => {
  /* --------------------------------- Render --------------------------------- */

  return (
    <HomeLayout>
      <HomeIntro />
      <WorksList />
    </HomeLayout>
  );
};

export default Home;
