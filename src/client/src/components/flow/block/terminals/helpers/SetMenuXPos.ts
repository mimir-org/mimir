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
  const marginSmall = 22;
  const marginLarge = 200;

  if (electro) {
    if (!isParent) return node.width;
  }

  if (isParent) return node.width - marginLarge;
  if (hasActiveTerminals) return node.width + marginSmall;
  return node.width;
};

export default SetMenuXPos;
