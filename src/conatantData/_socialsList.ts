/* -------------------------------- Constants ------------------------------- */
import { ICONS } from "../constants/_icons";

export enum SOCIALS_ENUM {
  IN = "Instagram",
  LN = "Linkedin",
  DR = "Dribble",
  E = "E-mail",
}

export enum SOCIALS_LINKS_ENUM {
  IN = "https://instagram.com/aroundzworldz?igshid=YmMyMTA2M2Y=",
  LN = "https://www.linkedin.com/in/valentyn-kuchernoha-73aa59219/",
  DR = "https://dribbble.com/Kuchernoha",
  E = "ValentynKuchernoha@gmail.com",
}
export const SOCIALS_LIST = [
  {
    title: SOCIALS_ENUM.E,
    link: SOCIALS_LINKS_ENUM.E,
    Icon: ICONS.socials.EmailIcon,
  },
  {
    title: SOCIALS_ENUM.LN,
    link: SOCIALS_LINKS_ENUM.LN,
    Icon: ICONS.socials.LinkedInIcon,
  },
  {
    title: SOCIALS_ENUM.IN,
    link: SOCIALS_LINKS_ENUM.IN,
    Icon: ICONS.socials.InstagramIcon,
  },
  {
    title: SOCIALS_ENUM.DR,
    link: SOCIALS_LINKS_ENUM.DR,
    Icon: ICONS.socials.DribbleIcon,
  },
];
