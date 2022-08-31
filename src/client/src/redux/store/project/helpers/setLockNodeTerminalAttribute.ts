import { IsTerminal } from "../../../../components/flow/helpers/Connectors";
import * as Types from "../types";
import { UpdateAttributeIsLocked } from "./index";

interface SetLockNodeTerminalAttribute {
  id: string;
  terminalId: string;
  nodeId: string;
  isLocked: boolean;
  isLockedStatusBy: string;
  isLockedStatusDate: Date;
}

export const setLockNodeTerminalAttribute = (lock: SetLockNodeTerminalAttribute, state: Types.ProjectState) => {
  const { id, terminalId, nodeId, isLocked, isLockedStatusBy, isLockedStatusDate } = lock;

  return {
    ...state,
    project: {
      ...state.project,
      nodes: state.project.nodes.map((n) =>
        n.id === nodeId
          ? {
              ...n,
              connectors: n.connectors.map((conn) =>
                conn.id === terminalId && IsTerminal(conn)
                  ? {
                      ...conn,
                      attributes: conn.attributes.map((attribute) =>
                        attribute.id === id
                          ? UpdateAttributeIsLocked(attribute, isLocked, isLockedStatusBy, isLockedStatusDate)
                          : attribute
                      ),
                    }
                  : conn
              ),
            }
          : n
      ),
    },
  };
};
