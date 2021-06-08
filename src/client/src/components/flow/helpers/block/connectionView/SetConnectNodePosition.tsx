import { Size } from "../../../../../componentLibrary";
import { Node } from "../../../../../models/project";
import red from "../../../../../redux/store";
import { CalculateXPosition, CalculateYPosition } from ".";

const SetConnectNodePosition = (node: Node) => {
  const mainConnectNode = red.store.getState().connectView.mainNode as Node;
  const nodes = red.store.getState().projectState.project.nodes;
  const actualNode = nodes.find((x) => x.id === mainConnectNode?.id);
  const connectNodes = red.store.getState().connectView.connectNodes as Node[];

  const nodeHeight = actualNode ? actualNode.length : Size.ConnectView_Length;

  let xPos = actualNode ? actualNode.positionBlockX : node.positionBlockX;
  let yPos = actualNode
    ? actualNode.positionBlockY + nodeHeight / 2
    : node.positionBlockY;

  xPos = CalculateXPosition(node, xPos, connectNodes);
  yPos = CalculateYPosition(node, yPos, connectNodes);

  if (node !== actualNode) {
    node.positionBlockX = xPos;
    node.positionBlockY = yPos;
  }

  return { x: node.positionBlockX, y: node.positionBlockY };
};

export default SetConnectNodePosition;
