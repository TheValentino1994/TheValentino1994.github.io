/* ------------------------------ Basic imports ----------------------------- */
import React, { FC, ImgHTMLAttributes } from "react";

/* -------------------------------- Constants ------------------------------- */
import { loadImage } from "./createResource";

const SuspenseImage: FC<ImgHTMLAttributes<HTMLImageElement>> = (props) => {
  loadImage(props.src as string).read();

  /* --------------------------------- Render --------------------------------- */
  return <img {...props} />;
};

export default SuspenseImage;
