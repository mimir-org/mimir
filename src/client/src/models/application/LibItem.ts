import { Aspect } from "../enums/Aspect";
import { ObjectType } from "../enums/ObjectType";
import { Purpose } from "../enums/Purpose";
import { Connector } from "../data/Connector";
import { Attribute } from "../data/Attribute";
import { Simple } from "../data/Simple";

export interface LibItem {
  id: string;
  version: string;
  rdsId: string;
  name: string;
  description: string;
  statusId: string;
  aspect: Aspect;
  connectors: Connector[];
  attributes?: Attribute[] | null;
  semanticReference: string;
  terminalId: string;
  terminalTypeId: string;
  symbolId: string;
  libraryType: ObjectType;
  simples?: Simple[] | null;
  purpose: Purpose;
  updatedBy: string;
  updated: Date;
  createdBy: string;
  created: Date;
}
