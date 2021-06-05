import { Edge, Node, ProjectSimple } from "../../../models/project";
import { TraverseTree } from "./helpers/";
import {
  IsAspectNode,
  IsAspectSameType,
  IsSameType,
} from "../../../components/flow/helpers/common";
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
      // TODO: nuke all children
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
            (edge) => edge.id !== action.payload
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
          edges: state.project.edges.map((edge, i) =>
            state.project.edges[i].id === action.payload.edge.id
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
            nodes: nodeList.map((nodes, i) =>
              IsAspectSameType(node, nodeList[i])
                ? { ...nodes, isHidden: isHidden }
                : nodes
            ),
            edges: edgeList.map((edges, i) =>
              IsSameType(node.type, edgeList[i].parentType) ||
              IsSameType(node.type, edgeList[i].targetType) ||
              edgeList[i].fromNode === node.id
                ? { ...edges, isHidden: isHidden }
                : edges
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
            nodes: state.project.nodes.map((nodes, i) =>
              elements.includes(state.project.nodes[i])
                ? { ...nodes, isHidden: isHidden }
                : nodes
            ),
            edges: edgeList.map((edges, i) =>
              elements.includes(edgeList[i]) || edgeList[i].toNode === node.id
                ? { ...edges, isHidden: isHidden }
                : edges
            ),
          },
        };
      }

      return {
        ...state,
        project: {
          ...state.project,
          nodes: state.project.nodes.map((nodes, i) =>
            state.project.nodes[i].id === node.id
              ? { ...nodes, isHidden: isHidden }
              : nodes
          ),
          edges: edgeList.map((edges, i) =>
            edgeList[i].fromNode === node.id || edgeList[i].toNode === node.id
              ? { ...edges, isHidden: isHidden }
              : edges
          ),
        },
      };
    case CHANGE_ACTIVE_NODE:
      const id = action.payload.nodeId;
      return {
        ...state,
        project: {
          ...state.project,
          nodes: state.project.nodes.map((x, i) =>
            state.project.nodes[i].id === id
              ? { ...x, isSelected: action.payload.isActive }
              : { ...x, isSelected: false }
          ),
          edges: state.project.edges,
        },
      };

    case CHANGE_ACTIVE_BLOCKNODE:
      const blockId = action.payload.nodeId;
      return {
        ...state,
        project: {
          ...state.project,
          nodes: state.project.nodes.map((x, i) =>
            state.project.nodes[i].id === blockId
              ? { ...x, isBlockSelected: true }
              : { ...x, isBlockSelected: false }
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
        projectList: projects.map((x, i) =>
          projects[i].id === projectId
            ? { ...x, selected: true }
            : { ...x, selected: false }
        ),
      };

    case CHANGE_ALL_NODES:
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
                          unit: action.payload.unit,
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

    default:
      return state;
  }
}
