import { FindNodeByDataId } from "..";
import { Color } from "../../../../../compLibrary";
import { Node } from "../../../../../models";

const SetMainConnectNodeSize = (
  mainConnectNodeId: string,
  nodeId: string,
  connectNodes?: Node[]
) => {
  let mainConnectNode = FindNodeByDataId(mainConnectNodeId);

  // Set new background color
  if (mainConnectNode && connectNodes?.length > 0)
    mainConnectNode.style.background = Color.FunctionHeader;
  // Reset color to normal
  else {
    let node = FindNodeByDataId(nodeId);
    if (node) node.style.background = Color.FunctionBlock;
  }
};

export default SetMainConnectNodeSize;
