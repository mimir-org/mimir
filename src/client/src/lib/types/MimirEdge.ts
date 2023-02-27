import { Connector, Edge } from "@mimirorg/modelbuilder-types";

export class MimirEdge implements Edge {
  blockHidden: boolean;
  domain: string;
  fromConnector: Connector;
  fromConnectorId: string;
  fromConnectorIri: string;
  hidden: boolean;
  id: string;
  iri: string;
  isLocked: boolean;
  isLockedStatusBy: string;
  isLockedStatusDate: Date;
  kind: string;
  selected: boolean;
  transportId: string;

  constructor(edge: Edge) {
    this.blockHidden = edge.blockHidden;
    this.domain = edge.domain;
    this.fromConnector = edge.fromConnector;
    this.fromConnectorId = edge.fromConnectorId;
    this.fromConnectorIri = edge.fromConnectorIri;
    this.hidden = edge.hidden;
    this.id = edge.id;
    this.iri = edge.iri;
    this.isLocked = edge.isLocked;
    this.isLockedStatusBy = edge.isLockedStatusBy;
    this.isLockedStatusDate = edge.isLockedStatusDate;
    this.kind = edge.kind;
    this.selected = edge.selected;
    this.transportId = edge.transportId;
  }
}
