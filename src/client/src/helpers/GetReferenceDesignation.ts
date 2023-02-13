import { GetRdsId } from ".";
import { Node, Edge, Project } from "@mimirorg/modelbuilder-types";
import { IsAspectNode } from "./Aspects";
import { MimirNode } from "../lib/types/Node";

const findParentNode = (currentNode: MimirNode, edges: Edge[]) => {
  if (!currentNode || IsAspectNode(currentNode)) return null;
  return currentNode.findParentEdge(currentNode.id, edges)?.fromNode;
};

const GetReferenceDesignation = (node: Node, project: Project) => {
  if (!node || !project || !project.nodes || !project.edges) return "";

  const refs = [];
  let nextNode = node;

  while (nextNode) {
    if (nextNode?.rds) refs.push(GetRdsId(nextNode));
    nextNode = findParentNode(nextNode as MimirNode, project.edges);
  }

  refs.push(`<${project.name.toUpperCase()}>`);

  return refs.reverse().join("");
};

export const GetReferenceDesignationEdge = (edge: Edge, project: Project) => {
  const rds = edge.transport?.rds ?? edge.interface?.rds ?? "";

  return GetReferenceDesignation(edge.fromNode, project) + rds;
};

export default GetReferenceDesignation;
