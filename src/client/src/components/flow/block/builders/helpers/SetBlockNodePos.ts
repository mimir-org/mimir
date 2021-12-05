import { Size } from "../../../../../compLibrary/size";
import { BlockNodeSize, Position } from "../../../../../models/project";

/**
 * Function to force a node to fit within the parent block in BlockView.
 * @param nodePos
 * @param parentPos
 * @param parentNodeSize
 * @returns an updated position, containing X and Y values.
 */

const SetBlockNodePos = (nodePos: Position, parentPos: Position, parentNodeSize: BlockNodeSize) => {
  const margin = 20;

  const xMin = parentPos.x;
  const xMax = parentPos.x + parentNodeSize?.width - Size.Node_Width;
  const yMin = parentPos.y + margin;
  const yMax = parentPos.y + parentNodeSize?.height - Size.Node_Height;

  let nodeY = nodePos.y;
  let nodeX = nodePos.x;

  if (nodeX < xMin) nodeX = xMin + margin;
  if (nodeX > xMax) nodeX = xMax - margin;
  if (nodeY < yMin) nodeY = yMin + margin * 2;
  if (nodeY > yMax) nodeY = yMax - margin;

  return { x: nodeX, y: nodeY };
};

export default SetBlockNodePos;
