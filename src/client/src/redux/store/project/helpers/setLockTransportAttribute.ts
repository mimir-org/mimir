import * as Types from "../types";
import { UpdateAttributeIsLocked } from "./index";

interface SetLockTransportAttribute {
  id: string;
  transportId: string;
  isLocked: boolean;
  isLockedStatusBy: string;
  isLockedStatusDate: string;
}

export const setLockTransportAttribute = (lock: SetLockTransportAttribute, state: Types.ProjectState) => {
  const { id, transportId, isLocked, isLockedStatusBy, isLockedStatusDate } = lock;

  return {
    ...state,
    project: {
      ...state.project,
      edges: state.project.edges.map((e) =>
        e.transport && e.transport.id === transportId
          ? {
              ...e,
              transport: {
                ...e.transport,
                attributes: e.transport.attributes.map((attribute) =>
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
