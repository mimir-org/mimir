/**
 * Function to set the position of the terminals menu.
 * @param splitView
 * @param isParent
 * @param isInput
 * @returns a number used by the styled component TerminalsMenu.
 */
const SetTerminalsMenuPosition = (
  splitView: boolean,
  isParent: boolean,
  isInput: boolean
) => {
  if (!splitView) {
    if (isParent && !isInput) return 960;
    if (!isParent && !isInput) return 137;
    if (!isParent && isInput) return -206;
  }

  if (splitView) {
    if (isParent && !isInput) return 660;
  }

  if (isParent && isInput) return -201;
};

export default SetTerminalsMenuPosition;
