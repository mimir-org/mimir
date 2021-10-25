import { Edge, Node } from "../../../../models";
import { GetSelectedNode } from "../../helpers";
import { ValidateBlockEdge } from "../../validators";

const ShowBlockViewEdge = (edge: Edge, secondaryNode: Node) => {
  const selectedNode = GetSelectedNode();

  return ValidateBlockEdge(
    selectedNode,
    edge.fromNode,
    edge.toNode,
    secondaryNode,
    edge.fromConnector,
    edge.toConnector
  );
};

export default ShowBlockViewEdge;
