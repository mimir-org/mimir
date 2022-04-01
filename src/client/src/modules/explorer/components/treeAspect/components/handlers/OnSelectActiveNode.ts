import { Node as FlowNode } from "react-flow-renderer";
import { SetFlowNodeFunction } from "../../../../../../helpers";
import { Node } from "../../../../../../models";

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

  // This means that element has been deselected
  if (isAlreadySelected) {
    console.log("DESELECT? FØR: ", tempArray);
    tempArray = tempArray.filter((n) => n !== mimirNode.id);
    console.log("DESELECT? ETTER: ", tempArray);
  } else {
    // This means that the element has been selected
    console.log("ADD NEW SELECT FØR: ", tempArray);
    const selectedNode = mimirNodes.find((n) => n.id === mimirNode.id);
    if (selectedNode) tempArray.push(selectedNode.id);
    console.log("ADD NEW SELECT ETTER: ", tempArray);
  }

  setActiveFlowNode(tempArray);
};
