import { Node as FlowNode } from "react-flow-renderer";
import { SetFlowNodeFunction } from "../../../../../../../helpers";
import { Node } from "../../../../../../../models";

export const OnSelectActiveNode = (
  mimirNode: Node,
  mimirNodes: Node[],
  selectedFlowNodes: FlowNode[],
  setActiveFlowNode: SetFlowNodeFunction
) => {
  let tempArray: string[] = [];

  selectedFlowNodes?.forEach((n) => {
    const selectedMimirNode = mimirNodes.find((x) => x.id === n.id);
    if (selectedMimirNode) tempArray.push(selectedMimirNode.id);
  });

  const isAlreadySelected = tempArray.some((x) => x === mimirNode.id);

  // Element has been deselected
  if (isAlreadySelected) {
    tempArray = tempArray.filter((n) => n !== mimirNode.id);
  } else {
    // Element has been selected
    const selectedNode = mimirNodes.find((n) => n.id === mimirNode.id);
    if (selectedNode) tempArray.push(selectedNode.id);
  }

  setActiveFlowNode(tempArray);
};
