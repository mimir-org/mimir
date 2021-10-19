import { createSelector, OutputParametricSelector } from "@reduxjs/toolkit";
import { useMemo } from "react";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from ".";

/**
 * Custom Dispatch hook used within application.
 */
export const useAppDispatch = useDispatch;

/**
 * Custom createSelector hook used within application.
 */

export const createAppSelector = createSelector;

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
export const useParametricAppSelector = <P, R>(selector: OutputParametricSelector<RootState, P, R, any>, props: P) => {
  return useAppSelector((state) => selector(state, props));
};

/**
 * Custom hook to conveniently pass props as parameters to a **unique** selector.
 * The hook ensures to properly memoize the selector, and should be used whenever a component uses a selector, and there exist multiple instances of the component.
 * Simplifies the following pattern:
 *
 * @example
 *
 *
 *
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
