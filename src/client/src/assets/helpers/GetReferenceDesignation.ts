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

  const refs = [];
  let nextNode = node;

  while (nextNode) {
    if (nextNode?.rds) refs.push(GetRdsId(nextNode));
    nextNode = findParentNode(nextNode, project);
  }

  refs.push(`<${project.name.toUpperCase()}>`);

  return refs.reverse().join("");
};

export default GetReferenceDesignation;
