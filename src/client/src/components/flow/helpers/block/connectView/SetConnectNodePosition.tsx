import red from "../../../../../redux/store";
import { Node } from "../../../../../models";
import { CalculateXPosition, CalculateYPosition } from ".";
import { Size } from "../../../../../compLibrary";

const SetConnectNodePosition = (node: Node, mainConnectNodeId: string) => {
  const nodes = red.store.getState().projectState.project.nodes;
  const mainConnectNode = nodes.find((x) => x.id === mainConnectNodeId);
  const connectNodes = red.store.getState().connectView.connectNodes as Node[];

  let xPos = mainConnectNode
    ? mainConnectNode.positionBlockX
    : node.positionBlockX;
  let yPos = mainConnectNode
    ? mainConnectNode.positionBlockY
    : node.positionBlockY;

  xPos = CalculateXPosition(node, xPos, connectNodes, mainConnectNodeId);
  yPos = CalculateYPosition(node, yPos, connectNodes);
  if (connectNodes.length === 0) yPos -= Size.Node_Length;

  if (node !== mainConnectNode) {
    node.positionBlockX = xPos;
    node.positionBlockY = yPos;
  }

  return { x: node.positionBlockX, y: node.positionBlockY };
};

export default SetConnectNodePosition;
