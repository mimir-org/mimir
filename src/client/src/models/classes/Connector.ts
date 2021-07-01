import { ConnectorType, EnumBase, Attribute, RelationType } from "..";

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

  // Relation
  relationType: RelationType;

  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor() {}
}

export default Connector;
