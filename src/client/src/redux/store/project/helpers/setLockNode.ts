import * as Types from "../types";
import { UpdateAttributeIsLocked } from "./GetUpdated";
import { LockCm } from "../../../../models";

export const setLockNode = (lock: LockCm, state: Types.ProjectState) => {
  const { id, isLocked, isLockedStatusBy, isLockedStatusDate } = lock;

  return {
    ...state,
    project: {
      ...state.project,
      nodes: state.project.nodes.map((x) =>
        x.id === id
          ? {
              ...x,
              isLocked,
              isLockedStatusBy,
              isLockedStatusDate,
              attributes: x.attributes.map((attribute) =>
                UpdateAttributeIsLocked(attribute, isLocked, isLockedStatusBy, isLockedStatusDate)
              ),
            }
          : x
      ),
    },
  };
};
