/* eslint-disable @typescript-eslint/no-unused-vars */
import CreateId from "../../components/flow/helpers/CreateId";
import { Edge as FlowEdge } from "react-flow-renderer";
import { jsonMember, jsonObject, jsonArrayMember } from "typedjson";
import { Handle } from "./Handle";

/**
 * Abstract Connection class.
 * This is the parent class for all connection types.
 */
@jsonObject
export abstract class Connection {
  // Domain members
  @jsonMember(String)
  public id: string;

  @jsonMember(String)
  public fromConnector: string;

  @jsonMember(String)
  public toConnector: string;

  @jsonMember(String)
  public project: string;

  @jsonMember(String)
  public mainProject: string;

  @jsonArrayMember(Handle)
  public handles: Array<Handle>;

  // Client members
  public selected: boolean;
  public hidden: boolean;

  /**
   * Constructor.
   * @params fromConnector Connection from connector id.
   * @params toConnector Connection to connector id.
   * @params project Current project id.
   * @params mainProject The originally project owner id.
   */
  public constructor(fromConnector: string, toConnector: string, project: string, mainProject: string = null) {
    this.id = CreateId();
    this.fromConnector = fromConnector;
    this.toConnector = toConnector;
    this.project = project;
    this.mainProject = mainProject != null ? mainProject : project;
    this.handles = [];
    this.selected = false;
    this.hidden = false;
  }

  /**
   * Convert connection to flow edge.
   * @params type Usage type. Could be Block or Tree.
   * @params source The source node id.
   * @params target The target node id.
   * @returns Converted flow edge
   */
  public toFlowEdge(type: "Block" | "Tree", source: string, target: string): FlowEdge {
    const edge: FlowEdge = {
      id: this.id,
      type: this.getComponentType(type),
      source: source,
      target: target,
      sourceHandle: this.fromConnector,
      targetHandle: this.toConnector,
      animated: false,
      label: "",
      data: {
        arrowHeadType: null,
        source: null,
        target: null,
        connection: this,
        selected: this.selected,
        parentType: null,
        targetType: null,
      },
      hidden: this.hidden,
      selected: this.selected,
    };

    return edge;
  }

  public getComponentType(name: "Block" | "Tree"): string | null {
    return name + this.constructor["name"];
  }
}

@jsonObject
export class ConnectionTerminal extends Connection {
  public constructor(fromConnector: string, toConnector: string, project: string, mainProject: string = null) {
    super(fromConnector, toConnector, project, mainProject);
  }
}

@jsonObject
export abstract class ConnectionRelation extends Connection {
  public constructor(fromConnector: string, toConnector: string, project: string, mainProject: string = null) {
    super(fromConnector, toConnector, project, mainProject);
  }
}

@jsonObject
export class ConnectionFulfilledBy extends ConnectionRelation {
  public constructor(fromConnector: string, toConnector: string, project: string, mainProject: string = null) {
    super(fromConnector, toConnector, project, mainProject);
  }
}

@jsonObject
export class ConnectionHasLocation extends ConnectionRelation {
  public constructor(fromConnector: string, toConnector: string, project: string, mainProject: string = null) {
    super(fromConnector, toConnector, project, mainProject);
  }
}

@jsonObject
export class ConnectionPartOf extends ConnectionRelation {
  public constructor(fromConnector: string, toConnector: string, project: string, mainProject: string = null) {
    super(fromConnector, toConnector, project, mainProject);
  }
}

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
