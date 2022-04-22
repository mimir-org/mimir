import * as Types from "./types";
import { Edge, Node } from "../../../models";
import { IsAspectNode, IsFamily } from "../../../helpers";
import {
  getEdgeInterfaceAttributeMap,
  getEdgeInterfaceTerminalAttributeMap,
  getEdgeTransportAttributeMap,
  getEdgeTransportTerminalAttributeMap,
  getNodeAttributeMap,
  getNodeConnectorAttributeMap,
  getNodeSimpleAttributeMap,
  GetUpdatedEdgeInnerWithTerminalAttributeValue,
  setLockEdge,
  setLockInterfaceAttribute,
  setLockInterfaceTerminalAttribute,
  setLockNode,
  setLockNodeAttribute,
  setLockNodeTerminalAttribute,
  setLockSimpleAttribute,
  setLockTransportAttribute,
  setLockTransportTerminalAttribute,
  TraverseTree,
} from "./helpers/";

const initialState: Types.ProjectState = {
  fetching: false,
  creating: false,
  isLocking: false,
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
          nodes: state.project?.nodes.map((x) =>
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

    case Types.UPDATE_BLOCK_SIZE:
      return {
        ...state,
        project: {
          ...state.project,
          nodes: state.project?.nodes.map((x) =>
            x.id === action.payload.nodeId
              ? {
                  ...x,
                  width: action.payload.size.width,
                  height: action.payload.size.height,
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
          nodes: allNodes?.map((x) => (x.id === nodeId ? { ...x, isSelected: active } : { ...x, isSelected: false })),
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
          edges: edges?.map((edge) => (edge.id === edgeId ? { ...edge, isSelected: active } : { ...edge, isSelected: false })),
        },
      };
    }

    case Types.SET_ACTIVE_BLOCKNODE: {
      const blockId = action.payload.nodeId;
      const nodes = state.project.nodes;

      return {
        ...state,
        project: {
          ...state.project,
          nodes: nodes?.map((x) => (x.id === blockId ? { ...x, isBlockSelected: true } : { ...x, isBlockSelected: false })),
          edges: state.project.edges,
        },
      };
    }

    case Types.CHANGE_SELECTED_PROJECT: {
      const projectId = action.payload.projectId;
      const projects = state.projectList;

      return {
        ...state,
        ...state.project,
        projectList: projects.map((project) =>
          project.id === projectId ? { ...project, selected: true } : { ...project, selected: false }
        ),
      };
    }

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
    case Types.CHANGE_SIMPLE_ATTRIBUTE_VALUE: {
      const { id, simpleId, nodeId, value, unitId } = action.payload;

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
                              ? {
                                  ...attribute,
                                  value,
                                  selectedUnitId: unitId,
                                }
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
                          connectorVisibility: action.payload.connectorVisibility,
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
    case Types.LOCK_ENTITY:
      return {
        ...state,
        isLocking: true,
      };
    case Types.LOCK_ENTITY_SUCCESS_OR_ERROR:
      return {
        ...state,
        fetching: false,
        isLocking: false,
        apiError: action.payload.apiError ? [...state.apiError, action.payload.apiError] : state.apiError,
      };

    case Types.SET_LOCK_NODE: {
      const modifiedState = { ...state, isLocking: false };
      return setLockNode(action.payload, modifiedState);
    }

    case Types.SET_LOCK_NODES: {
      const nodeLocks = action.payload;

      let modifiedState = { ...state, isLocking: false };

      nodeLocks.forEach((nodeLock) => {
        modifiedState = setLockNode(nodeLock, modifiedState);
      });

      return modifiedState;
    }

    case Types.SET_LOCK_EDGE: {
      const modifiedState = { ...state, isLocking: false };
      return setLockEdge(action.payload, modifiedState);
    }

    case Types.SET_LOCK_EDGES: {
      const edgeLocks = action.payload;

      let modifiedState = { ...state, isLocking: false };

      edgeLocks.forEach((edgeLock) => {
        modifiedState = setLockEdge(edgeLock, modifiedState);
      });

      return modifiedState;
    }

    case Types.SET_LOCK_ATTRIBUTE: {
      const { id } = action.payload;

      const nodeAttributeMapTarget = getNodeAttributeMap(state.project.nodes)[id];
      if (nodeAttributeMapTarget) {
        return setLockNodeAttribute({ ...nodeAttributeMapTarget, ...action.payload }, state);
      }

      const nodeConnectorAttributeMapTarget = getNodeConnectorAttributeMap(state.project.nodes)[id];
      if (nodeConnectorAttributeMapTarget) {
        return setLockNodeTerminalAttribute({ ...nodeConnectorAttributeMapTarget, ...action.payload }, state);
      }

      const nodeSimpleAttributeMapTarget = getNodeSimpleAttributeMap(state.project.nodes)[id];
      if (nodeSimpleAttributeMapTarget) {
        return setLockSimpleAttribute({ ...nodeSimpleAttributeMapTarget, ...action.payload }, state);
      }

      const edgeTransportAttributeMapTarget = getEdgeTransportAttributeMap(state.project.edges)[id];
      if (edgeTransportAttributeMapTarget) {
        return setLockTransportAttribute({ ...edgeTransportAttributeMapTarget, ...action.payload }, state);
      }

      const edgeTransportTerminalAttributeMapTarget = getEdgeTransportTerminalAttributeMap(state.project.edges)[id];
      if (edgeTransportTerminalAttributeMapTarget) {
        return setLockTransportTerminalAttribute({ ...edgeTransportTerminalAttributeMapTarget, ...action.payload }, state);
      }

      const edgeInterfaceAttributeMapTarget = getEdgeInterfaceAttributeMap(state.project.edges)[id];
      if (edgeInterfaceAttributeMapTarget) {
        return setLockInterfaceAttribute({ ...edgeInterfaceAttributeMapTarget, ...action.payload }, state);
      }

      const edgeInterfaceTerminalAttributeMapTarget = getEdgeInterfaceTerminalAttributeMap(state.project.edges)[id];
      if (edgeInterfaceTerminalAttributeMapTarget) {
        return setLockInterfaceTerminalAttribute({ ...edgeInterfaceTerminalAttributeMapTarget, ...action.payload }, state);
      }

      return { ...state, isLocking: false };
    }

    case Types.SET_LOCK_ATTRIBUTES: {
      const attributeLocks = action.payload;

      const nodeAttributeMap = getNodeAttributeMap(state.project.nodes);
      const nodeConnectorAttributeMap = getNodeConnectorAttributeMap(state.project.nodes);
      const nodeSimpleAttributeMap = getNodeSimpleAttributeMap(state.project.nodes);
      const edgeTransportAttributeMap = getEdgeTransportAttributeMap(state.project.edges);
      const edgeTransportTerminalAttributeMap = getEdgeTransportTerminalAttributeMap(state.project.edges);
      const edgeInterfaceAttributeMap = getEdgeInterfaceAttributeMap(state.project.edges);
      const edgeInterfaceTerminalAttributeMap = getEdgeInterfaceTerminalAttributeMap(state.project.edges);

      let modifiedState = { ...state, isLocking: false };

      attributeLocks.forEach((attributeLock) => {
        const nodeAttributeMapTarget = nodeAttributeMap[attributeLock.id];
        if (nodeAttributeMapTarget) {
          modifiedState = setLockNodeAttribute({ ...nodeAttributeMapTarget, ...attributeLock }, modifiedState);
        }

        const nodeConnectorAttributeMapTarget = nodeConnectorAttributeMap[attributeLock.id];
        if (nodeConnectorAttributeMapTarget) {
          modifiedState = setLockNodeTerminalAttribute({ ...nodeConnectorAttributeMapTarget, ...attributeLock }, modifiedState);
        }

        const nodeSimpleAttributeMapTarget = nodeSimpleAttributeMap[attributeLock.id];
        if (nodeSimpleAttributeMapTarget) {
          modifiedState = setLockSimpleAttribute({ ...nodeSimpleAttributeMapTarget, ...attributeLock }, modifiedState);
        }

        const edgeTransportAttributeMapTarget = edgeTransportAttributeMap[attributeLock.id];
        if (edgeTransportAttributeMapTarget) {
          modifiedState = setLockTransportAttribute({ ...edgeTransportAttributeMapTarget, ...attributeLock }, modifiedState);
        }

        const edgeTransportTerminalAttributeMapTarget = edgeTransportTerminalAttributeMap[attributeLock.id];
        if (edgeTransportTerminalAttributeMapTarget) {
          modifiedState = setLockTransportTerminalAttribute(
            { ...edgeTransportTerminalAttributeMapTarget, ...attributeLock },
            modifiedState
          );
        }

        const edgeInterfaceAttributeMapTarget = edgeInterfaceAttributeMap[attributeLock.id];
        if (edgeInterfaceAttributeMapTarget) {
          modifiedState = setLockInterfaceAttribute({ ...edgeInterfaceAttributeMapTarget, ...attributeLock }, modifiedState);
        }

        const edgeInterfaceTerminalAttributeMapTarget = edgeInterfaceTerminalAttributeMap[attributeLock.id];
        if (edgeInterfaceTerminalAttributeMapTarget) {
          modifiedState = setLockInterfaceTerminalAttribute(
            { ...edgeInterfaceTerminalAttributeMapTarget, ...attributeLock },
            modifiedState
          );
        }
      });

      return modifiedState;
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
          nodes: state.project.nodes.map((x) =>
            x.id === action.payload.id ? { ...action.payload, isSelected: x.isSelected, isBlockSelected: x.isBlockSelected } : x
          ),
        },
      };

    case Types.UPDATE_EDGE:
      return {
        ...state,
        project: {
          ...state.project,
          edges: state.project.edges.map((x) =>
            x.id === action.payload.id ? { ...action.payload, isSelected: x.isSelected } : x
          ),
        },
      };

    case Types.SET_OFFPAGE_STATUS:
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
                          isRequired: action.payload.isRequired,
                        }
                      : conn
                  ),
                }
              : n
          ),
        },
      };

    case Types.CREATE_REQUIRED_OFFPAGE_NODE: {
      const nodesWithRequiredStatus = state.project.nodes.map((n) =>
        n?.id === action.payload.nodeId
          ? {
              ...n,
              connectors: n.connectors.map((conn) =>
                conn.id === action.payload.connectorId
                  ? {
                      ...conn,
                      isRequired: action.payload.isRequired,
                    }
                  : conn
              ),
            }
          : n
      );

      return {
        ...state,
        project: {
          ...state.project,
          nodes: [...nodesWithRequiredStatus, action.payload.offPageObject.node],
          edges: [...state.project.edges, action.payload.offPageObject.partOfEdge, action.payload.offPageObject.transportEdge],
        },
      };
    }

    case Types.CREATE_CONNECTED_OFFPAGE_NODE:
      return {
        ...state,
        project: {
          ...state.project,
          nodes: [...state.project.nodes, action.payload.offPageObject.node],
          edges: [...state.project.edges, action.payload.offPageObject.partOfEdge, action.payload.offPageObject.transportEdge],
        },
      };

    default:
      return state;
  }
}
