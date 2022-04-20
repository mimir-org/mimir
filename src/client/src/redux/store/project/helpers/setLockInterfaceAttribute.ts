import * as Types from "../types";
import { UpdateAttributeIsLocked } from "./index";

interface SetLockInterfaceAttribute {
  id: string;
  interfaceId: string;
  isLocked: boolean;
  isLockedStatusBy: string;
  isLockedStatusDate: string;
}

export const setLockInterfaceAttribute = (lock: SetLockInterfaceAttribute, state: Types.ProjectState) => {
  const { id, interfaceId, isLocked, isLockedStatusBy, isLockedStatusDate } = lock;

  return {
    ...state,
    project: {
      ...state.project,
      edges: state.project.edges.map((e) =>
        e.interface && e.interface.id === interfaceId
          ? {
              ...e,
              interface: {
                ...e.interface,
                attributes: e.interface.attributes.map((attribute) =>
                  attribute.id === id
                    ? UpdateAttributeIsLocked(attribute, isLocked, isLockedStatusBy, isLockedStatusDate)
                    : attribute
                ),
              },
            }
          : e
      ),
    },
  };
};
