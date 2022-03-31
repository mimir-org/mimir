import { Node as FlowNode } from "react-flow-renderer";
import { SetFlowElementFunction } from "../../../../../../helpers";
import { Node } from "../../../../../../models";

export const OnSelectActiveNode = (
  mimirNode: Node,
  mimirNodes: Node[],
  selectedNodes: FlowNode[],
  setActiveFlowElement: SetFlowElementFunction
) => {
  let tempArray: Node[] = [];

  selectedNodes?.forEach((n) => {
    const selectedNode = mimirNodes.find((x) => x.id === n.id);
    if (selectedNode) tempArray.push(selectedNode);
  });

  const isInArray = tempArray.includes(mimirNode);

  if (isInArray) tempArray = tempArray.filter((n) => n !== mimirNode);
  else {
    const selectedNode = mimirNodes.find((n) => n.id === mimirNode.id);
    if (selectedNode) tempArray.push(selectedNode);
  }

  setActiveFlowElement(tempArray);
};
