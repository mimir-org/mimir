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
  order: number;
  terminalTypeId: string;

  // Relation
  relationType: RelationType;

  kind: string = CONNECTOR_KIND;

  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor() {}
}

export default Connector;
