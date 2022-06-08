import * as Types from "../types";
import { UpdateAttributeIsLocked } from "./index";

interface SetLockSimpleAttribute {
  id: string;
  simpleId: string;
  nodeId: string;
  isLocked: boolean;
  isLockedStatusBy: string;
  isLockedStatusDate: Date;
}

export const setLockSimpleAttribute = (lock: SetLockSimpleAttribute, state: Types.ProjectState) => {
  const { id, simpleId, nodeId, isLocked, isLockedStatusBy, isLockedStatusDate } = lock;

  return {
    ...state,
    project: {
      ...state.project,
      nodes: state.project.nodes.map((n) =>
        n.id === nodeId
          ? {
              ...n,
              simples: n.simples.map((simple) =>
                simple.id === simpleId
                  ? {
                      ...simple,
                      attributes: simple.attributes.map((attribute) =>
                        attribute.id === id
                          ? UpdateAttributeIsLocked(attribute, isLocked, isLockedStatusBy, isLockedStatusDate)
                          : attribute
                      ),
                    }
                  : simple
              ),
            }
          : n
      ),
    },
  };
};
