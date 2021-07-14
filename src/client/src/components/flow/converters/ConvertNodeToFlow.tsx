import { FlowElement } from "react-flow-renderer";
import { Node } from "../../../models";
import { GetNodeType } from "../helpers/common";

const ConvertNodeToFlow = (node: Node, position) => {
  return {
    id: node.id,
    type: GetNodeType(node),
    data: node,
    position: position,
    isHidden: node.isHidden,
    isSelected: node.isSelected,
    draggable: true,
    selectable: true,
    connectable: true,
  } as FlowElement;
};

export default ConvertNodeToFlow;
