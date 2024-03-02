import { useScroll, useTransform } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import _ from "lodash";
import { useMediaQuery } from "../../../hooks/useMediaQuery";

export const useHeaderAnimation = () => {
  const ref = useRef<HTMLLIElement>(null);

  const isResponsive = useMediaQuery("(max-width: 1024px)");

  const { scrollY } = useScroll();
  const [headerHeight, setHeaderHeight] = useState(0);

  const interpolatedTransition = useTransform(
    scrollY,
    [184 - 56, 184 + headerHeight],
    [0, -headerHeight],
    {
      clamp: true,
    }
  );

  useEffect(() => {
    if (ref.current) {
      let element = ref.current;
      const rect = element.getBoundingClientRect();

      setHeaderHeight(rect.height);
    }
  }, []);

  return useMemo(
    () => ({
      y: isResponsive ? 0 : interpolatedTransition,
      ref,
    }),
    [interpolatedTransition, isResponsive]
  );
};
