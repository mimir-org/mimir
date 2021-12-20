import { CreateConnectedOffPageNode, HasOffPageNode } from ".";
import { IsOffPage } from "../../../../../../helpers";
import { Edge, Node } from "../../../../../../models";
import { BlockNodeSize } from "../../../../../../models/project";

const AddConnectedOffPageNode = (
  node: Node,
  edges: Edge[],
  size: BlockNodeSize,
  blockElements: any[],
  secondaryNode: Node,
  dispatch: any
) => {
  edges.forEach((edge) => {
    const targetNode = edge.toNode;

    if (!IsOffPage(targetNode) && !blockElements.some((elem) => elem.id === targetNode.id)) {
      const offPageExists = HasOffPageNode(edges, edge.fromConnector);
      if (!offPageExists && !secondaryNode)
        CreateConnectedOffPageNode(node, edge.fromConnector, { x: size.width, y: targetNode?.positionBlockY }, dispatch);
    }
  });
};

export default AddConnectedOffPageNode;
