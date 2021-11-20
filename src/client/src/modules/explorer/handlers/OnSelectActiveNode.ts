import { Node } from "../../../models";

export const OnSelectActiveNode = (
  node: Node,
  nodes: Node[],
  selectedNodes: string[],
  setActiveFlowElement: (element: any) => void
) => {
  let tempArray: Node[] = [];

  selectedNodes?.forEach((n) => {
    let selectedNode = nodes.find((x) => x.id === n);
    tempArray.push(selectedNode);
  });

  const isInArray = tempArray.includes(node);

  if (isInArray) {
    tempArray = tempArray.filter((n) => n !== node);
  } else {
    let selectedNode = nodes.find((n) => n.id === node.id);
    tempArray.push(selectedNode);
  }

  setActiveFlowElement(tempArray);
};

export default OnSelectActiveNode;
