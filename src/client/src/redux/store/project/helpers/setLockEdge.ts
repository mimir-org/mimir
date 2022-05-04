import * as Types from "../types";
import { UpdateAttributeIsLocked } from "./GetUpdated";
import { LockCm } from "../../../../models";

export const setLockEdge = (lock: LockCm, state: Types.ProjectState) => {
  const { id, isLocked, isLockedStatusBy, isLockedStatusDate } = lock;

  return {
    ...state,
    project: {
      ...state.project,
      edges: state.project.edges.map((x) =>
        x.id === id
          ? {
              ...x,
              isLocked,
              isLockedStatusBy,
              transport: x.transport
                ? {
                    ...x.transport,
                    attributes: x.transport?.attributes?.map((attribute) =>
                      UpdateAttributeIsLocked(attribute, isLocked, isLockedStatusBy, isLockedStatusDate)
                    ),
                  }
                : null,
              interface: x.interface
                ? {
                    ...x.interface,
                    attributes: x.interface?.attributes?.map((attribute) =>
                      UpdateAttributeIsLocked(attribute, isLocked, isLockedStatusBy, isLockedStatusDate)
                    ),
                  }
                : null,
            }
          : x
      ),
    },
  };
};
