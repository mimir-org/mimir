/**
 * Function to force a node to fit within the parent block in BlockView.
 * @param nodePos
 * @param parentPos
 * @returns an updated position, containing X and Y values.
 */
const SetBlockNodePos = (nodePos: { x: number; y: number }, parentPos: { x: number; y: number }) => {
  const parentX = parentPos.x;
  const parentY = parentPos.y;
  const nodeY = nodePos.y;
  const dy = nodeY + parentY;
  const dx = parentX + 100;

  return { x: dx, y: dy };
};

export default SetBlockNodePos;
