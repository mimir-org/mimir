import { Node } from "../../../../../../../models";

export const OnClickNode = (node: Node, setActiveFlowElement: (elementId: string) => void) => {
  setActiveFlowElement(node.id);
};
