import { EnumBase } from "../enums/EnumBase";
import { SelectType } from "../enums/SelectType";
import { Discipline } from "../enums/Discipline";

export const ATTRIBUTE_KIND = "Attribute";

export interface Attribute {
  id: string;
  iri: string;
  domain: string;
  entity: string;
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
  attributeTypeIri: string;
  terminalId: string;
  terminalIri: string;
  nodeId: string;
  nodeIri: string;
  transportId: string;
  transportIri: string;
  simpleId: string;
  simpleIri: string;
  selectValues: string[];
  selectType: SelectType;
  discipline: Discipline;
  tags: Set<string>;
  interfaceId: string;
  interfaceIri: string;
  isLocked: boolean;
  isLockedStatusBy: string;
  isLockedStatusDate: string;
  kind: string;
}
