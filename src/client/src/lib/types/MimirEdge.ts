import { Connector, Edge, Interface, Transport } from "@mimirorg/modelbuilder-types";
import { MimirNode } from "./MimirNode";

/**
 * @interface
 * @extends Edge
 */

export class MimirEdge implements Edge {
  blockHidden: boolean;
  domain: string;
  fromConnector: Connector;
  fromConnectorId: string;
  fromConnectorIri: string;
  fromNode: MimirNode;
  fromNodeId: string;
  fromNodeIri: string;
  hidden: boolean;
  id: string;
  interface: Interface;
  interfaceId: string;
  iri: string;
  isLocked: boolean;
  isLockedStatusBy: string;
  isLockedStatusDate: Date;
  kind: string;
  masterProjectId: string;
  masterProjectIri: string;
  projectId: string;
  projectIri: string;
  selected: boolean;
  toConnector: Connector;
  toConnectorId: string;
  toConnectorIri: string;
  toNode: MimirNode;
  toNodeId: string;
  toNodeIri: string;
  transport: Transport;
  transportId: string;

  constructor(edge: Edge) {
    this.blockHidden = edge.blockHidden;
    this.domain = edge.domain;
    this.fromConnector = edge.fromConnector;
    this.fromConnectorId = edge.fromConnectorId;
    this.fromConnectorIri = edge.fromConnectorIri;
    this.fromNode = new MimirNode(edge.fromNode);
    this.fromNodeId = edge.fromNodeId;
    this.fromNodeIri = edge.fromNodeIri;
    this.hidden = edge.hidden;
    this.id = edge.id;
    this.interface = edge.interface;
    this.interfaceId = edge.interfaceId;
    this.iri = edge.iri;
    this.isLocked = edge.isLocked;
    this.isLockedStatusBy = edge.isLockedStatusBy;
    this.isLockedStatusDate = edge.isLockedStatusDate;
    this.kind = edge.kind;
    this.masterProjectId = edge.masterProjectId;
    this.masterProjectIri = edge.masterProjectIri;
    this.projectId = edge.projectId;
    this.projectIri = edge.projectIri;
    this.selected = edge.selected;
    this.toConnector = edge.toConnector;
    this.toConnectorId = edge.toConnectorId;
    this.toConnectorIri = edge.toConnectorIri;
    this.toNode = new MimirNode(edge.toNode);
    this.toNodeId = edge.toNodeId;
    this.toNodeIri = edge.toNodeIri;
    this.transport = edge.transport;
    this.transportId = edge.transportId;
  }
}
