import { MotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import _ from "lodash";

interface AnimationParams {
  scrollY: MotionValue<number>;
}
export const useShadowAnimation = ({ scrollY }: AnimationParams) => {
  const ref = useRef<HTMLLIElement>(null);
  const [breakpoints, setBreakpoints] = useState({
    start: 0,
    end: 0,
  });

  const interpolatedValue = useTransform(
    scrollY,
    Object.values(breakpoints),
    [0, 1],
    {
      clamp: true,
    }
  );

  const opacity = useSpring(interpolatedValue, { duration: 200 });

  useEffect(() => {
    if (ref.current) {
      let element = ref.current;
      let originalPosition = element.style.position;
      element.style.position = "static";
      const rect = element.getBoundingClientRect();

      setBreakpoints({
        start: rect.top,
        end: rect.top + rect.height,
      });
      element.style.position = originalPosition;
    }
  }, []);

  return { opacity, ref };
};
