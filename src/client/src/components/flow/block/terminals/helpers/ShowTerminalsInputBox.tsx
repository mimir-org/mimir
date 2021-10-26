import { Connector, Node } from "../../../../../models";
import { IsAspectNode, IsFunction } from "../../../helpers";

const ShowTerminalsInputBox = (splitView: boolean, menuBox: boolean, node: Node, inTerminals: Connector[]) => {
  if (!splitView) return menuBox && !IsAspectNode(node) && inTerminals.length > 0;
  return menuBox && !IsAspectNode(node) && inTerminals.length > 0 && !IsFunction(node);
};

export default ShowTerminalsInputBox;
