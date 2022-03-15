import { TypeEditorSize } from "../assets/TypeEditorSize";

/**
 * Calculate and return height of Choose Properties lists in Type Editor.
 * @param isFull Whether to use full size of Properties list, or shrunk. Inverse of whether Inspector is open.
 * @returns Height of Properties list
 */
export const GetPropertiesHeight = (isFull: boolean) => {
  return (
    document.body.clientHeight + (isFull ? TypeEditorSize.PROPERTIES_FULL_BASELINE : TypeEditorSize.PROPERTIES_SHRUNK_BASELINE)
  );
};

export default GetPropertiesHeight;
