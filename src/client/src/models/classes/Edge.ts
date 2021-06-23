import { Aspect, Connector, Node } from "..";

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

  isHidden: boolean | false;
  isSelected: boolean | false;
  masterProjectId: string;

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
