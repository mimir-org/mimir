/**
 * Function to set the position of a TerminalsMenu button.
 * @param splitView
 * @param isParent
 * @param isInput
 * @returns a number used by the styled component TerminalsBox.
 */
const SetTerminalButtonPosition = (
  splitView: boolean,
  isParent: boolean,
  isInput: boolean
) => {
  if (!splitView) {
    if (isParent && isInput) return 930;
    if (isParent && !isInput) return 5;
    if (!isParent && isInput) return 112;
    if (!isParent && !isInput) return -1;
  }
};

export default SetTerminalButtonPosition;
