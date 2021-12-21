import { CreateRequiredOffPageNode, HasOffPageNode } from ".";
import { Edge, Node } from "../../../../../../models";
import { BlockNodeSize } from "../../../../../../models/project";

const HandleRequiredOffPageNode = (node: Node, edges: Edge[], size: BlockNodeSize, dispatch: any) => {
  const isRequired = true;

  node?.connectors.forEach((conn) => {
    if (conn.isRequired) {
      const offPageExists = HasOffPageNode(edges, conn);
      if (!offPageExists) CreateRequiredOffPageNode(node, conn, { x: size.width, y: node?.positionBlockY }, dispatch, isRequired);
    }
  });
};

export default HandleRequiredOffPageNode;
