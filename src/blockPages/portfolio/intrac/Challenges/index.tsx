/* ------------------------------ Basic imports ----------------------------- */
import { FC } from "react";
import "./challengesStyles.scss";
import GradientCard, {
  GradientCardProps,
} from "../../../../components/GradientCard";

const GOALS: Array<GradientCardProps> = [
  {
    title: "Idea & Goals",
    description:
      "Create easy - to use web and responsive design with financial management features",
  },
  {
    title: "Research",
    description:
      "Analyzing competitors and researching the topic. Building a road map",
  },
  {
    title: "Wireframes",
    description: `Constructing a user flow that shows every choice of user's path that exists`,
  },
  {
    type: "intrac",
    title: "UI Design",
    description:
      "Depending on the concept, drawing all screens states. Making a clickable prototype and Ui kit.",
  },
];

const Challenges: FC = () => {
  /* --------------------------------- Render --------------------------------- */

  return (
    <section className="intracChallenges">
      <div className="intracChallenges__container">
        {GOALS.map((item) => (
          <GradientCard animation="fade-up" key={item.title} {...item} />
        ))}
      </div>
    </section>
  );
};

export default Challenges;
