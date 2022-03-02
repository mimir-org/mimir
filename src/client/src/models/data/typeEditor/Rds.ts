import { EnumBase } from "../../enums/EnumBase";
import { Aspect } from "../../enums/Aspect";

export interface Rds {
  id: string;
  name: string;
  code: string;
  rdsCategoryId: string;
  rdsCategory: EnumBase;
  semanticReference: string;
  aspect: Aspect;
}
