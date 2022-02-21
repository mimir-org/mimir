export interface LockAttributeAm {
  id: string;
  projectId: string;
  isLocked: boolean;
  isLockedStatusBy: string;
  isLockedStatusDate: string;
  nodeId?: string;
  edgeId?: string;
  transportId?: string;
  interfaceId?: string;
  compositeId?: string;
  terminalId?: string;
}
