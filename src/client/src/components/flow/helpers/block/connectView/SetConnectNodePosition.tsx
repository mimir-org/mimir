import red from "../../../../../redux/store";
import { Node } from "../../../../../models";
import { CalculateXPosition, CalculateYPosition } from ".";
import { Size } from "../../../../../compLibrary";

const SetConnectNodePosition = (
  node: Node,
  mainConnectNodeId: string,
  connectNodes: Node[]
) => {
  const nodes = red.store.getState().projectState.project.nodes as Node[];
  const mainNode = nodes.find((x) => x.id === mainConnectNodeId);

  let xPos = mainNode ? mainNode.positionBlockX : node.positionBlockX;
  let yPos = mainNode ? mainNode.positionBlockY : node.positionBlockY;

  xPos = CalculateXPosition(node, xPos, connectNodes, mainNode);
  yPos = CalculateYPosition(node, yPos, connectNodes);
  if (connectNodes?.length === 0) yPos -= Size.Node_Length;

  if (node !== mainNode) {
    node.positionBlockX = xPos;
    node.positionBlockY = yPos;
  }

  return { x: node.positionBlockX, y: node.positionBlockY };
};

export default SetConnectNodePosition;
