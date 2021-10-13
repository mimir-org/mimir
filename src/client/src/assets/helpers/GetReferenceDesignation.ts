import { GetRdsId } from ".";
import { Node, Project } from "../../models";
import { IsAspectNode } from "../../components/flow/helpers";
import { FindParentEdge } from "../../modules/explorer/helpers/ParentNode";

const findParentNode = (currentNode: Node, project: Project): Node => {
  if (!currentNode || IsAspectNode(currentNode)) return null;

  return FindParentEdge(currentNode, project)?.fromNode;
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
