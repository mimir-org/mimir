import { Aspect, Discipline, Select } from "@mimirorg/modelbuilder-types";
import { EnumBase } from "../../enums/EnumBase";

export interface AttributeType {
  id: string;
  entity: string;
  aspect: Aspect;
  qualifierId: string;
  qualifier: EnumBase;
  sourceId: string;
  source: EnumBase;
  conditionId: string;
  condition: EnumBase;
  formatId: string;
  format: EnumBase;
  units: EnumBase[];
  tags: Set<string>;
  description: string;
  selectValues: string[];
  selectType: Select;
  discipline: Discipline;
}
