import { EntityType } from "@mimirorg/modelbuilder-types";

export interface LockAm {
  id: string;
  projectId: string;
  isLocked: boolean;
  type: EntityType;
}
