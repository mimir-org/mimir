import { CalculateXPosition, CalculateYPosition } from ".";
import { Size } from "../../../../../componentLibrary";
import { Node } from "../../../../../models/project";
import red from "../../../../../redux/store";

const SetConnectNodePosition = (node: Node) => {
  const mainConnectNode = red.store.getState().connectView.mainNode as Node;
  const nodes = red.store.getState().projectState.project.nodes;
  const actualNode = nodes.find((x) => x.id === mainConnectNode?.id);

  const connectNodes = red.store.getState().connectView.connectNodes as Node[];

  const nodeWidth = actualNode ? actualNode.width : Size.ConnectionView_Width;
  const nodeHeight = actualNode
    ? actualNode.length
    : Size.ConnectionView_Length;

  console.log({ nodeWidth });
  console.log({ nodeHeight });
  console.log(actualNode?.positionBlockX);
  console.log(actualNode?.positionBlockY);

  let xPos = actualNode ? actualNode.positionBlockX : 500;
  let yPos = actualNode ? actualNode.positionBlockY + nodeHeight / 2 : 500;

  xPos = CalculateXPosition(node, xPos, nodeWidth, connectNodes);
  yPos = CalculateYPosition(node, yPos, nodeHeight, connectNodes);

  if (node !== actualNode) {
    node.positionBlockX = xPos;
    node.positionBlockY = yPos;
  }

  return { x: node.positionBlockX, y: node.positionBlockY };
};

export default SetConnectNodePosition;
