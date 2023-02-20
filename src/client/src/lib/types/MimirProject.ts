import { Edge, Project } from "@mimirorg/modelbuilder-types";
import { MimirNode } from "./MimirNode";
import { MimirEdge } from "./MimirEdge";
import { IsPartOfRelation } from "../../components/flow/helpers/Connectors";

/**
 * @interface
 * @extends Project
 */

export class MimirProject implements Project {
  description: string;
  domain: string;
  edges: MimirEdge[];
  id: string;
  iri: string;
  isSubProject: boolean;
  name: string;
  nodes: MimirNode[];
  projectOwner: string;
  updated: Date;
  updatedBy: string;
  version: string;

  constructor(project?: Project) {
    this.description = project.description;
    this.domain = project.domain;
    this.edges = project.edges.map((edge) => new MimirEdge(edge));
    this.id = project.id;
    this.iri = project.iri;
    this.isSubProject = project.isSubProject;
    this.name = project.name;
    this.nodes = project.nodes.map((node) => new MimirNode(node));
    this.updated = project.updated;
    this.updatedBy = project.updatedBy;
    this.version = project.version;
  }

  public nodeHasChildren(node: MimirNode, edges: MimirEdge[]) {
    return !!this.findChildrenEdge(node, edges);
  }

  public findChildrenEdge(node: MimirNode, edges: MimirEdge[]) {
    return edges.find((edge) => edge.fromNodeId === node.id && IsPartOfRelation(edge.fromConnector));
  }

  public isAncestorInSet(currentNode: MimirNode, set: Set<string>, edges: MimirEdge[]): boolean {
    const edge = this.findParentEdge(currentNode.id, edges);
    if (!edge) return false;

    const parentNode = edge.fromNode as MimirNode;
    if (set.has(parentNode.id)) return true;

    return this.isAncestorInSet(parentNode, set, edges);
  }

  public findParentNode(currentNode: MimirNode) {
    if (!currentNode || currentNode.isAspectNode()) return null;
    return this.findParentEdge(currentNode.id, this.edges)?.fromNode as MimirNode;
  }

  public findParentEdge(nodeId: string, edges: Edge[]): Edge {
    return edges.find((edge) => edge.toNodeId === nodeId && IsPartOfRelation(edge.fromConnector));
  }
}
