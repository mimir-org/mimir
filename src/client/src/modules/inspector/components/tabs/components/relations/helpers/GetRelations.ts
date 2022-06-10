import { IsRelationEdge } from "../../../helpers/IsRelationEdge";
import { Node, Edge } from "@mimirorg/modelbuilder-types";

const GetRelations = (node: Node, edges: Edge[]): Edge[] =>
  edges.filter((e) => IsRelationEdge(e) && (e.fromNode.id === node.id || e.toNode.id === node.id));
// .sort((a, b) =>
//   a.fromConnector.relationType === b.fromConnector.relationType
//     ? CompareNodeToFirst(a, node)
//     : a.fromConnector.relationType - b.fromConnector.relationType
// );

// const CompareNodeToFirst = (edge: Edge, node: Node) => (edge.fromNode.id === node.id ? 1 : -1);

// TODO: fix

export { GetRelations };
