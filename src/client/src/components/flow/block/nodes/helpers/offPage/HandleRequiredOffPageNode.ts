import { Dispatch } from "redux";
import { CreateRequiredOffPageNode, HasRequiredOffPageNode } from ".";
import { Edge, Node } from "../../../../../../models";
import { BlockNodeSize } from "../../../../../../models/project";

const HandleRequiredOffPageNode = (node: Node, edges: Edge[], size: BlockNodeSize, dispatch: Dispatch) => {
  const isRequired = true;

  node?.connectors.forEach((conn) => {
    if (conn.isRequired) {
      const offPageExists = HasRequiredOffPageNode(edges, conn);
      if (!offPageExists) CreateRequiredOffPageNode(node, conn, { x: size.width, y: node?.positionBlockY }, dispatch, isRequired);
    }
  });
};

export default HandleRequiredOffPageNode;
