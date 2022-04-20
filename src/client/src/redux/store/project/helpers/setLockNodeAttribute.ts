import * as Types from "../types";
import { UpdateAttributeIsLocked } from "./index";

interface SetLockNodeAttribute {
  id: string;
  nodeId: string;
  isLocked: boolean;
  isLockedStatusBy: string;
  isLockedStatusDate: string;
}

export const setLockNodeAttribute = (lock: SetLockNodeAttribute, state: Types.ProjectState) => {
  const { id, nodeId, isLocked, isLockedStatusBy, isLockedStatusDate } = lock;

  return {
    ...state,
    project: {
      ...state.project,
      nodes: state.project.nodes.map((x) =>
        x.id === nodeId
          ? {
              ...x,
              attributes: x.attributes.map((attribute) =>
                attribute.id === id
                  ? UpdateAttributeIsLocked(attribute, isLocked, isLockedStatusBy, isLockedStatusDate)
                  : attribute
              ),
            }
          : x
      ),
    },
  };
};
