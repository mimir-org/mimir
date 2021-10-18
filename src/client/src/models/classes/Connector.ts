import { ConnectorType, EnumBase, Attribute, RelationType } from "..";

export const CONNECTOR_KIND: string = "Connector";

class Connector {
  id: string;
  name: string;
  type: ConnectorType;
  semanticReference: string;
  nodeId: string;
  visible: boolean;

  // Terminal
  color: string;
  terminalCategoryId: string;
  terminalCategory: EnumBase;
  attributes: Attribute[];
  inputOrder: number;
  outputOrder: number;
  terminalTypeId: string;

  // Relation
  relationType: RelationType;

  kind: string = CONNECTOR_KIND;

  constructor(connector: Connector) {
    Object.assign(this, connector);
  }
}

export default Connector;
