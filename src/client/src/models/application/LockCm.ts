import { EntityType } from "../enums/EntityType";

export interface LockCm {
  id: string;
  isLocked: boolean;
  isLockedStatusBy: string;
  isLockedStatusDate: string | null;
  type: EntityType;
}
