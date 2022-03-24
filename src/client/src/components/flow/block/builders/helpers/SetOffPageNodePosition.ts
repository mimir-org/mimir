import { Size } from "../../../../../compLibrary/size";
import { Node } from "../../../../../models";

/**
 * Component to force an OffPageNode to fit into the position of the ParentNode.
 * @param offPageNode
 * @param parentNode
 * @returns an updated position, containing X and Y values.
 */
const SetOffPageNodePosition = (offPageNode: Node, parentNode: Node) => {
  if (!offPageNode || !parentNode) return null;

  let marginX = 0;

  const defaultWidth = Size.BLOCK_NODE_WIDTH;
  if (parentNode.width !== defaultWidth) marginX = 30;

  const x = parentNode.positionBlockX + parentNode.width - marginX;
  const y = offPageNode.positionBlockY;

  return { x, y };
};

export default SetOffPageNodePosition;
