import { Node } from "../../../../../models";

/**
 * Method to set the terminal menu's X position.
 * @param parent
 * @param electro
 * @param hasActiveTerminals
 * @param node
 * @returns a numeric value.
 */
const SetMenuXPos = (parent: boolean, electro: boolean, hasActiveTerminals: boolean, node: Node) => {
  if (electro) return node.width + 5;

  if (hasActiveTerminals && !parent) return node.width + 22;
  if (hasActiveTerminals && parent) return node.blockWidth + 22;
  if (!hasActiveTerminals && !parent) return node.width + 5;
  if (!hasActiveTerminals && parent) return node.width + 5;
};

export default SetMenuXPos;
