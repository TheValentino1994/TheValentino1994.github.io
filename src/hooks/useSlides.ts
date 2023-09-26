import { useCallback, useEffect, useRef, useState } from "react";

export const useSlides = (
  slidesCount: number,
  time: number,
  isTimeout?: boolean
): { slideToShow: number; runSlides: () => void } => {
  const [slideToShow, setSlideToShow] = useState<number>(0);

  let interval = useRef<ReturnType<typeof setInterval> | undefined>();

  const runSlides = useCallback(() => {
    interval.current = (isTimeout ? setTimeout : setInterval)(() => {
      setSlideToShow((prev) => {
        if (prev !== slidesCount - 1) return 1 + prev;
        else return 0;
      });
    }, time);
  }, [slidesCount, time, isTimeout]);

  useEffect(() => {
    runSlides();

    return () => {
      if (interval.current) clearInterval(interval.current);
    };
  }, []);

  return { slideToShow, runSlides };
};
