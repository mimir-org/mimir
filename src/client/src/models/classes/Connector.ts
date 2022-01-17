import { Attribute, ConnectorType, ConnectorVisibility, EnumBase, RelationType } from "..";

export const CONNECTOR_KIND = "Connector";

class Connector {
  id: string;
  iri: string;
  domain: string;
  name: string;
  type: ConnectorType;
  semanticReference: string;
  nodeId: string;
  nodeIri: string;
  connectorVisibility: ConnectorVisibility;
  isRequired: boolean;

  // Terminal
  color: string;
  terminalCategoryId: string;
  terminalCategory: EnumBase;
  attributes: Attribute[];
  terminalTypeId: string;

  // Only client
  inputOrder: number;
  outputOrder: number;

  // Relation
  relationType: RelationType;

  kind: string = CONNECTOR_KIND;

  constructor(connector: Connector) {
    Object.assign(this, connector);
  }
}

export default Connector;
