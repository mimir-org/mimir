import { Node } from "../../../../../models";

/**
 * Method to set the terminal menu's X position.
 * @param isParent
 * @param electro
 * @param hasActiveTerminals
 * @param node
 * @returns a numeric value.
 */
const SetMenuXPos = (isParent: boolean, electro: boolean, hasActiveTerminals: boolean, node: Node) => {
  const marginSmall = 0;
  const marginLarge = 22;

  if (electro) {
    if (!isParent) return node.width + marginSmall;
  }

  if (isParent) return node.width - marginSmall;
  if (hasActiveTerminals) return node.width + marginLarge;
  return node.width - marginSmall;
};

export default SetMenuXPos;
