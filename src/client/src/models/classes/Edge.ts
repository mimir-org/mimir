import { Aspect, Connector, Node, Transport, Interface } from "..";

export type isEdge = keyof Edge;
class Edge {
  id: string;
  fromConnectorId: string;
  fromConnector: Connector;

  toConnectorId: string;
  toConnector: Connector;

  fromNodeId: string;
  fromNode: Node;

  toNodeId: string;
  toNode: Node;

  transportId: string;
  transport: Transport;

  interfaceId: string;
  interface: Interface;

  isHidden: boolean | false;
  masterProjectId: string;
  isTemplateEdge: boolean;
  isSelected: boolean;

  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor() {}

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
