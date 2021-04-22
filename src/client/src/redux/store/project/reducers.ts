import { NodeType } from "../../../models/project";
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
  CHANGE_NODE_VISIBILITY,
  CHANGE_EDGE_VISIBILITY,
  SEARCH_PROJECT,
  SEARCH_PROJECT_SUCCESS_OR_ERROR,
} from "./types";

const initialState: ProjectState = {
  fetching: false,
  creating: false,
  project: null,
  hasError: false,
  errorMsg: null,
  projectList: null,
};

export function projectReducer(
  state = initialState,
  action: ProjectActionTypes
) {
  switch (action.type) {
    case SEARCH_PROJECT:
      return {
        ...state,
        fetching: true,
        creating: false,
        hasError: false,
        errorMsg: null,
        projectList: null,
      };
    case SEARCH_PROJECT_SUCCESS_OR_ERROR:
      return {
        ...state,
        fetching: false,
        creating: false,
        hasError: action.payload.hasError,
        errorMsg: action.payload.errorMsg,
        projectList: action.payload.projectList,
      };
    case FETCHING_PROJECT:
      return {
        ...state,
        fetching: true,
        creating: false,
        project: null,
        hasError: false,
        errorMsg: null,
      };

    case FETCHING_PROJECT_SUCCESS_OR_ERROR:
      return {
        ...state,
        fetching: action.payload.fetching,
        creating: action.payload.creating,
        project: action.payload.project,
        hasError: action.payload.hasError,
        errorMsg: action.payload.errorMsg,
      };

    case CREATING_PROJECT:
      return {
        ...state,
        fetching: false,
        creating: true,
        project: null,
        hasError: false,
        errorMsg: null,
      };

    case CREATING_PROJECT_SUCCESS_OR_ERROR:
      return {
        ...state,
        fetching: action.payload.fetching,
        creating: action.payload.creating,
        project: action.payload.project,
        hasError: action.payload.hasError,
        errorMsg: action.payload.errorMsg,
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
                  position: { x: action.payload.x, y: action.payload.y },
                }
              : node
          ),
        },
      };

    case CHANGE_NODE_VISIBILITY:
      const nodeId: string = action.payload.nodeId;
      const isAspect: boolean = action.payload.isAspect;
      const isParent: boolean = action.payload.isParent;
      const type: NodeType = action.payload.type;

      if (isAspect) {
        return {
          ...state,
          project: {
            nodes: state.project.nodes.map((nodes, i) =>
              state.project.nodes[i].type === type ||
              state.project.nodes[i].label === type
                ? { ...nodes, isHidden: action.payload.isHidden }
                : nodes
            ),
            edges: state.project.edges.map((edges, i) =>
              state.project.edges[i].parentType === type ||
              state.project.edges[i].fromNode === nodeId
                ? { ...edges, isHidden: action.payload.isHidden }
                : edges
            ),
          },
        };
      }
      if (isParent) {
        let children = [];
        children.push(nodeId);
        let childId = nodeId;

        const getChildId = () => {
          return childId;
        };

        while (childId !== undefined) {
          const edge = state.project.edges.find(
            (edge) => edge.fromNode === getChildId()
          );
          if (edge === undefined) break;

          const nextChild = state.project.nodes.find(
            (node) => node.id === edge.toNode
          ).id;

          children.push(edge.id, nextChild);
          childId = nextChild;
        }

        return {
          ...state,
          project: {
            nodes: state.project.nodes.map((nodes, i) =>
              children.includes(state.project.nodes[i].id)
                ? { ...nodes, isHidden: action.payload.isHidden }
                : nodes
            ),
            edges: state.project.edges.map((edges, i) =>
              children.includes(state.project.edges[i].id)
                ? { ...edges, isHidden: action.payload.isHidden }
                : edges
            ),
          },
        };
      }

      return {
        ...state,
        project: {
          nodes: state.project.nodes.map((nodes, i) =>
            state.project.nodes[i].id === nodeId
              ? { ...nodes, isHidden: action.payload.isHidden }
              : nodes
          ),
          edges: state.project.edges,
        },
      };

    case CHANGE_EDGE_VISIBILITY:
      const edgeId = action.payload.edgeId;
      return {
        ...state,
        project: {
          edges: state.project.edges.map((edges, i) =>
            state.project.edges[i].id === edgeId
              ? { ...edges, isHidden: action.payload.isHidden }
              : edges
          ),
          nodes: state.project.nodes,
        },
      };

    default:
      return state;
  }
}
