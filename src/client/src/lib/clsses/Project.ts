import { AspectObject, Connection } from ".";

export class Project {
  id: string;
  isSubProject: boolean;
  version: string;
  name: string;
  description: string;
  updated: Date;
  updatedBy: string;
  created: Date;
  createdBy: string;
  aspectObjects: AspectObject[];
  connections: Connection[];
}

// export class MimirProject implements ProjectCm {
//   id: string;
//   iri: string;
//   domain: string;
//   isSubProject: boolean;
//   version: string;
//   name: string;
//   description: string;
//   updatedBy: string;
//   projectOwner: string;
//   updated: Date;
//   nodes: MimirNode[];
//   edges: MimirEdge[];

//   constructor(project: Partial<Project>) {
//     this.id = project?.id ?? null;
//     this.iri = project?.iri ?? null;
//     this.domain = project?.domain ?? null;
//     this.isSubProject = project?.isSubProject ?? false;
//     this.version = project?.version ?? null;
//     this.name = project?.name ?? null;
//     this.description = project?.description ?? "";
//     this.projectOwner = project?.projectOwner ?? "";
//     this.updatedBy = project?.updatedBy ?? null;
//     this.updated = project?.updated ?? null;
//     this.nodes = project?.nodes?.map((node) => new MimirNode(node)) ?? null;
//     this.edges = project?.edges?.map((edge) => new MimirEdge(edge)) ?? null;
//   }

//   public nodeHasChildren(node: MimirNode, edges: MimirEdge[]) {
//     return !!this.findChildrenEdge(node, edges);
//   }

//   public findChildrenEdge(node: MimirNode, edges: MimirEdge[]) {
//     return edges.find((edge) => edge.fromNodeId === node.id && edge.fromConnector instanceof ConnectorPartOf);
//   }

//   public isAncestorInSet(currentNode: MimirNode, set: Set<string>, edges: MimirEdge[]): boolean {
//     const edge = this.findParentEdge(currentNode.id, edges);
//     if (!edge) return false;

//     const parentNode = edge.fromNode as MimirNode;
//     if (set.has(parentNode.id)) return true;

//     return this.isAncestorInSet(parentNode, set, edges);
//   }

//   public findParentNode(currentNode: MimirNode) {
//     if (!currentNode || currentNode.isAspectNode()) return null;
//     return this.findParentEdge(currentNode.id, this.edges)?.fromNode as MimirNode;
//   }

//   public findParentEdge(nodeId: string, edges: Edge[]): Edge {
//     return edges.find((edge) => edge.toNodeId === nodeId && edge.fromConnector instanceof ConnectorPartOf);
//   }

//   public buildFlowTreeNodes() {
//     const flowNodes: FlowNode[] = [];

//     this.nodes.forEach((node) => {
//       const treeNode = node.convertToFlowNode();
//       if (treeNode) flowNodes.push(treeNode);
//     });

//     return flowNodes;
//   }

//   public buildFlowTreeConnections(filter: VisualFilterData, onEdgeSplitClick: (id: string, x: number, y: number) => void) {
//     const flowEdges: FlowEdge[] = [];

//     this.edges.forEach((edge) => {
//       const treeEdge = edge.toFlowEdge(this.nodes, filter, onEdgeSplitClick);
//       if (treeEdge) flowEdges.push(treeEdge);
//     });

//     return flowEdges;
//   }

//   public getAspectAttributeMap() {
//     const map: { [attributeId: string]: { nodeId: string } } = {};

//     this.nodes.forEach((aspect) =>
//       aspect.attributes?.forEach((attribute) => {
//         map[attribute.id] = { nodeId: aspect.id };
//       })
//     );
//     return map;
//   }

//   /*
//   public getNodeConnectorAttributeMap() {
//     const map: { [attributeId: string]: { nodeId: string; terminalId: string } } = {};

//     this.nodes.forEach((n) =>
//       n.connectors?.forEach((c) => {
//         if (!IsTerminal(c)) return;
//         c.attributes?.forEach((a) => {
//           map[a.id] = {
//             nodeId: n.id,
//             terminalId: c.id,
//           };
//         });
//       })
//     );
//     return map;
//   }
// */

//   public toJson() {
//     return JSON.stringify(this);
//   }
// }
