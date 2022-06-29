/* ------------------------------ Basic imports ----------------------------- */
import React, {
  DetailedHTMLProps,
  FC,
  HTMLAttributes,
  VideoHTMLAttributes,
} from "react";
import "./iphoneXStyles.scss";

/* -------------------------------- Constants ------------------------------- */
import { IMAGES } from "../../constants/_images";

interface IphoneXProps extends HTMLAttributes<HTMLDivElement> {
  alt: string;
  videoSrc?: string;
  screenshotSrc?: string;
  videoProps?: DetailedHTMLProps<
    VideoHTMLAttributes<HTMLVideoElement>,
    HTMLVideoElement
  >;
}

const IphoneX: FC<IphoneXProps> = ({
  alt,
  videoSrc,
  screenshotSrc,
  videoProps = {},
  ...props
}) => {
  /* --------------------------------- Render --------------------------------- */

  return (
    <div {...props} className="iphoneX">
      <img
        className="iphoneX__body"
        src={IMAGES.Illustrations.IphoneX}
        alt={alt}
      />

      {videoSrc ? (
        <video
          autoPlay
          loop
          muted
          controls={false}
          {...videoProps}
          src={videoSrc}
        ></video>
      ) : null}

      {screenshotSrc ? (
        <img
          alt="screenshot"
          src={screenshotSrc}
          className="iphoneX__screenshot"
        />
      ) : null}
    </div>
  );
};

export default IphoneX;
