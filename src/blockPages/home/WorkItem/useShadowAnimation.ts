import { MotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { useMediaQuery } from "../../../hooks/useMediaQuery";
import { useLocation } from "react-router-dom";

interface AnimationParams {
  scrollY: MotionValue<number>;
  title: string;
}

type Breakpoint = {
  start: number;
  end: number;
};

const initialBreakpoints = {
  start: 0,
  end: 0,
};

const prevBreakPoints: Map<string, Breakpoint> = new Map();

export const useShadowAnimation = ({ scrollY, title }: AnimationParams) => {
  const ref = useRef<HTMLLIElement>(null);

  const isResponsive = useMediaQuery("(max-width: 1024px)");

  const [breakpoints, setBreakpoints] = useState(
    prevBreakPoints.get(title) ?? initialBreakpoints
  );

  const interpolatedValue = useTransform(
    scrollY,
    Object.values(breakpoints),
    [0, 1],
    {
      clamp: true,
    }
  );

  const animatedOpacity = useSpring(interpolatedValue, { duration: 200 });

  useEffect(() => {
    const isRendered = prevBreakPoints.has(title);

    if (ref.current && !isRendered && !isResponsive) {
      let element = ref.current;
      let originalPosition = element.style.position;
      element.style.position = "static";
      const rect = element.getBoundingClientRect();

      const value = {
        start: rect.top,
        end: rect.top + rect.height,
      };

      setBreakpoints(value);
      element.style.position = originalPosition;
      prevBreakPoints.set(title, value);
    }
  }, []);

  return useMemo(
    () => ({
      opacity: isResponsive ? 0 : animatedOpacity,
      ref,
    }),
    [isResponsive, animatedOpacity]
  );
};
