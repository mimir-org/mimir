import { useEffect, useRef, useState } from "react";

/**
 * Hook used for checking if "text-overflow: ellipsis" is active on a given element,
 * which in turn indicates that it is overflowing its boundary.
 */
export const useIsOverflowing = <T extends HTMLElement>() => {
  const [isOverflowing, setIsOverflowing] = useState(false);
  const overflowRef = useRef<T>(null);

  useEffect(() => {
    overflowRef?.current?.offsetWidth < overflowRef?.current?.scrollWidth ? setIsOverflowing(true) : setIsOverflowing(false);
  }, [overflowRef?.current?.offsetWidth, overflowRef?.current?.scrollWidth]);

  return {
    overflowRef,
    isOverflowing,
  };
};
