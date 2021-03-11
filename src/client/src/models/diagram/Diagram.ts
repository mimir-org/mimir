export class Diagram {
  public id: string;
  public label: string;
  public nodes: DiagramNode[];
  public connections: DiagramConnection[];

  constructor(id: string, label: string) {
    this.id = id;
    this.label = label;
    this.nodes = [];
    this.connections = [];
  }

  addNode(node: DiagramNode) {
    this.nodes.push(node);
  }

  removeNode(nodeId: string) {
    this.nodes = this.nodes.filter((node) => node.id !== nodeId);
  }
}

export class DiagramNode {
  public id: string;
  public label: string;
  public x: number;
  public y: number;
  public connectors: DiagramConnector[];

  constructor(id: string, label: string) {
    this.id = id;
    this.label = label;
    this.connectors = [];
  }

  addConnector(connector: DiagramConnector) {
    this.connectors.push(connector);
  }

  removeConnector(connectorId: string) {
    this.connectors = this.connectors.filter(
      (connector) => connector.id !== connectorId
    );
  }
}

export class DiagramConnector {
  public id: string;
  public label: string;
  public type: DiagramConnectorType;

  constructor(id: string, label: string, type: DiagramConnectorType) {
    this.id = id;
    this.label = label;
    this.type = type;
  }
}

export class DiagramProxyConnector extends DiagramConnector {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(id: string, label: string, type: DiagramConnectorType) {
    super(id, label, type);
  }
}

export type DiagramConnectorType = keyof typeof DIAGRAM_CONNECTOR_TYPE;

export const DIAGRAM_CONNECTOR_TYPE = {
  TARGET: "target",
  SOURCE: "source",
};

export class DiagramConnection {
  public id: string;
  public label: string;
  public source: string;
  public sourceHandle: string;
  public target: string;
  public targetHandle: string;
  public type: DiagramConnectionType;

  constructor(
    id: string,
    label: string,
    source: string,
    sourceHandle: string,
    target: string,
    targetHandle: string,
    type: DiagramConnectionType
  ) {
    this.id = id;
    this.label = label;
    this.source = source;
    this.sourceHandle = sourceHandle;
    this.target = target;
    this.targetHandle = targetHandle;
    this.type = type;
  }
}

export type DiagramConnectionType = keyof typeof DIAGRAM_CONNECTION_TYPE;

export const DIAGRAM_CONNECTION_TYPE = {
  INDIRECTLY_SUPPLIES: "imft:indirectlySupplies",
  SUPPLIES: "imft:supplies",
  CONSUMED_BY: "imft:consumedBy",
};
