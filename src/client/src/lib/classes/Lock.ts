import { EntityType } from "../enums";

export class Lock {
  id: string;
  projectId: string;
  isLocked: boolean;
  isLockedStatusBy: string;
  isLockedStatusDate: Date;
  type: EntityType;
}
