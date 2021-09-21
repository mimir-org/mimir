import { FindNodeById } from "../";
import { Size } from "../../../../../compLibrary";
import { Node } from "../../../../../models";

const SetMainConnectNodeSize = (
  mainConnectNodeId: string,
  nodeId: string,
  connectNodes?: Node[]
) => {
  let mainConnectNode = FindNodeById(mainConnectNodeId);

  // Resize MainConnectNode to large block
  if (mainConnectNode && connectNodes?.length > 0) {
    mainConnectNode.style.width = `${Size.ConnectView_Width}px`;
    mainConnectNode.style.height = `${Size.ConnectView_Length}px`;
    mainConnectNode.style.zIndex = "1";
  }
  // Reset MainConnectNode to normal
  else {
    let node = FindNodeById(nodeId);
    if (node) {
      node.style.width = `${Size.Node_Width}px`;
      node.style.height = `${Size.Node_Length}px`;
    }
  }
};

export default SetMainConnectNodeSize;
