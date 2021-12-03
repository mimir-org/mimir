import { Node } from "../../../../../models";
import { BlockNodeSize } from "../../../../../models/project";

/**
 * Method to set the terminal menu's X position.
 * @param isParent
 * @param electro
 * @param hasActiveTerminals
 * @param node
 * @param parentBlockSize
 * @returns a numeric value.
 */
const SetMenuXPos = (
  isParent: boolean,
  electro: boolean,
  hasActiveTerminals: boolean,
  node: Node,
  parentBlockSize: BlockNodeSize
) => {
  const marginSmall = 5;
  const marginLarge = 23;

  if (electro) {
    if (!isParent) return node.width + marginSmall;
  }

  if (isParent) return parentBlockSize.width + marginSmall;
  if (hasActiveTerminals) return node.width + marginLarge;
  return node.width + marginSmall;
};

export default SetMenuXPos;
