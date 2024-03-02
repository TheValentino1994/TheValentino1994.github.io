import { useMotionValue, useSpring } from "framer-motion";
import { useCallback, useRef } from "react";

export const useHoverSpring = () => {
  const ref = useRef<HTMLSpanElement>(null);

  const size = useMotionValue(10);
  const marginLeft = useMotionValue(4);
  const lineWidth = useMotionValue(12);

  const springWidth = useSpring(lineWidth, {
    stiffness: 600,
    damping: 15,
    mass: 1,
  });

  const springSize = useSpring(size, {
    stiffness: 600,
    damping: 15,
    mass: 1,
  });

  const springMarginLeft = useSpring(marginLeft, {
    stiffness: 600,
    damping: 15,
    mass: 1,
  });

  const handleHover = useCallback(
    (sizeValue: number, marginLeftValue: number, hoverEnd = false) =>
      () => {
        size.set(sizeValue);
        marginLeft.set(marginLeftValue);

        if (ref.current) {
          let element = ref.current;
          const rect = element.getBoundingClientRect();

          lineWidth.set(hoverEnd ? 12 : rect.width);
        }
      },
    []
  );

  return {
    ref,
    marginLeft: springMarginLeft,
    svgSize: springSize,
    width: springWidth,
    handleHover,
  };
};
