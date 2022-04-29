import { EntityType } from "../enums/EntityType";

export interface LockAm {
  id: string;
  projectId: string;
  isLocked: boolean;
  type: EntityType;
}
