import { GetRdsId } from ".";
import { Node, Project } from "../../models/project";
import {
  IsAspectNode,
  IsPartOfTerminal,
  IsTransportTerminal,
} from "../../components/flow/helpers/common";

const findParentNode = (currentNode: Node, project: Project): Node => {
  if (!currentNode) return null;

  if (IsAspectNode(currentNode)) return null;

  const actualConnector = currentNode.connectors.find(
    (x) => IsPartOfTerminal(x) && IsTransportTerminal(x)
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
