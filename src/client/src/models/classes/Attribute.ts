import { EnumBase } from "..";

class Attribute {
    id: string;
    key: string;
    value: string;
    selectedUnitId: string;
    unit: EnumBase;
    qualifierId: string;
    qualifier: EnumBase;
    sourceId: string;
    source: EnumBase;
    conditionId: string;
    condition: EnumBase;
    formatId: string;
    format: EnumBase;
    units: EnumBase[];
    attributeTypeId: string;
    terminalId: string;
    nodeId: string;

    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    constructor() { }
}

export default Attribute;
