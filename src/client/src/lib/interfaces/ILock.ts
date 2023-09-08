import { EntityType } from "../enums";

export interface ILock {
  id: string;
  projectId: string;
  isLocked: boolean;
  type: EntityType;
}
