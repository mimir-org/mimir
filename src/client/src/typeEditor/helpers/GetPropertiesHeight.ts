import { Size } from "../../compLibrary";

/**
 * Calculate height of Choose Properties lists in Type Editor. Uses 1080p as a baseline.
 * @param isFull
 * @returns
 */
export const GetPropertiesHeight = (isFull: boolean): number => {
  return (
    (isFull ? Size.TypeEditorPropertiesFull_1080 : Size.TypeEditorPropertiesShrunk_1080) + window.screen.height - 1080
  );
};
