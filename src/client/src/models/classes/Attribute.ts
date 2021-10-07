import { Discipline, EnumBase, SelectType } from "..";

class Attribute {
  id: string;
  key: string;
  value: string;
  isLocked: boolean;
  isLockedBy: string;
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
  transportId: string;
  compositeId: string;
  selectValues: string[];
  selectType: SelectType;
  discipline: Discipline;

  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor() { }
}

export default Attribute;
