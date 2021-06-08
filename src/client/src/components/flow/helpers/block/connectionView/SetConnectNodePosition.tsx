import { Node } from "../../../../../models/project";
import red from "../../../../../redux/store";
import { CalculateXPosition, CalculateYPosition } from ".";

const SetConnectNodePosition = (node: Node) => {
  const mainConnectNode = red.store.getState().connectView.mainNode as Node;
  const nodes = red.store.getState().projectState.project.nodes;
  const actualNode = nodes.find((x) => x.id === mainConnectNode?.id);
  const connectNodes = red.store.getState().connectView.connectNodes as Node[];

  const xPos = CalculateXPosition(
    node,
    actualNode?.positionBlockX,
    connectNodes
  );
  const yPos = CalculateYPosition(
    node,
    actualNode?.positionBlockY,
    connectNodes
  );

  if (node !== actualNode) {
    node.positionBlockX = xPos;
    node.positionBlockY = yPos;
  }

  return { x: node.positionBlockX, y: node.positionBlockY };
};

export default SetConnectNodePosition;
