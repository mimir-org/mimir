import { Connection, Edge as FlowEdge } from "react-flow-renderer";
import { Node, Project } from "../../../../models";

const GetExistingEdge = (project: Project, connection: FlowEdge | Connection, sourceNode: Node, targetNode: Node) => {
  return project.edges?.find(
    (edge) =>
      edge.fromConnectorId === connection.sourceHandle &&
      edge.toConnectorId === connection.targetHandle &&
      edge.fromNodeId === sourceNode.id &&
      edge.toNodeId === targetNode.id &&
      edge.hidden === targetNode.hidden
  );
};

export default GetExistingEdge;
