import { FC, HTMLAttributes } from "react";
import "./gradientCardStyles.scss";
import clsx from "clsx";
import { newLine } from "../../utils";

export interface GradientCardProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  description: string;
  type?: "neobank" | "intrac";
}

const GradientCard: FC<GradientCardProps> = ({ title, description, type }) => {
  const formattedDescription = newLine(description);

  return (
    <div className={clsx("gradientCard", type)}>
      <h3>{title}</h3>

      <p>{formattedDescription}</p>
    </div>
  );
};

export default GradientCard;
