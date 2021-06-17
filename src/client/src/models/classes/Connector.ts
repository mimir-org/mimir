import { ConnectorType, EnumBase, Attribute, RelationType } from "..";

class Connector {
    id: string;
    name: string;
    type: ConnectorType;
    semanticReference: string;
    nodeId: string;

    // Terminal
    color: string;
    terminalCategoryId: string;
    terminalCategory: EnumBase;
    attributes: Attribute[];

    // Relation
    relationType: RelationType;

    // Constructor
    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    constructor() {

    }

    // Methods
    isTerminal() {
        return this.terminalCategoryId != null;
    }
}

export default Connector;
