import { createSelector, OutputParametricSelector, OutputSelector, ParametricSelector } from "@reduxjs/toolkit";
import { useMemo } from "react";
import { useDispatch, TypedUseSelectorHook, useSelector, Selector } from "react-redux";
import { RootState } from ".";

/**
 * Custom Dispatch hook used within application.
 */
export const useAppDispatch = useDispatch;

/**
 * Custom createSelector hook used within application, with type linting.
 */

export const createAppSelector: <R, T>(
  selector: Selector<RootState, R>,
  combiner: (res: R) => T
) => OutputSelector<RootState, T, (res: R) => T> = createSelector;

export const createParametricAppSelector: <R1, R2, P, T>(
  selector1: ParametricSelector<RootState, P, R1>,
  selector2: ParametricSelector<RootState, P, R2>,
  combiner: (res1: R1, res2: R2) => T
) => OutputParametricSelector<RootState, P, T, (res1: R1, res2: R2) => T> = createSelector;

/**
 * Custom useSelector hook with type linting.
 */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

/**
 * Custom hook to conveniently pass props as parameters to a selector.
 * Simplifies the following pattern:
 *
 * @example
 * const values = useAppSelector((state) => selector(state, props))
 *
 * into:
 *
 * @example
 * const values = useParametricAppSelector(selector, props);
 */
export const useParametricAppSelector = <P, R, C>(selector: OutputParametricSelector<RootState, P, R, C>, props: P) => {
  return useAppSelector((state) => selector(state, props));
};

/**
 * Custom hook to conveniently pass props as parameters to a **unique** selector.
 * The hook ensures to properly memoize the selector, and should be used whenever a component uses a selector, and there exist multiple instances of the component.
 * Simplifies the following pattern:
 *
 * @example
 * const selector = useMemo(selectorFactoryFunc, [selectorFactoryFunc])
 * const values = useAppSelector((state) => selector(state, props))
 *
 * into:
 *
 * @example
 * const values = useUniqueParametricAppSelector(selectorFactoryFunc, props);
 */
export const useUniqueParametricAppSelector = <P, R>(
  selectorFactoryFunc: () => OutputParametricSelector<RootState, P, R, any>,
  props: P
) => {
  const selector = useMemo(selectorFactoryFunc, [selectorFactoryFunc]);

  return useAppSelector((state) => selector(state, props));
};
