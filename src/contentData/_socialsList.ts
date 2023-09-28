export enum SOCIALS {
  INSTAGRAM = "Instagram",
  LINKEDIN = "Linkedin",
  EMAIL = "E-mail",
  CV = "CV",
}

export const SOCIALS_LIST = [
  {
    title: "Linkedin",
    link: "https://www.linkedin.com/in/valentyn-kuchernoha-73aa59219/",
    type: SOCIALS.LINKEDIN,
  },
  {
    title: "Instagram",
    link: "https://instagram.com/aroundzworldz?igshid=YmMyMTA2M2Y=",
    type: SOCIALS.INSTAGRAM,
  },
  {
    title: "Email",
    link: "ValentynKuchernoha@gmail.com",
    type: SOCIALS.EMAIL,
  },
  {
    title: "Valentyn.cv",
    link: `${window.location.origin}/Valentyn_Kuchernoha_CV.pdf`,
    type: SOCIALS.EMAIL,
  },
];
