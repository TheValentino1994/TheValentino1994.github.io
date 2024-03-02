import { useEffect, useState } from "react";

export function useMediaQuery(query: string, defaultValue = false) {
  const [matches, setMatches] = useState(defaultValue);

  useEffect(() => {
    const media = window.matchMedia(query);

    if (media.matches !== matches) {
      setMatches(media.matches);
    }

    media.onchange = () => {
      setMatches(media.matches);
    };
  }, [matches, query]);

  return matches;
}
