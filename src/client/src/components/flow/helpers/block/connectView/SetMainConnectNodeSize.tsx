import { FindNodeById } from ".";
import { Size } from "../../../../../compLibrary";
import { Node } from "../../../../../models";

const SetMainConnectNodeSize = (
  mainConnectNodeId: string,
  nodeId: string,
  connectNodes?: Node[]
) => {
  let mainConnectNode = FindNodeById(mainConnectNodeId);

  if (mainConnectNode !== null) {
    mainConnectNode.style.width = `${Size.ConnectView_Width}px`;
    mainConnectNode.style.height = `${Size.ConnectView_Length}px`;
    mainConnectNode.style.zIndex = "1";
  }

  // Resize MainConnectNode to large block
  //   if (connectNodes?.length > 0 && mainConnectNode) {
  //     mainConnectNode.style.width = `${Size.ConnectView_Width}px`;
  //     mainConnectNode.style.height = `${Size.ConnectView_Length}px`;
  //     mainConnectNode.style.zIndex = "1";
  //   }
  // Reset MainConnectNode to normal
  //   else {
  //     let node = FindNodeById(nodeId);
  //     node.style.width = `${Size.Node_Width}px`;
  //     node.style.height = `${Size.Node_Length}px`;
  //   }
};

export default SetMainConnectNodeSize;
