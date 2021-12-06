import * as Types from "./types";
import { Edge, Node, ProjectItemCm } from "../../../models";
import { GetUpdatedEdgeInnerWithTerminalAttributeIsLocked, TraverseTree } from "./helpers/";
import { IsAspectNode, IsFamily } from "../../../helpers";
import { GetUpdatedEdgeInnerWithTerminalAttributeValue } from "./helpers";

const initialState: Types.ProjectState = {
  fetching: false,
  creating: false,
  project: null,
  projectList: null,
  apiError: [],
};

// TODO: Refactor to reduce complexity
export function projectReducer(state = initialState, action: Types.ProjectActionTypes) {
  switch (action.type) {
    case Types.SAVE_PROJECT:
      return {
        ...state,
        fetching: true,
        creating: false,
        apiError: state.apiError ? state.apiError.filter((elem) => elem.key !== Types.SAVE_PROJECT) : state.apiError,
      };

    case Types.COMMIT_PROJECT:
      return {
        ...state,
        fetching: true,
        creating: false,
        apiError: state.apiError ? state.apiError.filter((elem) => elem.key !== Types.COMMIT_PROJECT) : state.apiError,
      };

    case Types.COMMIT_PROJECT_SUCCESS_OR_ERROR:
      return {
        ...state,
        fetching: false,
        creating: false,
        apiError: action.payload.apiError ? [...state.apiError, action.payload.apiError] : state.apiError,
      };

    case Types.SAVE_PROJECT_SUCCESS_OR_ERROR:
      return {
        ...state,
        fetching: false,
        creating: false,
        project: action.payload.project,
        apiError: action.payload.apiError ? [...state.apiError, action.payload.apiError] : state.apiError,
      };

    case Types.SEARCH_PROJECT:
      return {
        ...state,
        fetching: true,
        creating: false,
        projectList: null,
        apiError: state.apiError ? state.apiError.filter((elem) => elem.key !== Types.SEARCH_PROJECT) : state.apiError,
      };

    case Types.SEARCH_PROJECT_SUCCESS_OR_ERROR:
      return {
        ...state,
        fetching: false,
        creating: false,
        projectList: action.payload.projectList ?? state.projectList,
        apiError: action.payload.apiError ? [...state.apiError, action.payload.apiError] : state.apiError,
      };

    case Types.FETCHING_PROJECT:
      return {
        ...state,
        fetching: true,
        creating: false,
        apiError: state.apiError ? state.apiError.filter((elem) => elem.key !== Types.FETCHING_PROJECT) : state.apiError,
      };

    case Types.FETCHING_PROJECT_SUCCESS_OR_ERROR:
    case Types.CREATING_PROJECT_SUCCESS_OR_ERROR:
      return {
        ...state,
        fetching: false,
        creating: false,
        project: action.payload.project ?? state.project,
        apiError: action.payload.apiError ? [...state.apiError, action.payload.apiError] : state.apiError,
      };

    case Types.CREATING_PROJECT:
      return {
        ...state,
        fetching: false,
        creating: true,
        apiError: state.apiError ? state.apiError.filter((elem) => elem.key !== Types.CREATING_PROJECT) : state.apiError,
      };

    case Types.DELETE_PROJECT_ERROR:
      return {
        ...state,
        apiError: state.apiError ? state.apiError.filter((elem) => elem.key !== action.payload.key) : state.apiError,
      };

    case Types.ADD_NODE:
      return {
        ...state,
        project: {
          ...state.project,
          nodes: [...state.project.nodes, action.payload],
        },
      };

    case Types.REMOVE_NODE:
      return {
        ...state,
        project: {
          ...state.project,
          nodes: state.project.nodes.filter((x) => x.id !== action.payload),
        },
      };

    case Types.ADD_EDGE:
      return {
        ...state,
        project: {
          ...state.project,
          edges: [...state.project.edges, action.payload],
        },
      };

    case Types.REMOVE_EDGE:
      return {
        ...state,
        project: {
          ...state.project,
          edges: state.project.edges.filter((edge) => edge?.id !== action.payload),
        },
      };

    case Types.UPDATE_POSITION:
      return {
        ...state,
        project: {
          ...state.project,
          nodes: state.project.nodes.map((x) =>
            x.id === action.payload.nodeId
              ? {
                  ...x,
                  positionX: action.payload.x,
                  positionY: action.payload.y,
                }
              : x
          ),
        },
      };

    case Types.UPDATE_BLOCK_POSITION:
      return {
        ...state,
        project: {
          ...state.project,
          nodes: state.project.nodes.map((x) =>
            x.id === action.payload.nodeId
              ? {
                  ...x,
                  positionBlockX: action.payload.x,
                  positionBlockY: action.payload.y,
                }
              : x
          ),
        },
      };

    case Types.SET_EDGE_VISIBILITY:
      return {
        ...state,
        project: {
          ...state.project,
          edges: state.project.edges.map((edge) =>
            edge.id === action.payload.edge.id
              ? {
                  ...edge,
                  isHidden: action.payload.isHidden,
                }
              : edge
          ),
        },
      };

    case Types.SET_EDGE_ANIMATION:
      return {
        ...state,
        project: {
          ...state.project,
          edges: state.project.edges.map((edge) =>
            edge.id === action.payload.edge.id
              ? {
                  ...edge,
                  animated: action.payload.animated,
                }
              : edge
          ),
        },
      };

    case Types.SET_LOCATION_NODE_SIZE:
      return {
        ...state,
        project: {
          ...state.project,
          nodes: state.project.nodes.map((x) =>
            x.id === action.payload.nodeId
              ? {
                  ...x,
                  [action.payload.key]: action.payload.value,
                }
              : x
          ),
        },
      };

    case Types.SET_NODE_VISIBILITY: {
      const node = action.payload.node;
      const nodeList = state.project.nodes;
      const edgeList = state.project.edges;
      const isParent = action.payload.isParent;
      const isHidden = !node.isHidden;

      if (IsAspectNode(node)) {
        return {
          ...state,
          project: {
            ...state.project,
            nodes: nodeList.map((n) => (IsFamily(node, n) ? { ...n, isHidden: isHidden } : n)),
            edges: edgeList.map((edge) =>
              IsFamily(node, edge.fromNode) || IsFamily(node, edge.toNode) || edge.fromNode === node
                ? { ...edge, isHidden: isHidden }
                : edge
            ),
          },
        };
      }

      if (isParent) {
        const elements: (Node | Edge)[] = [];
        elements.push(node);

        TraverseTree(edgeList, nodeList, node, elements);

        return {
          ...state,
          project: {
            ...state.project,
            nodes: nodeList.map((x) => (elements.includes(x) ? { ...x, isHidden: isHidden } : x)),
            edges: edgeList.map((edge) =>
              elements.includes(edge) || edge.toNode === node ? { ...edge, isHidden: isHidden } : edge
            ),
          },
        };
      }

      return {
        ...state,
        project: {
          ...state.project,
          nodes: nodeList.map((n) => (n.id === node.id ? { ...n, isHidden: isHidden } : n)),
          edges: edgeList.map((e) => (e.fromNodeId === node.id || e.toNodeId === node.id ? { ...e, isHidden: isHidden } : e)),
        },
      };
    }

    case Types.SET_ACTIVE_NODE: {
      const nodeId = action.payload.nodeId;
      const allNodes = state.project.nodes;
      const active = action.payload.isActive;

      return {
        ...state,
        project: {
          ...state.project,
          nodes: allNodes.map((x) => (x.id === nodeId ? { ...x, isSelected: active } : { ...x, isSelected: false })),
          edges: state.project.edges,
        },
      };
    }

    case Types.SET_ACTIVE_EDGE: {
      const edgeId = action.payload.edgeId;
      const edges = state.project.edges;
      const active = action.payload.isActive;
      return {
        ...state,
        project: {
          ...state.project,
          edges: edges.map((edge) => (edge.id === edgeId ? { ...edge, isSelected: active } : { ...edge, isSelected: false })),
        },
      };
    }

    case Types.SET_ACTIVE_BLOCKNODE:
      const blockId = action.payload.nodeId;
      const nodes = state.project.nodes;

      return {
        ...state,
        project: {
          ...state.project,
          nodes: nodes.map((x) => (x.id === blockId ? { ...x, isBlockSelected: true } : { ...x, isBlockSelected: false })),
          edges: state.project.edges,
        },
      };

    case Types.CHANGE_SELECTED_PROJECT:
      const projectId = action.payload.projectId;
      const projects = state.projectList as ProjectItemCm[];

      return {
        ...state,
        ...state.project,
        projectList: projects.map((project) =>
          project.id === projectId ? { ...project, selected: true } : { ...project, selected: false }
        ),
      };

    case Types.CHANGE_ALL_NODES:
      return {
        ...state,
        project: {
          ...state.project,
          nodes: state.project.nodes.map(
            (x) =>
              state && {
                ...x,
                isHidden: true,
              }
          ),
        },
      };

    case Types.CHANGE_NODE_PROP_VALUE:
      return {
        ...state,
        project: {
          ...state.project,
          nodes: state.project.nodes.map((x) =>
            x.id === action.payload.nodeId
              ? {
                  ...x,
                  [action.payload.propName]: action.payload.propValue,
                }
              : x
          ),
        },
      };

    case Types.CHANGE_NODE_ATTRIBUTE_VALUE:
      return {
        ...state,
        project: {
          ...state.project,
          nodes: state.project.nodes.map((x) =>
            x.id === action.payload.nodeId
              ? {
                  ...x,
                  attributes: x.attributes.map((attribute) =>
                    attribute.id === action.payload.id
                      ? {
                          ...attribute,
                          value: action.payload.value,
                          selectedUnitId: action.payload.unitId,
                        }
                      : attribute
                  ),
                }
              : x
          ),
        },
      };

    case Types.CHANGE_TRANSPORT_PROP_VALUE:
      return {
        ...state,
        project: {
          ...state.project,
          edges: state.project.edges.map((x) =>
            x.id === action.payload.edgeId
              ? {
                  ...x,
                  transport: {
                    ...x.transport,
                    [action.payload.propName]: action.payload.propValue,
                  },
                }
              : x
          ),
        },
      };

    case Types.CHANGE_TRANSPORT_ATTRIBUTE_VALUE: {
      const { id, edgeId, value, unitId } = action.payload;

      return {
        ...state,
        project: {
          ...state.project,
          edges: state.project.edges.map((e) =>
            e.id === edgeId
              ? {
                  ...e,
                  transport: {
                    ...e.transport,
                    attributes: e.transport.attributes.map((attribute) =>
                      attribute.id === id
                        ? {
                            ...attribute,
                            value,
                            selectedUnitId: unitId,
                          }
                        : attribute
                    ),
                  },
                }
              : e
          ),
        },
      };
    }

    case Types.CHANGE_INTERFACE_PROP_VALUE:
      return {
        ...state,
        project: {
          ...state.project,
          edges: state.project.edges.map((x) =>
            x.id === action.payload.edgeId
              ? {
                  ...x,
                  interface: {
                    ...x.interface,
                    [action.payload.propName]: action.payload.propValue,
                  },
                }
              : x
          ),
        },
      };

    case Types.CHANGE_INTERFACE_ATTRIBUTE_VALUE: {
      const { id, edgeId, unitId, value } = action.payload;

      return {
        ...state,
        project: {
          ...state.project,
          edges: state.project.edges.map((e) =>
            e.id === edgeId
              ? {
                  ...e,
                  interface: {
                    ...e.transport,
                    attributes: e.transport.attributes.map((attribute) =>
                      attribute.id === id
                        ? {
                            ...attribute,
                            selectedUnitId: unitId,
                            value,
                          }
                        : attribute
                    ),
                  },
                }
              : e
          ),
        },
      };
    }
    case Types.CHANGE_NODE_TERMINAL_ATTRIBUTE_VALUE: {
      const { id, terminalId, nodeId, value, unitId } = action.payload;

      return {
        ...state,
        project: {
          ...state.project,
          nodes: state.project.nodes.map((n) =>
            n.id === nodeId
              ? {
                  ...n,
                  connectors: n.connectors.map((conn) =>
                    conn.id === terminalId
                      ? {
                          ...conn,
                          attributes: conn.attributes.map((attribute) =>
                            attribute.id === id
                              ? {
                                  ...attribute,
                                  value,
                                  selectedUnitId: unitId,
                                }
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
    }
    case Types.CHANGE_TRANSPORT_TERMINAL_ATTRIBUTE_VALUE: {
      const { id, terminalId, edgeId, value, unitId } = action.payload;

      return {
        ...state,
        project: {
          ...state.project,
          edges: state.project.edges.map((e) =>
            e.id === edgeId
              ? {
                  ...e,
                  transport: GetUpdatedEdgeInnerWithTerminalAttributeValue(e.transport, terminalId, id, value, unitId),
                }
              : e
          ),
        },
      };
    }
    case Types.CHANGE_INTERFACE_TERMINAL_ATTRIBUTE_VALUE: {
      const { id, terminalId, edgeId, value, unitId } = action.payload;

      return {
        ...state,
        project: {
          ...state.project,
          edges: state.project.edges.map((e) =>
            e.id === edgeId
              ? {
                  ...e,
                  interface: GetUpdatedEdgeInnerWithTerminalAttributeValue(e.interface, terminalId, id, value, unitId),
                }
              : e
          ),
        },
      };
    }
    case Types.CHANGE_COMPOSITE_ATTRIBUTE_VALUE: {
      const { id, compositeId, nodeId, value, unitId } = action.payload;

      return {
        ...state,
        project: {
          ...state.project,
          nodes: state.project.nodes.map((n) =>
            n.id === nodeId
              ? {
                  ...n,
                  composites: n.composites.map((comp) =>
                    comp.id === compositeId
                      ? {
                          ...comp,
                          attributes: comp.attributes.map((attribute) =>
                            attribute.id === id
                              ? {
                                  ...attribute,
                                  value,
                                  selectedUnitId: unitId,
                                }
                              : attribute
                          ),
                        }
                      : comp
                  ),
                }
              : n
          ),
        },
      };
    }

    case Types.CHANGE_ACTIVE_CONNECTOR:
      return {
        ...state,
        project: {
          ...state.project,
          nodes: state.project.nodes.map((n) =>
            n?.id === action.payload.nodeId
              ? {
                  ...n,
                  connectors: n.connectors.map((conn) =>
                    conn.id === action.payload.connectorId
                      ? {
                          ...conn,
                          visible: action.payload.visible,
                          inputOrder: action.payload.inputOrder,
                          outputOrder: action.payload.outputOrder,
                        }
                      : conn
                  ),
                }
              : n
          ),
        },
      };
    case Types.EXPORT_PROJECT_TO_FILE:
      return {
        ...state,
        apiError: state.apiError ? state.apiError.filter((elem) => elem.key !== Types.EXPORT_PROJECT_TO_FILE) : state.apiError,
      };

    case Types.EXPORT_PROJECT_TO_FILE_SUCCESS_OR_ERROR:
      return {
        ...state,
        apiError: action.payload.apiError ? [...state.apiError, action.payload.apiError] : state.apiError,
      };

    case Types.IMPORT_PROJECT:
      return {
        ...state,
        fetching: true,
        apiError: state.apiError ? state.apiError.filter((elem) => elem.key !== Types.IMPORT_PROJECT) : state.apiError,
      };

    case Types.IMPORT_PROJECT_SUCCESS_OR_ERROR:
    case Types.LOCK_UNLOCK_NODE_SUCCESS_OR_ERROR:
    case Types.LOCK_UNLOCK_ATTRIBUTE_SUCCESS_OR_ERROR:
      return {
        ...state,
        fetching: false,
        apiError: action.payload.apiError ? [...state.apiError, action.payload.apiError] : state.apiError,
      };

    case Types.LOCK_UNLOCK_NODE:
      return {
        ...state,
        project: {
          ...state.project,
          nodes: state.project.nodes.map((x) =>
            x.id === action.payload.id
              ? {
                  ...x,
                  isLocked: action.payload.isLocked,
                  isLockedBy: action.payload.isLockedBy,
                  attributes: x.attributes.map((attribute) => ({
                    ...attribute,
                    isLocked: action.payload.isLocked,
                    isLockedBy: action.payload.isLockedBy,
                  })),
                }
              : x
          ),
        },
      };

    case Types.LOCK_UNLOCK_NODE_ATTRIBUTE:
      return {
        ...state,
        project: {
          ...state.project,
          nodes: state.project.nodes.map((x) =>
            x.id === action.payload.nodeId
              ? {
                  ...x,
                  attributes: x.attributes.map((attribute) =>
                    attribute.id === action.payload.id
                      ? {
                          ...attribute,
                          isLocked: action.payload.isLocked,
                          isLockedBy: action.payload.isLockedBy,
                        }
                      : attribute
                  ),
                }
              : x
          ),
        },
      };

    case Types.LOCK_UNLOCK_NODE_TERMINAL_ATTRIBUTE: {
      const { id, isLocked, isLockedBy, terminalId, nodeId } = action.payload;

      return {
        ...state,
        project: {
          ...state.project,
          nodes: state.project.nodes.map((n) =>
            n.id === nodeId
              ? {
                  ...n,
                  connectors: n.connectors.map((conn) =>
                    conn.id === terminalId
                      ? {
                          ...conn,
                          attributes: conn.attributes.map((attribute) =>
                            attribute.id === id
                              ? {
                                  ...attribute,
                                  isLocked,
                                  isLockedBy,
                                }
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
    }
    case Types.LOCK_UNLOCK_TRANSPORT_TERMINAL_ATTRIBUTE: {
      const { id, terminalId, edgeId, isLocked, isLockedBy } = action.payload;

      return {
        ...state,
        project: {
          ...state.project,
          edges: state.project.edges.map((e) =>
            e.id === edgeId
              ? {
                  ...e,
                  transport: GetUpdatedEdgeInnerWithTerminalAttributeIsLocked(e.transport, terminalId, id, isLocked, isLockedBy),
                }
              : e
          ),
        },
      };
    }
    case Types.LOCK_UNLOCK_INTERFACE_TERMINAL_ATTRIBUTE: {
      const { id, terminalId, edgeId, isLocked, isLockedBy } = action.payload;

      return {
        ...state,
        project: {
          ...state.project,
          edges: state.project.edges.map((e) =>
            e.id === edgeId
              ? {
                  ...e,
                  interface: GetUpdatedEdgeInnerWithTerminalAttributeIsLocked(e.interface, terminalId, id, isLocked, isLockedBy),
                }
              : e
          ),
        },
      };
    }

    case Types.LOCK_UNLOCK_TRANSPORT_ATTRIBUTE: {
      const { id, isLocked, isLockedBy, edgeId } = action.payload;

      return {
        ...state,
        project: {
          ...state.project,
          edges: state.project.edges.map((e) =>
            e.id === edgeId
              ? {
                  ...e,
                  transport: {
                    ...e.transport,
                    attributes: e.transport.attributes.map((attribute) =>
                      attribute.id === id
                        ? {
                            ...attribute,
                            isLocked,
                            isLockedBy,
                          }
                        : attribute
                    ),
                  },
                }
              : e
          ),
        },
      };
    }

    case Types.LOCK_UNLOCK_INTERFACE_ATTRIBUTE: {
      const { id, isLocked, isLockedBy, edgeId } = action.payload;

      return {
        ...state,
        project: {
          ...state.project,
          edges: state.project.edges.map((e) =>
            e.id === edgeId
              ? {
                  ...e,
                  interface: {
                    ...e.transport,
                    attributes: e.transport.attributes.map((attribute) =>
                      attribute.id === id
                        ? {
                            ...attribute,
                            isLocked,
                            isLockedBy,
                          }
                        : attribute
                    ),
                  },
                }
              : e
          ),
        },
      };
    }

    case Types.LOCK_UNLOCK_COMPOSITE_ATTRIBUTE: {
      const { id, compositeId, nodeId, isLocked, isLockedBy } = action.payload;

      return {
        ...state,
        project: {
          ...state.project,
          nodes: state.project.nodes.map((n) =>
            n.id === nodeId
              ? {
                  ...n,
                  composites: n.composites.map((comp) =>
                    comp.id === compositeId
                      ? {
                          ...comp,
                          attributes: comp.attributes.map((attribute) =>
                            attribute.id === id
                              ? {
                                  ...attribute,
                                  isLocked,
                                  isLockedBy,
                                }
                              : attribute
                          ),
                        }
                      : comp
                  ),
                }
              : n
          ),
        },
      };
    }

    case Types.CHANGE_NODE_UPDATED:
      return {
        ...state,
        project: {
          ...state.project,
          nodes: state.project.nodes.map((x) =>
            x.id === action.payload.nodeId
              ? {
                  ...x,
                  updated: action.payload.updated,
                  updatedBy: action.payload.userName,
                }
              : x
          ),
        },
      };

    case Types.UPDATE_NODE:
      return {
        ...state,
        project: {
          ...state.project,
          nodes: state.project.nodes.map((x) => (x.id === action.payload.id ? action.payload : x)),
        },
      };

    case Types.UPDATE_EDGE:
      return {
        ...state,
        project: {
          ...state.project,
          edges: state.project.edges.map((x) => (x.id === action.payload.id ? action.payload : x)),
        },
      };

    case Types.SET_OFFPAGE_STATUS:
      return {
        ...state,
        project: {
          ...state.project,
          nodes: state.project.nodes.map((n) =>
            n.id === action.payload.id
              ? {
                  ...n,
                  connectionRequired: action.payload.required,
                }
              : n
          ),
        },
      };

    default:
      return state;
  }
}
