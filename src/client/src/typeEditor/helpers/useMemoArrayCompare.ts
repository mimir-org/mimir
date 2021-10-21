import { DependencyList, useMemo, useRef } from "react";

export const useMemoArrayCompare = <T, L extends any[]>(factoryFunc: () => T, deps: DependencyList, array: L) => {
  const prevAttributeTypeLengthRef = useRef<number>(array.length);

  if (prevAttributeTypeLengthRef.current !== array.length) {
    prevAttributeTypeLengthRef.current = array.length;
  }

  return useMemo(factoryFunc, [...deps, prevAttributeTypeLengthRef, factoryFunc]);
};
