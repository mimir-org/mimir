import { Aspect, Connector, Node, Transport, Interface } from "..";

export type isEdge = keyof Edge;
export const EDGE_KIND: string = "Edge";

class Edge {
  id: string;
  iri: string;
  domain: string;
  projectId: string;
  fromConnectorId: string;
  fromConnector: Connector;

  toConnectorId: string;
  toConnector: Connector;

  fromNodeId: string;
  fromNode: Node;

  toNodeId: string;
  toNode: Node;

  fromConnectorIri: string;
  toConnectorIri: string;
  fromNodeIri: string;
  toNodeIri: string;

  transportId: string;
  transport: Transport;

  interfaceId: string;
  interface: Interface;

  isLocked: boolean | false;
  isLockedBy: string;
  isHidden: boolean | false;
  masterProjectId: string;
  masterProjectIri: string;
  isSelected: boolean;

  kind: string = EDGE_KIND;

  // Only client
  animated: boolean | false;

  constructor(edge: Edge) {
    Object.assign(this, edge);
  }

  parentType() {
    if (this.fromNode) return this.fromNode.aspect;

    return Aspect.NotSet;
  }

  targetType() {
    if (this.toNode) return this.toNode.aspect;

    return Aspect.NotSet;
  }
}

export default Edge;
