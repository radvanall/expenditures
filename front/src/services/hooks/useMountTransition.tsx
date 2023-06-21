import { useState, useEffect } from "react";

export const useMountTransition = (isMouted: boolean, unmountDelay: number) => {
  const [hasTransitionedIn, setHasTransitionedIn] = useState(false);
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (isMouted && !hasTransitionedIn) {
      setHasTransitionedIn(true);
    } else if (!isMouted && hasTransitionedIn) {
      timeoutId = setTimeout(() => {
        setHasTransitionedIn(false);
      }, unmountDelay);
    }
    return () => {
      clearTimeout(timeoutId);
    };
  }, [isMouted, hasTransitionedIn, unmountDelay]);
  return hasTransitionedIn;
};
