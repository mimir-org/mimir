export class Connection {
  id: string;
  fromConnector: string;
  toConnector: string;
  mainProject: string;
  project: string;
}

export class ConnectionTerminal extends Connection {}

export class ConnectionRelation extends Connection {}

export class ConnectionFulfilledBy extends ConnectionRelation {}

export class ConnectionHasLocation extends ConnectionRelation {}

export class ConnectionPartOf extends ConnectionRelation {}

// export class Connection implements ConnectionCm {
//   blockHidden: boolean;
//   domain: string;
//   fromConnector: Connector;
//   fromConnectorId: string;
//   fromConnectorIri: string;
//   hidden: boolean;
//   id: string;
//   iri: string;
//   isLocked: boolean;
//   isLockedStatusBy: string;
//   isLockedStatusDate: Date;
//   kind: string;
//   selected: boolean;
//   fromNodeId: string;
//   toNodeId: string;
//   fromNode: Node;
//   fromNodeIri: string;
//   masterProjectId: string;
//   masterProjectIri: string;
//   projectId: string;
//   projectIri: string;
//   toConnector: Connector;
//   toConnectorId: string;
//   toConnectorIri: string;
//   toNode: Node;
//   toNodeIri: string;
//   transport: Transport;
//   transportId: string;
//   interface: Interface;
//   interfaceId: string;

//   constructor(connection?: Partial<Edge>) {
//     if (connection) {
//       this.blockHidden = connection.blockHidden ?? false;
//       this.domain = connection.domain ?? null;
//       this.fromConnector = connection.fromConnector ?? null;
//       this.fromConnectorId = connection.fromConnectorId ?? null;
//       this.fromConnectorIri = connection.fromConnectorIri ?? null;
//       this.fromNodeId = connection.fromNodeId ?? null;
//       this.toNodeId = connection.toNodeId ?? null;
//       this.hidden = connection.hidden ?? null;
//       this.id = connection.id ?? null;
//       this.iri = connection.iri ?? null;
//       this.isLocked = connection.isLocked ?? null;
//       this.isLockedStatusBy = connection.isLockedStatusBy ?? null;
//       this.isLockedStatusDate = connection.isLockedStatusDate ?? null;
//       this.kind = connection.kind ?? null;
//       this.selected = connection.selected ?? null;
//       this.transportId = connection.transportId ?? null;
//       this.transport = connection.transport ?? null;
//       this.interfaceId = connection.interfaceId ?? null;
//       this.interface = connection.interface ?? null;
//     }
//   }

//   public convertToFlowEdge(
//     edgeType: EDGE_TYPE,
//     source: MimirNode,
//     target: MimirNode,
//     filter: VisualFilterData,
//     onEdgeSplitClick: (id: string, x: number, y: number) => void
//   ): FlowEdge {
//     return {
//       id: this.id,
//       type: edgeType,
//       source: this.fromNodeId,
//       target: this.toNodeId,
//       sourceHandle: this.fromConnectorId,
//       targetHandle: this.toConnectorId,
//       arrowHeadType: null,
//       animated: false,
//       label: "",
//       data: { source, target, edge: this, selected: this.selected, onEdgeSplitClick },
//       hidden: false,
//       parentType: source?.aspect,
//       targetType: target?.aspect,
//       selected: this.selected,
//     } as FlowEdge;
//   }

//   public toFlowEdge(
//     nodes: MimirNode[],
//     filter: VisualFilterData,
//     onEdgeSplitClick: (id: string, x: number, y: number) => void
//   ): FlowEdge {
//     const sourceNode = nodes.find((node) => node.id === this.fromNodeId);
//     const targetNode = nodes.find((node) => node.id === this.toNodeId);
//     return this.convertToFlowEdge(EDGE_TYPE.BLOCK_PARTOF, sourceNode, targetNode, filter, onEdgeSplitClick);
//   }
// }
