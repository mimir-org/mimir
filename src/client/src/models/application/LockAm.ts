import { EntityType } from "../enums/EntityType";

export interface LockAm {
  id: string;
  isLocked: boolean;
  type: EntityType;
}
