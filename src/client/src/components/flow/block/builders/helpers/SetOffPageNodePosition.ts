import { Node } from "../../../../../models";

/**
 * Component to force an OffPageNode to fit into the position of the ParentNode.
 * @param offPageNode
 * @param parentNode
 * @returns an updated position, containing X and Y values.
 */
const SetOffPageNodePosition = (offPageNode: Node, parentNode: Node) => {
  const x = parentNode.positionBlockX + parentNode.width;
  const y = offPageNode.positionBlockY;

  return { x, y };
};

export default SetOffPageNodePosition;
