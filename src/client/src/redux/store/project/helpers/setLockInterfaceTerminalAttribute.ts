import * as Types from "../types";
import { GetUpdatedEdgeInnerWithTerminalAttributeIsLocked } from "./index";

interface SetLockInterfaceTerminalAttribute {
  id: string;
  terminalId: string;
  interfaceId: string;
  isLocked: boolean;
  isLockedStatusBy: string;
  isLockedStatusDate: string;
}

export const setLockInterfaceTerminalAttribute = (lock: SetLockInterfaceTerminalAttribute, state: Types.ProjectState) => {
  const { id, terminalId, interfaceId, isLocked, isLockedStatusBy, isLockedStatusDate } = lock;

  return {
    ...state,
    project: {
      ...state.project,
      edges: state.project.edges.map((e) =>
        e.interface && e.interface.id === interfaceId
          ? {
              ...e,
              interface: GetUpdatedEdgeInnerWithTerminalAttributeIsLocked(
                e.interface,
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
