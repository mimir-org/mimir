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
} from "./types";

const initialState: ProjectState = {
  fetching: false,
  creating: false,
  project: null,
  hasError: false,
  errorMsg: null,
};

export function projectReducer(
  state = initialState,
  action: ProjectActionTypes
) {
  switch (action.type) {
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
      const nodeId = action.payload.nodeId;
      const isAspect = action.payload.isAspect;
      const type = action.payload.type;

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
            edges: state.project.edges,
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
