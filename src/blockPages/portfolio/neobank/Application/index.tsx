/* ------------------------------ Basic imports ----------------------------- */
import { FC } from "react";
import "./applicationStyles.scss";
import { IMAGES } from "../../../../constants/_images";
import GradientCard, {
  GradientCardProps,
} from "../../../../components/GradientCard";

const SUMMARY: Array<GradientCardProps> = [
  {
    title: "+50",
    description:
      "More than 50 screens was designed in a result after the surveys and flows conducting",
  },
  {
    title: "+200",
    description:
      "+200 hours ispent over the entire design process to deliver the work",
  },
  {
    title: ">80%",
    description: `After user testing we conducted 84% of users who are satisfied with app usage`,
  },
  {
    type: "neobank",
    title: "+1",
    description:
      "Satisfied client by the delivery. It helps me grow as a designer constantly",
  },
];

const Application: FC = () => {
  /* --------------------------------- Render --------------------------------- */

  return (
    <section className="neobankApplication">
      <div className="neobankApplication__container">
        <div className="neobankApplication__row">
          <div className="neobankApplication__left">
            <p>Mobile Application</p>
          </div>

          <div className="neobankApplication__right neobankApplication__mainText">
            <p>
              Visual solution for the Neobank mobile application was a sleek and
              modern design that aligned with the brand's identity and values.
              The green color palette, minimalist design approach, and
              consistent design language throughout the app ensured a visually
              appealing and user-friendly experience.
            </p>
          </div>
        </div>

        <div className="neobankApplication__row">
          {SUMMARY.map((item) => (
            <GradientCard key={item.title} {...item} />
          ))}
        </div>
      </div>

      <div className="neobankApplication__container">
        <img
          src={IMAGES.projectsPhotos.neobank.mobileApplication1}
          alt="Neobank application"
        />

        <img
          src={IMAGES.projectsPhotos.neobank.mobileApplication2}
          alt="Neobank application"
        />
      </div>

      <div className="neobankApplication__fullWidthIllustration">
        <img
          src={IMAGES.projectsPhotos.neobank.mobileApplication3}
          alt="Neobank application"
        />
      </div>
    </section>
  );
};

export default Application;
