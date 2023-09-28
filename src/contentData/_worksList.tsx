/* -------------------------------- Constants ------------------------------- */
import { IMAGES } from "../constants/_images";
import { ROUTES } from "../constants/_routes";

export interface WorkItem {
  title: string;
  subtitle: string;
  previewImage: string;
  description: string;
  path: ROUTES;
  timeline: string;
}

export const WORKS_LIST: Array<WorkItem> = [
  {
    title: "Intrac",
    subtitle: "Web & Responsive",
    description:
      "Intrac is a comprehensive platform designed to streamline empoyee management with a wide range of features.",
    previewImage: IMAGES.projectsPhotos.intrac.preview,
    path: ROUTES.PORTFOLIO_INTRAC,
    timeline: "2023",
  },
  {
    title: "Neobank",
    subtitle: "Mobile App",
    description:
      "Neobanks are new-age banks without any physical location, present entirely online. They provide digital, mobile-first financial solutions for payments, money transfers, lending, and more.",
    previewImage: IMAGES.projectsPhotos.neobank.preview,
    path: ROUTES.PORTFOLIO_NEOBANK,
    timeline: "2023",
  },
  {
    title: "Loop",
    subtitle: "Mobile App, Web ",
    description:
      "A centralized productivity platform that allows Users to connect all tools in one place to streamline workflow and maximize output.",
    previewImage: IMAGES.projectsPhotos.loop.preview,
    path: ROUTES.PORTFOLIO_LOOP,
    timeline: "2022",
  },
  {
    title: "Wingtips",
    subtitle: "Mobile App",
    description:
      "An online application for finding lessons offering various sports in your city.",
    previewImage: IMAGES.projectsPhotos.wingTipz.preview,
    path: ROUTES.PORTFOLIO_WING_TIPZ,
    timeline: "2021",
  },
];
