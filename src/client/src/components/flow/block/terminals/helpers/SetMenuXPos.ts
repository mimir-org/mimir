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
  if (electro) {
    if (isParent) return parentBlockSize.width + 5;
    return node.width + 5;
  }

  if (hasActiveTerminals && !isParent) return node.width + 22;
  if (hasActiveTerminals && isParent) return parentBlockSize.width + 22;
  if (!hasActiveTerminals && !isParent) return node.width + 5;
  if (!hasActiveTerminals && isParent) return parentBlockSize.width + 5;
};

export default SetMenuXPos;
