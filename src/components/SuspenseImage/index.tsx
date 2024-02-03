/* ------------------------------ Basic imports ----------------------------- */
import React, { FC, ImgHTMLAttributes } from "react";

/* -------------------------------- Constants ------------------------------- */
import { SuspenseAsset } from "../../utils/SuspenseAsset";

const SuspenseImage: FC<ImgHTMLAttributes<HTMLImageElement>> = (props) => {
  SuspenseAsset.getInstance()
    .loadAsset(props.src as string)
    .read();

  /* --------------------------------- Render --------------------------------- */
  return <img {...props} />;
};

export default SuspenseImage;
