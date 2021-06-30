import { Edge, Node, ProjectSimple } from "../../../models";
import { TraverseTree } from "./helpers/";
import { IsAspectNode } from "../../../components/flow/helpers/common";
import {
  FETCHING_PROJECT,
  FETCHING_PROJECT_SUCCESS_OR_ERROR,
  CREATING_PROJECT,
  CREATING_PROJECT_SUCCESS_OR_ERROR,
  ADD_NODE,
  REMOVE_NODE,
  ADD_EDGE,
  REMOVE_EDGE,
  ProjectActionTypes,
  ProjectState,
  UPDATE_POSITION,
  UPDATE_BLOCK_POSITION,
  CHANGE_NODE_VISIBILITY,
  SEARCH_PROJECT,
  SEARCH_PROJECT_SUCCESS_OR_ERROR,
  CHANGE_ACTIVE_NODE,
  SAVE_PROJECT,
  SAVE_PROJECT_SUCCESS_OR_ERROR,
  CHANGE_SELECTED_PROJECT,
  CHANGE_ALL_NODES,
  CHANGE_NODE_PROP_VALUE,
  CHANGE_ATTRIBUTE_VALUE,
  CHANGE_CONNECTOR_ATTRIBUTE_VALUE,
  CHANGE_EDGE_VISIBILITY,
  CHANGE_ACTIVE_BLOCKNODE,
  DELETE_PROJECT_ERROR,
  CHANGE_ACTIVE_CONNECTOR,
  CHANGE_ACTIVE_EDGE,
} from "./types";

const initialState: ProjectState = {
  fetching: false,
  creating: false,
  project: null,
  projectList: null,
  apiError: [],
};

export function projectReducer(
  state = initialState,
  action: ProjectActionTypes
) {
  switch (action.type) {
    case SAVE_PROJECT:
      return {
        ...state,
        fetching: true,
        creating: false,
        apiError: state.apiError
          ? state.apiError.filter((elem) => elem.key !== SAVE_PROJECT)
          : state.apiError,
      };

    case SAVE_PROJECT_SUCCESS_OR_ERROR:
      return {
        ...state,
        fetching: false,
        creating: false,
        project: action.payload.project,
        apiError: action.payload.apiError
          ? [...state.apiError, action.payload.apiError]
          : state.apiError,
      };

    case SEARCH_PROJECT:
      return {
        ...state,
        fetching: true,
        creating: false,
        projectList: null,
        apiError: state.apiError
          ? state.apiError.filter((elem) => elem.key !== SEARCH_PROJECT)
          : state.apiError,
      };

    case SEARCH_PROJECT_SUCCESS_OR_ERROR:
      return {
        ...state,
        fetching: false,
        creating: false,
        projectList: action.payload.projectList ?? state.projectList,
        apiError: action.payload.apiError
          ? [...state.apiError, action.payload.apiError]
          : state.apiError,
      };

    case FETCHING_PROJECT:
      return {
        ...state,
        fetching: true,
        creating: false,
        apiError: state.apiError
          ? state.apiError.filter((elem) => elem.key !== FETCHING_PROJECT)
          : state.apiError,
      };

    case FETCHING_PROJECT_SUCCESS_OR_ERROR:
      return {
        ...state,
        fetching: false,
        creating: false,
        project: action.payload.project ?? state.project,
        apiError: action.payload.apiError
          ? [...state.apiError, action.payload.apiError]
          : state.apiError,
      };

    case CREATING_PROJECT:
      return {
        ...state,
        fetching: false,
        creating: true,
        apiError: state.apiError
          ? state.apiError.filter((elem) => elem.key !== CREATING_PROJECT)
          : state.apiError,
      };

    case CREATING_PROJECT_SUCCESS_OR_ERROR:
      return {
        ...state,
        fetching: false,
        creating: false,
        project: action.payload.project ?? state.project,
        apiError: action.payload.apiError
          ? [...state.apiError, action.payload.apiError]
          : state.apiError,
      };

    case DELETE_PROJECT_ERROR:
      return {
        ...state,
        apiError: state.apiError
          ? state.apiError.filter((elem) => elem.key !== action.payload.key)
          : state.apiError,
      };

    case ADD_NODE:
      return {
        ...state,
        project: {
          ...state.project,
          nodes: [...state.project.nodes, action.payload],
        },
      };

    case REMOVE_NODE:
      return {
        ...state,
        project: {
          ...state.project,
          nodes: state.project.nodes.filter(
            (node) => node.id !== action.payload
          ),
        },
      };

    case ADD_EDGE:
      return {
        ...state,
        project: {
          ...state.project,
          edges: [...state.project.edges, action.payload],
        },
      };

    case REMOVE_EDGE:
      return {
        ...state,
        project: {
          ...state.project,
          edges: state.project.edges.filter(
            (edge) => edge?.id !== action.payload
          ),
        },
      };

    case UPDATE_POSITION:
      return {
        ...state,
        project: {
          ...state.project,
          nodes: state.project.nodes.map((node) =>
            node.id === action.payload.nodeId
              ? {
                  ...node,
                  positionX: action.payload.x,
                  positionY: action.payload.y,
                }
              : node
          ),
        },
      };

    case UPDATE_BLOCK_POSITION:
      return {
        ...state,
        project: {
          ...state.project,
          nodes: state.project.nodes.map((node) =>
            node.id === action.payload.nodeId
              ? {
                  ...node,
                  positionBlockX: action.payload.x,
                  positionBlockY: action.payload.y,
                }
              : node
          ),
        },
      };

    case CHANGE_EDGE_VISIBILITY:
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

    case CHANGE_NODE_VISIBILITY:
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
            nodes: nodeList.map((node) =>
              action.payload.node.aspect === node.aspect
                ? { ...node, isHidden: isHidden }
                : node
            ),
            edges: edgeList.map((edge) =>
              node.aspect === edge.fromNode.aspect ||
              node.aspect === edge.toNode.aspect ||
              edge.fromNode === node
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
            nodes: state.project.nodes.map((node) =>
              elements.includes(node) ? { ...node, isHidden: isHidden } : node
            ),
            edges: edgeList.map((edge) =>
              elements.includes(edge) || edge.toNode === node
                ? { ...edge, isHidden: isHidden }
                : edge
            ),
          },
        };
      }

      return {
        ...state,
        project: {
          ...state.project,
          nodes: state.project.nodes.map((node) =>
            node.id === action.payload.node.id
              ? { ...node, isHidden: isHidden }
              : node
          ),
          edges: edgeList.map((edge) =>
            edge.fromNodeId === node.id || edge.toNodeId === node.id
              ? { ...edge, isHidden: isHidden }
              : edge
          ),
        },
      };

    case CHANGE_ACTIVE_NODE:
      const id = action.payload.nodeId;
      return {
        ...state,
        project: {
          ...state.project,
          nodes: state.project.nodes.map((node) =>
            node.id === id
              ? { ...node, isSelected: action.payload.isActive }
              : { ...node, isSelected: false }
          ),
          edges: state.project.edges,
        },
      };

    case CHANGE_ACTIVE_EDGE:
      const edgeId = action.payload.edgeId;
      return {
        ...state,
        project: {
          ...state.project,
          edges: state.project.edges.map((edge) =>
            edge.id === edgeId
              ? { ...edge, isSelected: action.payload.isActive }
              : { ...edge, isSelected: false }
          ),
        },
      };

    case CHANGE_ACTIVE_BLOCKNODE:
      const blockId = action.payload.nodeId;
      return {
        ...state,
        project: {
          ...state.project,
          nodes: state.project.nodes.map((node) =>
            node.id === blockId
              ? { ...node, isBlockSelected: true }
              : { ...node, isBlockSelected: false }
          ),
          edges: state.project.edges,
        },
      };

    case CHANGE_SELECTED_PROJECT:
      const projectId = action.payload.projectId;
      const projects = state.projectList as ProjectSimple[];

      return {
        ...state,
        ...state.project,
        projectList: projects.map((project) =>
          project.id === projectId
            ? { ...project, selected: true }
            : { ...project, selected: false }
        ),
      };

    case CHANGE_ALL_NODES:
      return {
        ...state,
        project: {
          ...state.project,
          nodes: state.project.nodes.map(
            (node) =>
              state && {
                ...node,
                isHidden: true,
              }
          ),
        },
      };

    case CHANGE_NODE_PROP_VALUE:
      return {
        ...state,
        project: {
          ...state.project,
          nodes: state.project.nodes.map((node) =>
            node.id === action.payload.nodeId
              ? {
                  ...node,
                  [action.payload.propName]: action.payload.propValue,
                }
              : node
          ),
        },
      };

    case CHANGE_ATTRIBUTE_VALUE:
      return {
        ...state,
        project: {
          ...state.project,
          nodes: state.project.nodes.map((node) =>
            node.id === action.payload.nodeId
              ? {
                  ...node,
                  attributes: node.attributes.map((attribute) =>
                    attribute.id === action.payload.id
                      ? {
                          ...attribute,
                          value: action.payload.value,
                          selectedUnitId: action.payload.unit,
                        }
                      : attribute
                  ),
                }
              : node
          ),
        },
      };

    case CHANGE_CONNECTOR_ATTRIBUTE_VALUE:
      return {
        ...state,
        project: {
          ...state.project,
          nodes: state.project.nodes.map((node) =>
            node.id === action.payload.nodeId
              ? {
                  ...node,
                  connectors: node.connectors.map((connector) =>
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
              : node
          ),
        },
      };

    case CHANGE_ACTIVE_CONNECTOR:
      return {
        ...state,
        project: {
          ...state.project,
          nodes: state.project.nodes.map((node) =>
            node?.id === action.payload.node?.id
              ? {
                  ...node,
                  connectors: node.connectors.map((conn) =>
                    conn.id === action.payload.connectorId
                      ? {
                          ...conn,
                          visible: action.payload.visible,
                        }
                      : conn
                  ),
                }
              : node
          ),
        },
      };

    default:
      return state;
  }
}
