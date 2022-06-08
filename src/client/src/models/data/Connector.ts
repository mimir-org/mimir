import { Attribute, ConnectorVisibility, ConnectorDirection, RelationType } from "@mimirorg/modelbuilder-types";

export const CONNECTOR_KIND = "Connector";

export interface Connector {
  id: string;
  iri: string;
  domain: string;
  name: string;
  type: ConnectorDirection;
  semanticReference: string;
  nodeId: string;
  nodeIri: string;
  connectorVisibility: ConnectorVisibility;
  isRequired: boolean;

  // Terminal
  color: string;
  terminalCategory: string;
  attributes: Attribute[];

  terminalTypeId: string; // Id fra NodeLibCm
  terminalTypeIri: string; // Iri fra NodeLibCm

  // Relation
  relationType: RelationType;

  kind: string;
}
