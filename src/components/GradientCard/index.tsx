import { FC, HTMLAttributes } from "react";
import "./gradientCardStyles.scss";
import clsx from "clsx";
import { newLine } from "../../utils";

export interface GradientCardProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  description: string;
  type?: "neobank" | "intrac";
  animation?: string;
  animationDelay?: number;
}

const GradientCard: FC<GradientCardProps> = ({
  title,
  description,
  type,
  animation,
  animationDelay,
}) => {
  const formattedDescription = newLine(description);

  return (
    <div
      data-aos={animation}
      data-aos-delay={animationDelay}
      className={clsx("gradientCard", type)}
    >
      <h3>{title}</h3>

      <p>{formattedDescription}</p>
    </div>
  );
};

export default GradientCard;
