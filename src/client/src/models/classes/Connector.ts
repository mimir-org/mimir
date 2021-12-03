import { ConnectorType, EnumBase, Attribute, RelationType } from "..";

export const CONNECTOR_KIND: string = "Connector";

class Connector {
  id: string;
  iri: string;
  domain: string;
  name: string;
  type: ConnectorType;
  semanticReference: string;
  nodeId: string;
  nodeIri: string;
  visible: boolean;

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
