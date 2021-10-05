import { GetRdsId } from ".";
import { Node, Project } from "../../models";
import { IsAspectNode, IsPartOfTerminal, IsTransportTerminal } from "../../components/flow/helpers";

const findParentNode = (currentNode: Node, project: Project): Node => {
  if (!currentNode) return null;
  if (IsAspectNode(currentNode)) return null;

  const actualConnector = currentNode.connectors.find((x) => IsPartOfTerminal(x) && IsTransportTerminal(x));
  if (!actualConnector) return null;

  const actualEdge = project.edges.find((x) => x.toConnector === actualConnector);
  if (!actualEdge) return null;

  return project.nodes.find((node) => node === actualEdge.fromNode);
};

const GetReferenceDesignation = (node: Node, project: Project): string => {
  if (!node || !project || !project.nodes || !project.edges) return "";

  let ref = "";
  let nextNode = node;

  while (nextNode) {
    ref += nextNode?.rds ? GetRdsId(nextNode) : "";
    nextNode = findParentNode(nextNode, project);
  }
  return ref;
};

export default GetReferenceDesignation;
