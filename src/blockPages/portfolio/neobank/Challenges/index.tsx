/* ------------------------------ Basic imports ----------------------------- */
import { FC } from "react";
import "./challengesStyles.scss";
import GradientCard, {
  GradientCardProps,
} from "../../../../components/GradientCard";
import { IMAGES } from "../../../../constants/_images";

const GOALS: Array<GradientCardProps> = [
  {
    title: "Idea & Goals",
    description:
      "Create a convenient mobile application that contains functionality for financial management",
  },
  {
    title: "Research",
    description:
      "Study of the subject area, analysis of competitors. Creating a Roadmap",
  },
  {
    title: "Wireframes",
    description: `Creating a user flow to display all possible user path options`,
  },
  {
    type: "neobank",
    title: "UI Design",
    description:
      "Drawing of all screen states depending on the concept. Creating a UIKit and clickable prototype.",
  },
];

const CHALLENGES = [
  {
    animation: "zoom-in-right",
    title: "Challenge",
    description:
      "To design a Neobank app that provides end-to-end banking and financial service to customers with multiple bank accounts, simplifying banking and is a single destination for all banking operations and more.",
  },
  {
    animation: "zoom-in-left",
    type: "neobank" as GradientCardProps["type"],
    title: "Solution",
    description:
      "To create a banking system fundamentally different from traditional banks, providing, linking of multiple bank accounts, hassle-free account creation, seamless payments, smart reporting, user-friendly interface.",
  },
];

const Challenges: FC = () => {
  /* --------------------------------- Render --------------------------------- */

  return (
    <section className="neobankChallenges">
      <div className="neobankChallenges__container">
        <div className="neobankChallenges__challenges-desktop">
          {CHALLENGES.map((item) => (
            <GradientCard
              type={item.type}
              animation={item.animation}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>

        <div className="neobankChallenges__challenges-mobile">
          {CHALLENGES.map((item) => (
            <div data-aos={item.animation} key={item.title}>
              <h4>{item.title}</h4>
              <p>{item.description}</p>
            </div>
          ))}
        </div>

        <IMAGES.Illustrations.Ellipse />
      </div>

      <div className="neobankChallenges__container">
        {GOALS.map((item) => (
          <GradientCard animation="fade-up" key={item.title} {...item} />
        ))}
      </div>
    </section>
  );
};

export default Challenges;
