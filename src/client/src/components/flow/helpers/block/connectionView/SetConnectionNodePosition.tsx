import { CalculateXPosition, CalculateYPosition } from ".";
import { Node } from "../../../../../models/project";
import red from "../../../../../redux/store";

const SetConnectionNodePosition = (node: Node, splitView: boolean) => {
  const connectionNode = red.store.getState().connectView.mainNode as Node;
  const actualNode = red.store
    .getState()
    .projectState.project.nodes.find(
      (x) => x.id === connectionNode?.id
    ) as Node;

  const connectionNodes = red.store.getState().connectView
    .connectNodes as Node[];

  const nodeWidth = actualNode?.width;
  const nodeHeight = actualNode?.length;

  let xPos = actualNode?.positionBlockX;
  let yPos = actualNode?.positionBlockY + nodeHeight / 2;

  xPos = CalculateXPosition(node, xPos, nodeWidth, connectionNodes);
  yPos = CalculateYPosition(node, yPos, nodeWidth, connectionNodes);

  if (node !== actualNode) {
    node.positionBlockX = xPos;
    node.positionBlockY = yPos;
  }

  return { x: node.positionBlockX, y: node.positionBlockY };
};

export default SetConnectionNodePosition;

//   if (node.positionBlockX < xMin) node.positionBlockX = xMin + 10;
//   if (node.positionBlockX > xMax) node.positionBlockX = xMax - 10;
//   if (node.positionBlockY < yMin) node.positionBlockY = yMin + 100;
//   if (node.positionBlockY > yMax) node.positionBlockY = yMax;
//   const xMax = actualNode?.positionBlockX + (nodeWidth - Size.Node_Width);
// const yMax = actualNode?.positionBlockY + 230;
