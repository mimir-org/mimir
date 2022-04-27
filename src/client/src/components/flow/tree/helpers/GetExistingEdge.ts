import { Connection, Edge as FlowEdge } from "react-flow-renderer";
import { Node, Edge } from "../../../../models";

const GetExistingEdge = (edges: Edge[], connection: FlowEdge | Connection, sourceNode: Node, targetNode: Node) => {
  return edges.find(
    (edge) =>
      edge.fromConnectorId === connection.sourceHandle &&
      edge.toConnectorId === connection.targetHandle &&
      edge.fromNodeId === sourceNode.id &&
      edge.toNodeId === targetNode.id &&
      edge.hidden === targetNode.hidden
  );
};

export default GetExistingEdge;
