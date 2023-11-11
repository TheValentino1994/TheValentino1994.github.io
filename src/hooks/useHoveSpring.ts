import { useMotionValue, useSpring } from "framer-motion";
import { useCallback } from "react";

export const useHoverSpring = () => {
  const size = useMotionValue(10);
  const marginLeft = useMotionValue(4);

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
    (sizeValue: number, marginLeftValue: number) => () => {
      size.set(sizeValue);
      marginLeft.set(marginLeftValue);
    },
    []
  );

  return {
    marginLeft: springMarginLeft,
    svgSize: springSize,
    handleHover,
  };
};
