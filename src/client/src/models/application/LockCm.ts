import { EntityType } from "@mimirorg/modelbuilder-types";

export interface LockCm {
  id: string;
  projectId: string;
  isLocked: boolean;
  isLockedStatusBy: string;
  isLockedStatusDate: Date | null;
  type: EntityType;
}
