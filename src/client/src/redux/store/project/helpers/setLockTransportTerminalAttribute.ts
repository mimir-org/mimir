import * as Types from "../types";
import { GetUpdatedEdgeInnerWithTerminalAttributeIsLocked } from "./index";

interface SetLockTransportTerminalAttribute {
  id: string;
  terminalId: string;
  transportId: string;
  isLocked: boolean;
  isLockedStatusBy: string;
  isLockedStatusDate: Date;
}

export const setLockTransportTerminalAttribute = (lock: SetLockTransportTerminalAttribute, state: Types.ProjectState) => {
  const { id, terminalId, transportId, isLocked, isLockedStatusBy, isLockedStatusDate } = lock;

  return {
    ...state,
    project: {
      ...state.project,
      edges: state.project.edges.map((e) =>
        e.transport && e.transport.id === transportId
          ? {
              ...e,
              transport: GetUpdatedEdgeInnerWithTerminalAttributeIsLocked(
                e.transport,
                terminalId,
                id,
                isLocked,
                isLockedStatusBy,
                isLockedStatusDate
              ),
            }
          : e
      ),
    },
  };
};
