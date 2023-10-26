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
          <p data-aos="fade-right" className="neobankApplication__left">
            Mobile Application
          </p>

          <p
            data-aos="fade-left"
            className="neobankApplication__right neobankApplication__mainText"
          >
            Visual solution for the Neobank mobile application was a sleek and
            modern design that aligned with the brand's identity and values. The
            green color palette, minimalist design approach, and consistent
            design language throughout the app ensured a visually appealing and
            user-friendly experience.
          </p>
        </div>
      </div>

      <div className="neobankApplication__container">
        <div className="neobankApplication__row">
          {SUMMARY.map((item) => (
            <GradientCard animation="fade-up" key={item.title} {...item} />
          ))}
        </div>
      </div>

      <div className="neobankApplication__container">
        <img
          data-aos="zoom-out-up"
          src={IMAGES.projectsPhotos.neobank.mobileApplication1}
          alt="Neobank application"
        />

        <img
          data-aos="zoom-out-up"
          src={IMAGES.projectsPhotos.neobank.mobileApplication2}
          alt="Neobank application"
        />
      </div>

      <div className="neobankApplication__fullWidthIllustration">
        <img
          data-aos="zoom-in-right"
          src={IMAGES.projectsPhotos.neobank.mobileApplication3}
          alt="Neobank application"
        />
      </div>
    </section>
  );
};

export default Application;
