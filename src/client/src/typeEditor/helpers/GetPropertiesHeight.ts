import { Size } from "../../compLibrary";

const CLIENT_HEIGHT_BASELINE = 927;

/**
 * Calculate height of Choose Properties lists in Type Editor.
 * Uses a clientHeight of 927px (Firefox 1080p) as baseline.
 * @param isFull
 * @returns
 */
export const GetPropertiesHeight = (isFull: boolean): number => {
  return (
    (isFull ? Size.TypeEditorPropertiesFull_BASELINE : Size.TypeEditorPropertiesShrunk_BASELINE) +
    document.body.clientHeight -
    CLIENT_HEIGHT_BASELINE
  );
};
