/* ------------------------------ Illustrations ----------------------------- */
import { FooterWaves } from "./../assets/images/illustrations/FooterWaves";
import Planet1 from "../assets/images/illustrations/planet1.png";
import Planet2 from "../assets/images/illustrations/planet2.png";
import Astronaut1 from "../assets/images/illustrations/astronaut1.png";
import Astronaut2 from "../assets/images/illustrations/astronaut2.png";
import IphoneX from "../assets/images/illustrations/iPhone_X.png";
import { HomeIntroBigLava } from "../assets/images/illustrations/HomeIntroBigLava";
import { HomeIntroSmallLava } from "../assets/images/illustrations/HomeIntroSmallLava";
import { HomeIntroWave } from "../assets/images/illustrations/HomeIntroWave";

/* ------------------------------- Backgrounds ------------------------------ */
import FooterBg from "../assets/images/backgrounds/footerBg.svg";

/* ----------------------------- Projects photos ---------------------------- */
import LexerPreview from "../assets/images/projectsPhotos/Lexer/preview.png";
import LexerDesignSystem from "../assets/images/projectsPhotos/Lexer/designSystem.png";
import LexerSlide1_1 from "../assets/images/projectsPhotos/Lexer/slides1/slide1.png";
import LexerSlide1_2 from "../assets/images/projectsPhotos/Lexer/slides1/slide2.png";
import LexerSlide1_3 from "../assets/images/projectsPhotos/Lexer/slides1/slide3.png";
import LexerSlide1_4 from "../assets/images/projectsPhotos/Lexer/slides1/slide4.png";
import LexerSlide1_5 from "../assets/images/projectsPhotos/Lexer/slides1/slide5.png";
import LexerSlide1_6 from "../assets/images/projectsPhotos/Lexer/slides1/slide6.png";
import LexerSlide2_1_1 from "../assets/images/projectsPhotos/Lexer/slides2/slide1_1.png";
import LexerSlide2_1_2 from "../assets/images/projectsPhotos/Lexer/slides2/slide1_2.png";
import LexerSlide2_1_3 from "../assets/images/projectsPhotos/Lexer/slides2/slide1_3.png";
import LexerSlide2_1_4 from "../assets/images/projectsPhotos/Lexer/slides2/slide1_4.png";
import LexerSlide2_2_1 from "../assets/images/projectsPhotos/Lexer/slides2/slide2_1.png";
import LexerSlide2_2_2 from "../assets/images/projectsPhotos/Lexer/slides2/slide2_2.png";
import LexerSlide2_2_3 from "../assets/images/projectsPhotos/Lexer/slides2/slide2_3.png";
import LexerSlide2_2_4 from "../assets/images/projectsPhotos/Lexer/slides2/slide2_4.png";
import LexerSlide2_3_1 from "../assets/images/projectsPhotos/Lexer/slides2/slide3_1.png";
import LexerSlide2_3_2 from "../assets/images/projectsPhotos/Lexer/slides2/slide3_2.png";
import LexerSlide2_3_3 from "../assets/images/projectsPhotos/Lexer/slides2/slide3_3.png";
import LexerSlide2_3_4 from "../assets/images/projectsPhotos/Lexer/slides2/slide3_4.png";

import WingTipzPreview from "../assets/images/projectsPhotos/WingTipz/preview.png";
import WingTipzIntro from "../assets/images/projectsPhotos/WingTipz/intro.png";
import WingTipzResult from "../assets/images/projectsPhotos/WingTipz/result.png";

import WildMindsrPreview from "../assets/images/projectsPhotos/WildMinds/preview.png";
import WildMindsrResult from "../assets/images/projectsPhotos/WildMinds/result.png";
import WildMindsrBg1 from "../assets/images/projectsPhotos/WildMinds/bg1.png";
import WildMindsrBg2 from "../assets/images/projectsPhotos/WildMinds/bg2.png";
import WildMindsrBg3 from "../assets/images/projectsPhotos/WildMinds/bg3.png";
import WildMindsrBg4 from "../assets/images/projectsPhotos/WildMinds/bg4.png";
import WildMindsrBg5 from "../assets/images/projectsPhotos/WildMinds/bg5.png";

export const IMAGES = {
  Illustrations: {
    Planet1,
    Planet2,
    Astronaut1,
    Astronaut2,
    FooterWaves,
    IphoneX,
    HomeIntroBigLava,
    HomeIntroSmallLava,
    HomeIntroWave,
  },

  backgrounds: {
    FooterBg,
  },

  projectsPhotos: {
    wildMinds: {
      preview: WildMindsrPreview,
      result: WildMindsrResult,
      bg1: WildMindsrBg1,
      bg2: WildMindsrBg2,
      bg3: WildMindsrBg3,
      bg4: WildMindsrBg4,
      bg5: WildMindsrBg5,
    },
    wingTipz: {
      preview: WingTipzPreview,
      intro: WingTipzIntro,
      result: WingTipzResult,
    },
    lexer: {
      preview: LexerPreview,
      designSystem: LexerDesignSystem,
      slides1: [
        LexerSlide1_1,
        LexerSlide1_2,
        LexerSlide1_3,
        LexerSlide1_4,
        LexerSlide1_5,
        LexerSlide1_6,
      ],
      slides2: [
        [LexerSlide2_1_1, LexerSlide2_2_1, LexerSlide2_3_1],
        [LexerSlide2_1_2, LexerSlide2_2_2, LexerSlide2_3_2],
        [LexerSlide2_1_3, LexerSlide2_2_3, LexerSlide2_3_3],
        [LexerSlide2_1_4, LexerSlide2_2_4, LexerSlide2_3_4],
      ],
    },
  },
};
