import { GetRdsId } from ".";
import {
  Node,
  Project,
  RELATION_TYPE,
  CONNECTOR_TYPE,
  NODE_TYPE,
} from "../../models/project";

const findParentNode = (currentNode: Node, project: Project): Node => {
  if (!currentNode) return null;

  if (
    currentNode.type === NODE_TYPE.ASPECT_FUNCTION ||
    currentNode.type === NODE_TYPE.ASPECT_LOCATION ||
    currentNode.type === NODE_TYPE.ASPECT_PRODUCT
  )
    return null;

  const actualConnector = currentNode.connectors.find(
    (x) =>
      x.relationType === RELATION_TYPE.PartOf && x.type === CONNECTOR_TYPE.INPUT
  );
  if (!actualConnector) return null;

  const actualEdge = project.edges.find(
    (x) => x.toConnector === actualConnector.id
  );
  if (!actualEdge) return null;

  const nextNode = project.nodes.find((x) => x.id === actualEdge.fromNode);
  return nextNode;
};

const GetReferenceDesignation = (node: Node, project: Project): string => {
  if (!node || !project || !project.nodes || !project.edges) return "";

  let ref = "";
  let nextNode = node;

  while (nextNode) {
    ref += nextNode ? (nextNode.rds ? GetRdsId(nextNode) : "") : "";
    nextNode = findParentNode(nextNode, project);
  }
  return ref;
};

export default GetReferenceDesignation;
