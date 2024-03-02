import { useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import _ from "lodash";
import { useMediaQuery } from "../../../hooks/useMediaQuery";

export const useIntroAnimation = () => {
  const ref = useRef<HTMLLIElement>(null);

  const isResponsive = useMediaQuery("(max-width: 1024px)", true);

  console.log(isResponsive);

  const { scrollY } = useScroll();
  const [introHeight, setIntroHeight] = useState(0);

  const interpolatedTransitionTop = useTransform(
    scrollY,
    [0, 184],
    [0, 56 - 184],
    {
      clamp: true,
    }
  );

  const interpolatedOpacity = useTransform(
    scrollY,
    [184, 184 + introHeight / 2],
    [1, 0],
    {
      clamp: true,
    }
  );

  const interpolatedScale = useTransform(
    scrollY,
    [184, 184 + introHeight / 2],
    [1, 0.9],
    {
      clamp: true,
    }
  );
  const animatedOpacity = useSpring(interpolatedOpacity, { duration: 200 });
  const animatedScale = useSpring(interpolatedScale, { duration: 200 });

  useEffect(() => {
    if (ref.current) {
      let element = ref.current;
      const rect = element.getBoundingClientRect();

      setIntroHeight(rect.height);
    }
  }, []);

  return {
    opacity: isResponsive ? 1 : animatedOpacity,
    scale: isResponsive ? 1 : animatedScale,
    translateY: isResponsive ? 0 : interpolatedTransitionTop,
    ref,
  };
};
