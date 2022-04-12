import { Node } from "./Node";
import { Connector } from "./Connector";
import { Transport } from "./Transport";
import { Interface } from "./Interface";

export const EDGE_KIND = "Edge";

export interface Edge {
  id: string;
  iri: string;
  domain: string;
  projectId: string;
  projectIri: string;

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

  masterProjectId: string;
  masterProjectIri: string;

  isLocked: boolean;
  isLockedStatusBy: string;
  isLockedStatusDate: string;

  kind: string;

  // Only for client
  selected: boolean;
  hidden: boolean;
}
