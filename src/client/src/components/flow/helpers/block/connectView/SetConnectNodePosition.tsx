import { Node } from "../../../../../models/project";
import red from "../../../../../redux/store";
import { CalculateXPosition, CalculateYPosition } from ".";
import { Size } from "../../../../../compLibrary";

const SetConnectNodePosition = (node: Node) => {
  const mainConnectNode = red.store.getState().connectView.mainNode as Node;
  const nodes = red.store.getState().projectState.project.nodes;
  const actualNode = nodes.find((x) => x.id === mainConnectNode?.id);
  const connectNodes = red.store.getState().connectView.connectNodes as Node[];

  let xPos = actualNode ? actualNode.positionBlockX : node.positionBlockX;
  let yPos = actualNode ? actualNode.positionBlockY : node.positionBlockY;

  xPos = CalculateXPosition(node, xPos, connectNodes);
  yPos = CalculateYPosition(node, yPos, connectNodes);
  if (connectNodes.length === 0) yPos -= Size.Node_Length;

  if (node !== actualNode) {
    node.positionBlockX = xPos;
    node.positionBlockY = yPos;
  }

  return { x: node.positionBlockX, y: node.positionBlockY };
};

export default SetConnectNodePosition;
