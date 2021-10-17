import { GetNodeByDataId } from "../../helpers";
import { Color } from "../../../../../compLibrary";
import { Node } from "../../../../../models";
import { IsFunction } from "../../../helpers";

const SetConnectNodeColor = (mainConnectNodeId: string, connectNodes: Node[], data: Node) => {
  const mainConnectNode = GetNodeByDataId(mainConnectNodeId);
  const mainColor = IsFunction(data) ? Color.FunctionMain : Color.ProductMain;
  const headerColor = IsFunction(data) ? Color.FunctionHeader : Color.ProductHeader;

  // Set new background color
  if (mainConnectNode && connectNodes?.length > 0) {
    mainConnectNode.style.background = headerColor;
    return;
  }
  // Reset color to normal
  const node = GetNodeByDataId(data.id);
  if (node) node.style.background = mainColor;
};

export default SetConnectNodeColor;
