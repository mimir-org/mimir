import { useEffect, useState } from "react";

export const useEffectOnce = (callback) => {
  const [hasRun, setHasRun] = useState(false);

  useEffect(() => {
    if (callback && !hasRun) {
      callback();
      setHasRun(true);
    }
  }, [hasRun, callback]);
};
