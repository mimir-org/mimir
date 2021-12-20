import { CreateOffPageNode, HasOffPageNode } from ".";
import { Edge, Node } from "../../../../../../models";
import { BlockNodeSize } from "../../../../../../models/project";

const AddRequiredOffPageNode = (node: Node, edges: Edge[], size: BlockNodeSize, dispatch: any) => {
  const isRequired = true;

  node?.connectors.forEach((conn) => {
    if (conn.isRequired) {
      const offPageExists = HasOffPageNode(edges, conn);
      if (!offPageExists) CreateOffPageNode(node, conn, { x: size.width, y: node?.positionBlockY }, dispatch, isRequired);
    }
  });
};

export default AddRequiredOffPageNode;
