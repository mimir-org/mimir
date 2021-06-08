import { UpdateConnectNodeSize } from ".";
import { Size } from "../../../../../componentLibrary";
import { Node } from "../../../../../models/project";

const CalculateXPosition = (
  node: Node,
  xPos: number,
  connectNodes: Node[]
): number => {
  const margin = 7;

  if (connectNodes.length === 1) {
    return (xPos += Size.ConnectView_Width / 2 - Size.Node_Width / 2);
  }

  if (connectNodes.length === 2) {
    if (node.id === connectNodes[0].id) {
      return (xPos +=
        Size.ConnectView_Width / 4 - Size.Node_Width / 2 + margin);
    }

    if (node.id === connectNodes[1].id) {
      return (xPos +=
        Size.ConnectView_Width / 2 +
        Size.ConnectView_Width / 4 -
        Size.Node_Width / 2 -
        margin);
    }
  }

  // NEED TO RESIZE HEIGHT
  if (connectNodes.length === 3) {
    UpdateConnectNodeSize(connectNodes.length);

    if (node.id === connectNodes[0].id) {
      return (xPos +=
        Size.ConnectView_Width / 4 - Size.Node_Width / 2 + margin);
    }

    if (node.id === connectNodes[1].id) {
      return (xPos +=
        Size.ConnectView_Width / 2 +
        Size.ConnectView_Width / 4 -
        Size.Node_Width / 2 -
        margin);
    }

    if (node.id === connectNodes[2].id) {
      return (xPos +=
        Size.ConnectView_Width / 4 - Size.Node_Width / 2 + margin);
    }
  }

  if (connectNodes.length === 4) {
    if (node.id === connectNodes[0].id) {
      return (xPos +=
        Size.ConnectView_Width / 4 - Size.Node_Width / 2 + margin);
    }

    if (node.id === connectNodes[1].id) {
      return (xPos +=
        Size.ConnectView_Width / 2 +
        Size.ConnectView_Width / 4 -
        Size.Node_Width / 2 -
        margin);
    }

    if (node.id === connectNodes[2].id) {
      return (xPos +=
        Size.ConnectView_Width / 4 - Size.Node_Width / 2 + margin);
    }

    if (node.id === connectNodes[3].id) {
      return (xPos +=
        Size.ConnectView_Width / 2 +
        Size.ConnectView_Width / 4 -
        Size.Node_Width / 2 -
        margin);
    }
  }

  return xPos;
};

export default CalculateXPosition;
