/**
 * Method to set the terminals menu's X position.
 * @param parent
 * @param hasActiveTerminals
 * @param width
 * @returns a numeric value.
 */
const SetMenuXPos = (parent: boolean, hasActiveTerminals: boolean, width: number) => {
  if ((hasActiveTerminals && !parent) || (hasActiveTerminals && parent)) return width + 22;
  if ((!hasActiveTerminals && !parent) || (!hasActiveTerminals && parent)) return width + 4;
};

export default SetMenuXPos;
