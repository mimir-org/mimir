import { Edge, Node } from "../../../../models/project";

const FindChildNodes = (
  edgeList: Edge[],
  nodeList: Node[],
  parentNode: Node,
  children: Node[]
) => {
  for (let i = 0; i < edgeList.length; i++) {
    if (edgeList[i].fromNode === parentNode.id) {
      let node = nodeList.find((x) => x.id === edgeList[i].toNode);
      children.push(node);
    }
  }
};

export default FindChildNodes;
