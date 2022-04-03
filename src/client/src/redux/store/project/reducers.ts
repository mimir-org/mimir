import * as Types from "./types";
import { Connector, Edge, Node, Simple } from "../../../models";
import { IsAspectNode } from "../../../helpers/Aspects";
import { IsFamily } from "../../../helpers/Family";
import {
  GetUpdatedEdgeInnerWithTerminalAttributeIsLocked,
  GetUpdatedEdgeInnerWithTerminalAttributeValue,
  TraverseTree,
  UpdateAttributeIsLocked,
} from "./helpers/";

const initialState: Types.ProjectState = {
  fetching: false,
  creating: false,
  project: null,
  projectList: null,
  apiError: [],
};

// TODO: Refactor to reduce complexity
export function projectReducer(state = initialState, action: Types.ProjectActionTypes) {
  const project = state.project;
  const nodes = state.project.nodes;
  const edges = state.project.edges;

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
    case Types.SAVE_PROJECT_SUCCESS_OR_ERROR:
      return {
        ...state,
        fetching: false,
        creating: false,
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
      return { ...state, project: { ...project, nodes: [...nodes, action.payload] } };

    case Types.REMOVE_NODE:
      return { ...state, project: { ...project, nodes: nodes.filter((n) => n.id !== action.payload) } };

    case Types.ADD_EDGE:
      return { ...state, project: { ...project, edges: [...edges, action.payload] } };

    case Types.REMOVE_EDGE:
      return { ...state, project: { ...project, edges: edges.filter((e) => e?.id !== action.payload) } };

    case Types.UPDATE_POSITION: {
      const { nodeId, x: positionX, y: positionY } = action.payload;

      return {
        ...state,
        project: { ...project, nodes: nodes.map((n) => (n.id === nodeId ? { ...n, positionX, positionY } : n)) },
      };
    }

    case Types.UPDATE_BLOCK_POSITION: {
      const { nodeId, x: positionBlockX, y: positionBlockY } = action.payload;

      return {
        ...state,
        project: { ...project, nodes: nodes.map((n) => (n.id === nodeId ? { ...n, positionBlockX, positionBlockY } : n)) },
      };
    }

    case Types.UPDATE_BLOCK_SIZE: {
      const { nodeId, size } = action.payload;

      return {
        ...state,
        project: {
          ...project,
          nodes: nodes.map((n) => (n.id === nodeId ? { ...n, width: size.width, height: size.height } : n)),
        },
      };
    }

    case Types.SET_EDGE_VISIBILITY: {
      const { edge, isHidden } = action.payload;

      return { ...state, project: { ...project, edges: edges.map((e) => (e.id === edge.id ? { ...e, isHidden } : e)) } };
    }

    case Types.SET_LOCATION_NODE_SIZE: {
      const { nodeId, key, value } = action.payload;

      return { ...state, project: { ...project, nodes: nodes.map((x) => (x.id === nodeId ? { ...x, [key]: value } : x)) } };
    }

    case Types.SET_NODE_VISIBILITY: {
      const { node, isParent } = action.payload;
      const isHidden = !node.isHidden;

      const isRelated = (edge: Edge) => {
        return IsFamily(node, edge.fromNode) || IsFamily(node, edge.toNode) || edge.fromNodeId === node.id;
      };

      if (IsAspectNode(node)) {
        return {
          ...state,
          project: {
            ...project,
            nodes: nodes.map((n) => (IsFamily(node, n) ? { ...n, isHidden } : n)),
            edges: edges.map((edge) => (isRelated(edge) ? { ...edge, isHidden } : edge)),
          },
        };
      }

      if (isParent) {
        const elements: (Node | Edge)[] = [];
        elements.push(node);

        TraverseTree(edges, nodes, node, elements);

        return {
          ...state,
          project: {
            ...project,
            nodes: nodes.map((x) => (elements.includes(x) ? { ...x, isHidden } : x)),
            edges: edges.map((edge) => (elements.includes(edge) || edge.toNode === node ? { ...edge, isHidden } : edge)),
          },
        };
      }

      return {
        ...state,
        project: {
          ...project,
          nodes: nodes.map((n) => (n.id === node.id ? { ...n, isHidden } : n)),
          edges: edges.map((e) => (e.fromNodeId === node.id || e.toNodeId === node.id ? { ...e, isHidden } : e)),
        },
      };
    }

    case Types.SET_ACTIVE_NODE: {
      const { nodeId, isActive: isSelected } = action.payload;

      return {
        ...state,
        project: {
          ...project,
          nodes: nodes.map((x) => (x.id === nodeId ? { ...x, isSelected } : { ...x, isSelected: false })),
          edges,
        },
      };
    }

    case Types.SET_ACTIVE_EDGE: {
      const { edgeId, isActive: isSelected } = action.payload;

      return {
        ...state,
        project: {
          ...project,
          edges: edges?.map((edge) => (edge.id === edgeId ? { ...edge, isSelected } : { ...edge, isSelected: false })),
        },
      };
    }

    case Types.SET_ACTIVE_BLOCKNODE: {
      const blockId = action.payload.nodeId;

      return {
        ...state,
        project: {
          ...project,
          nodes: nodes.map((x) => (x.id === blockId ? { ...x, isBlockSelected: true } : { ...x, isBlockSelected: false })),
          edges,
        },
      };
    }

    case Types.CHANGE_SELECTED_PROJECT: {
      const projectId = action.payload.projectId;
      const projects = state.projectList;

      return {
        ...state,
        ...project,
        projectList: projects.map((p) => (p.id === projectId ? { ...p, selected: true } : { ...p, selected: false })),
      };
    }

    case Types.CHANGE_ALL_NODES:
      return { ...state, project: { ...project, nodes: nodes.map((x) => state && { ...x, isHidden: true }) } };

    case Types.CHANGE_NODE_PROP_VALUE: {
      const { nodeId, propName, propValue } = action.payload;

      return {
        ...state,
        project: { ...project, nodes: nodes.map((x) => (x.id === nodeId ? { ...x, [propName]: propValue } : x)) },
      };
    }

    case Types.CHANGE_NODE_ATTRIBUTE_VALUE: {
      const { id, nodeId, value, unitId: selectedUnitId } = action.payload;

      const getAttributes = (n: Node) => {
        return n.attributes.map((attr) => (attr.id === id ? { ...attr, value, selectedUnitId } : attr));
      };

      return {
        ...state,
        project: { ...project, nodes: nodes.map((x) => (x.id === nodeId ? { ...x, attributes: getAttributes(x) } : x)) },
      };
    }

    case Types.CHANGE_TRANSPORT_PROP_VALUE: {
      const { edgeId, propName, propValue } = action.payload;

      return {
        ...state,
        project: {
          ...project,
          edges: edges.map((x) => (x.id === edgeId ? { ...x, transport: { ...x.transport, [propName]: propValue } } : x)),
        },
      };
    }

    case Types.CHANGE_TRANSPORT_ATTRIBUTE_VALUE: {
      const { id, edgeId, value, unitId: selectedUnitId } = action.payload;

      return {
        ...state,
        project: {
          ...project,
          edges: edges.map((e) =>
            e.id === edgeId
              ? {
                  ...e,
                  transport: {
                    ...e.transport,
                    attributes: e.transport.attributes.map((a) => (a.id === id ? { ...a, value, selectedUnitId } : a)),
                  },
                }
              : e
          ),
        },
      };
    }

    case Types.CHANGE_INTERFACE_PROP_VALUE: {
      const { edgeId, propName, propValue } = action.payload;

      return {
        ...state,
        project: {
          ...project,
          edges: edges.map((x) => (x.id === edgeId ? { ...x, interface: { ...x.interface, [propName]: propValue } } : x)),
        },
      };
    }

    case Types.CHANGE_INTERFACE_ATTRIBUTE_VALUE: {
      const { id, edgeId, unitId: selectedUnitId, value } = action.payload;

      return {
        ...state,
        project: {
          ...project,
          edges: edges.map((e) =>
            e.id === edgeId
              ? {
                  ...e,
                  interface: {
                    ...e.transport,
                    attributes: e.transport.attributes.map((a) => (a.id === id ? { ...a, selectedUnitId, value } : a)),
                  },
                }
              : e
          ),
        },
      };
    }
    case Types.CHANGE_NODE_TERMINAL_ATTRIBUTE_VALUE: {
      const { id, terminalId, nodeId, value, unitId: selectedUnitId } = action.payload;

      const getAttributes = (conn: Connector) => {
        return conn.attributes.map((attr) => (attr.id === id ? { ...attr, value, selectedUnitId } : attr));
      };

      return {
        ...state,
        project: {
          ...project,
          nodes: nodes.map((n) =>
            n.id === nodeId
              ? {
                  ...n,
                  connectors: n.connectors.map((conn) =>
                    conn.id === terminalId ? { ...conn, attributes: getAttributes(conn) } : conn
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
          ...project,
          edges: edges.map((e) =>
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
          ...project,
          edges: edges.map((e) =>
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
    case Types.CHANGE_SIMPLE_ATTRIBUTE_VALUE: {
      const { id, simpleId, nodeId, value, unitId: selectedUnitId } = action.payload;
      const getAttributes = (s: Simple) => {
        return s.attributes.map((a) => (a.id === id ? { ...a, value, selectedUnitId } : a));
      };

      return {
        ...state,
        project: {
          ...project,
          nodes: nodes.map((n) =>
            n.id === nodeId
              ? {
                  ...n,
                  simples: n.simples.map((s) => (s.id === simpleId ? { ...s, attributes: getAttributes(s) } : s)),
                }
              : n
          ),
        },
      };
    }

    case Types.CHANGE_ACTIVE_CONNECTOR: {
      const { nodeId, connectorId, connectorVisibility } = action.payload;

      const getConnectors = (n: Node) => {
        return n.connectors.map((conn) => (conn.id === connectorId ? { ...conn, connectorVisibility } : conn));
      };

      return {
        ...state,
        project: { ...project, nodes: nodes.map((n) => (n?.id === nodeId ? { ...n, connectors: getConnectors(n) } : n)) },
      };
    }

    case Types.EXPORT_PROJECT_TO_FILE:
      return {
        ...state,
        fetching: true,
        apiError: state.apiError ? state.apiError.filter((elem) => elem.key !== Types.EXPORT_PROJECT_TO_FILE) : state.apiError,
      };

    case Types.IMPORT_PROJECT:
      return {
        ...state,
        fetching: true,
        apiError: state.apiError ? state.apiError.filter((elem) => elem.key !== Types.IMPORT_PROJECT) : state.apiError,
      };

    case Types.EXPORT_PROJECT_TO_FILE_SUCCESS_OR_ERROR:
    case Types.IMPORT_PROJECT_SUCCESS_OR_ERROR:
    case Types.LOCK_NODE_SUCCESS_OR_ERROR:
    case Types.LOCK_ATTRIBUTE_SUCCESS_OR_ERROR:
    case Types.LOCK_EDGE_SUCCESS_OR_ERROR:
      return {
        ...state,
        fetching: false,
        apiError: action.payload.apiError ? [...state.apiError, action.payload.apiError] : state.apiError,
      };

    case Types.SET_LOCK_NODE: {
      const { id, isLocked, isLockedStatusBy, isLockedStatusDate } = action.payload;

      return {
        ...state,
        project: {
          ...project,
          nodes: nodes.map((x) =>
            x.id === id
              ? {
                  ...x,
                  isLocked,
                  isLockedStatusBy,
                  isLockedStatusDate,
                  attributes: x.attributes.map((attr) =>
                    UpdateAttributeIsLocked(attr, isLocked, isLockedStatusBy, isLockedStatusDate)
                  ),
                }
              : x
          ),
        },
      };
    }

    case Types.SET_LOCK_EDGE: {
      const { id, isLocked, isLockedStatusBy, isLockedStatusDate } = action.payload;

      return {
        ...state,
        project: {
          ...project,
          edges: edges.map((x) =>
            x.id === id
              ? {
                  ...x,
                  isLocked,
                  isLockedStatusBy,
                  transport: x.transport
                    ? {
                        ...x.transport,
                        attributes: x.transport?.attributes?.map((a) =>
                          UpdateAttributeIsLocked(a, isLocked, isLockedStatusBy, isLockedStatusDate)
                        ),
                      }
                    : null,
                  interface: x.interface
                    ? {
                        ...x.interface,
                        attributes: x.interface?.attributes?.map((a) =>
                          UpdateAttributeIsLocked(a, isLocked, isLockedStatusBy, isLockedStatusDate)
                        ),
                      }
                    : null,
                }
              : x
          ),
        },
      };
    }

    case Types.SET_LOCK_NODE_ATTRIBUTE: {
      const { id, nodeId, isLocked, isLockedStatusBy, isLockedStatusDate } = action.payload;

      return {
        ...state,
        project: {
          ...project,
          nodes: nodes.map((n) =>
            n.id === nodeId
              ? {
                  ...n,
                  attributes: n.attributes.map((a) =>
                    a.id === id ? UpdateAttributeIsLocked(a, isLocked, isLockedStatusBy, isLockedStatusDate) : a
                  ),
                }
              : n
          ),
        },
      };
    }

    case Types.SET_LOCK_NODE_TERMINAL_ATTRIBUTE: {
      const { id, terminalId, nodeId, isLocked, isLockedStatusBy, isLockedStatusDate } = action.payload;

      return {
        ...state,
        project: {
          ...project,
          nodes: nodes.map((n) =>
            n.id === nodeId
              ? {
                  ...n,
                  connectors: n.connectors.map((conn) =>
                    conn.id === terminalId
                      ? {
                          ...conn,
                          attributes: conn.attributes.map((a) =>
                            a.id === id ? UpdateAttributeIsLocked(a, isLocked, isLockedStatusBy, isLockedStatusDate) : a
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
    case Types.SET_LOCK_TRANSPORT_TERMINAL_ATTRIBUTE: {
      const { id, terminalId, transportId, isLocked, isLockedStatusBy, isLockedStatusDate } = action.payload;

      return {
        ...state,
        project: {
          ...project,
          edges: edges.map((e) =>
            e.transport && e.transport.id === transportId
              ? {
                  ...e,
                  transport: GetUpdatedEdgeInnerWithTerminalAttributeIsLocked(
                    e.transport,
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
    }
    case Types.SET_LOCK_INTERFACE_TERMINAL_ATTRIBUTE: {
      const { id, terminalId, interfaceId, isLocked, isLockedStatusBy, isLockedStatusDate } = action.payload;

      return {
        ...state,
        project: {
          ...project,
          edges: edges.map((e) =>
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
    }

    case Types.SET_LOCK_TRANSPORT_ATTRIBUTE: {
      const { id, transportId, isLocked, isLockedStatusBy, isLockedStatusDate } = action.payload;

      return {
        ...state,
        project: {
          ...project,
          edges: edges.map((e) =>
            e.transport && e.transport.id === transportId
              ? {
                  ...e,
                  transport: {
                    ...e.transport,
                    attributes: e.transport.attributes.map((a) =>
                      a.id === id ? UpdateAttributeIsLocked(a, isLocked, isLockedStatusBy, isLockedStatusDate) : a
                    ),
                  },
                }
              : e
          ),
        },
      };
    }

    case Types.SET_LOCK_INTERFACE_ATTRIBUTE: {
      const { id, interfaceId, isLocked, isLockedStatusBy, isLockedStatusDate } = action.payload;

      return {
        ...state,
        project: {
          ...project,
          edges: edges.map((e) =>
            e.interface && e.interface.id === interfaceId
              ? {
                  ...e,
                  interface: {
                    ...e.transport,
                    attributes: e.transport.attributes.map((a) =>
                      a.id === id ? UpdateAttributeIsLocked(a, isLocked, isLockedStatusBy, isLockedStatusDate) : a
                    ),
                  },
                }
              : e
          ),
        },
      };
    }

    case Types.SET_LOCK_SIMPLE_ATTRIBUTE: {
      const { id, simpleId, nodeId, isLocked, isLockedStatusBy, isLockedStatusDate } = action.payload;

      return {
        ...state,
        project: {
          ...project,
          nodes: nodes.map((n) =>
            n.id === nodeId
              ? {
                  ...n,
                  simples: n.simples.map((s) =>
                    s.id === simpleId
                      ? {
                          ...s,
                          attributes: s.attributes.map((a) =>
                            a.id === id ? UpdateAttributeIsLocked(a, isLocked, isLockedStatusBy, isLockedStatusDate) : a
                          ),
                        }
                      : s
                  ),
                }
              : n
          ),
        },
      };
    }

    case Types.CHANGE_NODE_UPDATED: {
      const { nodeId, updated, userName: updatedBy } = action.payload;

      return {
        ...state,
        project: { ...project, nodes: nodes.map((x) => (x.id === nodeId ? { ...x, updated, updatedBy } : x)) },
      };
    }

    case Types.UPDATE_NODE:
      return {
        ...state,
        project: {
          ...project,
          nodes: nodes.map((x) =>
            x.id === action.payload.id ? { ...action.payload, isSelected: x.isSelected, isBlockSelected: x.isBlockSelected } : x
          ),
        },
      };

    case Types.UPDATE_EDGE:
      return {
        ...state,
        project: {
          ...project,
          edges: edges.map((x) => (x.id === action.payload.id ? { ...action.payload, isSelected: x.isSelected } : x)),
        },
      };

    case Types.SET_OFFPAGE_STATUS: {
      const { nodeId, connectorId, isRequired } = action.payload;

      const getConnectors = (n: Node) => {
        return n.connectors.map((conn) => (conn.id === connectorId ? { ...conn, isRequired } : conn));
      };

      return {
        ...state,
        project: { ...project, nodes: nodes.map((n) => (n?.id === nodeId ? { ...n, connectors: getConnectors(n) } : n)) },
      };
    }

    case Types.CREATE_REQUIRED_OFFPAGE_NODE: {
      const { nodeId, connectorId, isRequired } = action.payload;
      const { node: offPageNode, transportEdge, partOfEdge } = action.payload.offPageObject;

      const getConnectors = (n: Node) => {
        return n.connectors.map((conn) => (conn.id === connectorId ? { ...conn, isRequired } : conn));
      };

      const nodesWithRequiredStatus = nodes.map((n) => (n?.id === nodeId ? { ...n, connectors: getConnectors(n) } : n));

      return {
        ...state,
        project: {
          ...project,
          nodes: [...nodesWithRequiredStatus, offPageNode],
          edges: [...edges, transportEdge, partOfEdge],
        },
      };
    }

    case Types.CREATE_CONNECTED_OFFPAGE_NODE: {
      const { node: offPageNode, transportEdge, partOfEdge } = action.payload.offPageObject;

      return {
        ...state,
        project: {
          ...project,
          nodes: [...nodes, offPageNode],
          edges: [...edges, partOfEdge, transportEdge],
        },
      };
    }

    default:
      return state;
  }
}
