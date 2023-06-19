import { EntityType } from "lib";

export interface LockCm {
  id: string;
  projectId: string;
  isLocked: boolean;
  isLockedStatusBy: string;
  isLockedStatusDate: Date | null;
  type: EntityType;
}
