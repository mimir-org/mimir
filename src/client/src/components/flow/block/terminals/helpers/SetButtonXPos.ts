/**
 * Method to set the X position for the terminals menu's toggle button.
 * @param isParent
 * @param isInput
 * @param isRightPos
 * @returns a string.
 */
const SetButtonXPos = (isParent: boolean, isInput: boolean, isRightPos: boolean) => {
  if (isRightPos) {
    if (!isInput && isParent) return "10px";
    if (!isInput && !isParent) return "-1px";
    return "unset";
  }

  if (isInput && isParent) return "10px";
  if (isInput && !isParent) return "-1px";
  return "unset";
};

export default SetButtonXPos;
