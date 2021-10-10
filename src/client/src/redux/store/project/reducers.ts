import * as Types from "./types";
import { Edge, Node, ProjectSimple } from "../../../models";
import { FindTerminalAndNode, TraverseTree } from "./helpers/";
import { IsAspectNode } from "../../../components/flow/helpers";

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

    case Types.CREATING_PROJECT_SUCCESS_OR_ERROR:
      return {
        ...state,
        fetching: false,
        creating: false,
        project: action.payload.project ?? state.project,
        apiError: action.payload.apiError ? [...state.apiError, action.payload.apiError] : state.apiError,
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
            nodes: nodeList.map((x) => (action.payload.node.aspect === x.aspect ? { ...x, isHidden: isHidden } : x)),
            edges: edgeList.map((edge) =>
              node.aspect === edge.fromNode.aspect || node.aspect === edge.toNode.aspect || edge.fromNode === node
                ? { ...edge, isHidden: isHidden }
                : edge
            ),
          },
        };
      }

      if (isParent) {
        let elements: (Node | Edge)[] = [];
        elements.push(node);

        TraverseTree(edgeList, nodeList, node, elements);

        return {
          ...state,
          project: {
            ...state.project,
            nodes: state.project.nodes.map((x) => (elements.includes(x) ? { ...x, isHidden: isHidden } : x)),
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
          nodes: state.project.nodes.map((x) => (x.id === action.payload.node.id ? { ...x, isHidden: isHidden } : x)),
          edges: edgeList.map((edge) =>
            edge.fromNodeId === node.id || edge.toNodeId === node.id ? { ...edge, isHidden: isHidden } : edge
          ),
        },
      };
    }

    case Types.SET_ACTIVE_NODE:
      const nodeId = action.payload.nodeId;
      return {
        ...state,
        project: {
          ...state.project,
          nodes: state.project.nodes.map((x) =>
            x.id === nodeId ? { ...x, isSelected: action.payload.isActive } : { ...x, isSelected: false }
          ),
          edges: state.project.edges,
        },
      };

    case Types.SET_ACTIVE_EDGE:
      const edgeId = action.payload.edgeId;
      return {
        ...state,
        project: {
          ...state.project,
          edges: state.project.edges.map((edge) =>
            edge.id === edgeId ? { ...edge, isSelected: action.payload.isActive } : { ...edge, isSelected: false }
          ),
        },
      };

    case Types.SET_ACTIVE_BLOCKNODE:
      const blockId = action.payload.nodeId;
      return {
        ...state,
        project: {
          ...state.project,
          nodes: state.project.nodes.map((x) =>
            x.id === blockId ? { ...x, isBlockSelected: true } : { ...x, isBlockSelected: false }
          ),
          edges: state.project.edges,
        },
      };

    case Types.CHANGE_SELECTED_PROJECT:
      const projectId = action.payload.projectId;
      const projects = state.projectList as ProjectSimple[];

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

    case Types.CHANGE_ATTRIBUTE_VALUE:
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
                          selectedUnitId: action.payload.unit,
                        }
                      : attribute
                  ),
                }
              : x
          ),
        },
      };

    case Types.CHANGE_CONNECTOR_ATTRIBUTE_VALUE:
      return {
        ...state,
        project: {
          ...state.project,
          nodes: state.project.nodes.map((x) =>
            x.id === action.payload.nodeId
              ? {
                  ...x,
                  connectors: x.connectors.map((connector) =>
                    connector.id === action.payload.connectorId
                      ? {
                          ...connector,
                          attributes: connector.attributes.map((attribute) =>
                            attribute.id === action.payload.id
                              ? {
                                  ...attribute,
                                  value: action.payload.value,
                                  unit: action.payload.unit,
                                }
                              : attribute
                          ),
                        }
                      : connector
                  ),
                }
              : x
          ),
        },
      };

    case Types.CHANGE_ACTIVE_CONNECTOR:
      return {
        ...state,
        project: {
          ...state.project,
          nodes: state.project.nodes.map((n) =>
            n?.id === action.payload.node?.id
              ? {
                  ...n,
                  connectors: n.connectors.map((conn) =>
                    conn.id === action.payload.connectorId
                      ? {
                          ...conn,
                          visible: action.payload.visible,
                          order: action.payload.order,
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
        apiError: state.apiError
          ? state.apiError.filter((elem) => elem.key !== Types.EXPORT_PROJECT_TO_FILE)
          : state.apiError,
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
                  attributes: x.attributes.map((attribute) => {
                    return { ...attribute, isLocked: action.payload.isLocked };
                  }),
                }
              : x
          ),
        },
      };

    case Types.LOCK_UNLOCK_NODE_SUCCESS_OR_ERROR:
      return {
        ...state,
        fetching: false,
        apiError: action.payload.apiError ? [...state.apiError, action.payload.apiError] : state.apiError,
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
                        }
                      : attribute
                  ),
                }
              : x
          ),
        },
      };

    case Types.LOCK_UNLOCK_TERMINAL_ATTRIBUTE: {
      const { id, isLocked, terminalId } = action.payload;

      let [node, terminal] = FindTerminalAndNode(state.project.nodes, terminalId);

      if (!node || !terminal) return { ...state };

      return {
        ...state,
        project: {
          ...state.project,
          nodes: state.project.nodes.map((n) =>
            n.id === node.id
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

    case Types.LOCK_UNLOCK_ATTRIBUTE_SUCCESS_OR_ERROR:
      return {
        ...state,
        fetching: false,
        apiError: action.payload.apiError ? [...state.apiError, action.payload.apiError] : state.apiError,
      };

    default:
      return state;
  }
}
