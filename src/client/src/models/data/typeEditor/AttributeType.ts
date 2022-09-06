import { Aspect, Discipline, Select } from "@mimirorg/modelbuilder-types";

export interface AttributeType {
  id: string;
  entity: string;
  aspect: Aspect;
  qualifierId: string;
  sourceId: string;
  conditionId: string;
  formatId: string;
  tags: Set<string>;
  description: string;
  selectValues: string[];
  selectType: Select;
  discipline: Discipline;
}
