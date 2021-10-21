/**
 * Method to set the terminals menu's X position.
 * @param parent
 * @param electro
 * @param hasActiveTerminals
 * @param width
 * @returns a numeric value.
 */
const SetMenuXPos = (parent: boolean, electro: boolean, hasActiveTerminals: boolean, width: number) => {
  if (electro) return width + 5;
  if ((hasActiveTerminals && !parent) || (hasActiveTerminals && parent)) return width + 22;
  if ((!hasActiveTerminals && !parent) || (!hasActiveTerminals && parent)) return width + 5;
};

export default SetMenuXPos;
