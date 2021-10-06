import { FindNodeByDataId } from "../../helpers";
import { Color } from "../../../../../compLibrary";
import { Node } from "../../../../../models";
import { IsFunction } from "../../../helpers";

const SetConnectNodeColor = (mainConnectNodeId: string, connectNodes: Node[], data: Node) => {
  const mainConnectNode = FindNodeByDataId(mainConnectNodeId);
  const mainColor = IsFunction(data) ? Color.FunctionMain : Color.ProductMain;
  const headerColor = IsFunction(data) ? Color.FunctionHeader : Color.ProductHeader;

  // Set new background color
  if (mainConnectNode && connectNodes?.length > 0) mainConnectNode.style.background = headerColor;
  // Reset color to normal
  else {
    const node = FindNodeByDataId(data.id);
    if (node) node.style.background = mainColor;
  }
};

export default SetConnectNodeColor;
