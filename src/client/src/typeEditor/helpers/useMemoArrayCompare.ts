import { DependencyList, useMemo, useRef } from "react";

export const useMemoArrayCompare = <T, L extends any[]>(factoryFunc: () => T, deps: DependencyList, array: L) => {
  const prevArrayLengthRef = useRef<number>(array.length);

  if (prevArrayLengthRef.current !== array.length) {
    prevArrayLengthRef.current = array.length;
  }

  return useMemo(factoryFunc, [...deps, prevArrayLengthRef, factoryFunc]);
};
