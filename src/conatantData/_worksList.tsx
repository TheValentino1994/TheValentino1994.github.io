/* -------------------------------- Constants ------------------------------- */
import { IMAGES } from "../constants/_images";
import { ROUTES } from "../constants/_routes";

export enum ProjectsNames {
  WING_TIPZ = "Wing Tips",
  WILD_MINDS = "Wild minds",
  LEXER = "Lexer",
}

export interface WorkItemDto {
  id: ProjectsNames;
  title: string;
  subtitle: string;
  previewImage: string;
  path: ROUTES;
}

export const WORKS_LIST: Array<WorkItemDto> = [
  {
    id: ProjectsNames.WILD_MINDS,
    title: "Wild Minds Mobile redesign",
    subtitle:
      "Wild Minds is a mindfulness meditation app designed to meet your experience level.",
    previewImage: IMAGES.projectsPhotos.wildMinds.preview,
    path: ROUTES.PORTFOLIO_WILD_MINDS,
  },
  {
    id: ProjectsNames.WING_TIPZ,
    title: "Wing Tips App Concept",
    subtitle:
      "An online application for finding various sports lessons in your city.",
    previewImage: IMAGES.projectsPhotos.wingTipz.preview,
    path: ROUTES.PORTFOLIO_WING_TIPZ,
  },
  {
    id: ProjectsNames.LEXER,
    title: "Lexer App Concept",
    subtitle:
      "Single mobile app for managing all your data, cryptocurrencies, and more.",
    previewImage: IMAGES.projectsPhotos.lexer.preview,
    path: ROUTES.PORTFOLIO_LEXER,
  },
];
