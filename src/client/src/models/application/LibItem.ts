import { Aspect } from "../enums/Aspect";
import { ObjectType } from "../enums/ObjectType";
import { Purpose } from "../enums/Purpose";
import { Connector } from "../data/Connector";
import { Attribute } from "../data/Attribute";
import { Simple } from "../data/Simple";

export interface LibItem {
  id: string;
  rds: string;
  category: string;
  name: string;
  label: string;
  description: string;
  aspect: Aspect;
  connectors: Connector[];
  attributes?: Attribute[] | null;
  simples?: Simple[] | null;
  semanticReference: string;
  statusId: string;
  version: string;
  symbolId: string;
  terminalId: string;
  terminalTypeId: string;
  libraryType: ObjectType;
  purpose: Purpose;
  updatedBy: string;
  updated: Date;
  createdBy: string;
  created: Date;
  libraryTypeId: string;
}
