import { useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import _ from "lodash";

export const useIntroAnimation = () => {
  const ref = useRef<HTMLLIElement>(null);

  const { scrollY } = useScroll();
  const [introHeight, setIntroHeight] = useState(0);

  const interpolatedOpacity = useTransform(
    scrollY,
    [0, introHeight / 2],
    [1, 0],
    {
      clamp: true,
    }
  );

  const interpolatedScale = useTransform(
    scrollY,
    [0, introHeight / 2],
    [1, 0.9],
    {
      clamp: true,
    }
  );
  const opacity = useSpring(interpolatedOpacity, { duration: 200 });
  const scale = useSpring(interpolatedScale, { duration: 200 });

  useEffect(() => {
    if (ref.current) {
      let element = ref.current;
      const rect = element.getBoundingClientRect();

      setIntroHeight(rect.height);
    }
  }, []);

  return { opacity, ref, scale };
};
