import { IsAspectNode } from "../../../components/flow/helpers";
import { Edge, Node, ProjectSimple } from "../../../models/project";
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
    case SAVE_PROJECT:
      return {
        ...state,
        fetching: true,
        creating: false,
        hasError: false,
        errorMsg: null,
      };

    case SAVE_PROJECT_SUCCESS_OR_ERROR:
      return {
        ...state,
        fetching: false,
        creating: false,
        hasError: action.payload.hasError,
        errorMsg: action.payload.errorMsg,
        project: action.payload.project,
      };

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

    case CHANGE_NODE_VISIBILITY:
      const node = action.payload.node;
      const nodeList = state.project.nodes;
      const edgeList = state.project.edges;
      const isParent = action.payload.isParent;
      const type = action.payload.type;
      const isHidden = !node.isHidden;

      if (IsAspectNode(node.type)) {
        return {
          ...state,
          project: {
            ...state.project,
            nodes: nodeList.map((nodes, i) =>
              nodeList[i].type === type || nodeList[i].label === type
                ? { ...nodes, isHidden: isHidden }
                : nodes
            ),
            edges: edgeList.map((edges, i) =>
              edgeList[i].parentType === type ||
              edgeList[i].targetType === type ||
              edgeList[i].fromNode === node.id
                ? { ...edges, isHidden: isHidden }
                : edges
            ),
          },
        };
      }

      if (isParent) {
        console.log("isParent: ", node);
        let children: (Node | Edge)[] = [];
        children.push(node);
        let parentNode = node;

        // Find all direct children
        let firstEdges: Edge[] = [];
        let firstChildrenId = [];
        for (let i = 0; i < edgeList.length; i++) {
          if (edgeList[i].fromNode === node.id) {
            firstEdges.push(edgeList[i]);
            firstChildrenId.push(edgeList[i].toNode);
          }
        }
        let childrenToRemove: Node[] = [];
        const nodeOne = nodeList.find((x) => x.id === firstChildrenId[0]);
        childrenToRemove.push(nodeOne);
        const nodeTwo = nodeList.find((x) => x.id === firstChildrenId[1]);
        childrenToRemove.push(nodeTwo);
        console.log({ childrenToRemove });

        // const getChild = () => {
        //   return childNode.id;
        // };

        while (parentNode !== undefined) {
          const edge = edgeList.find((edge) => edge.fromNode === parentNode.id);
          if (edge === undefined) break;

          const nextChild = state.project.nodes.find(
            (node) => node.id === edge.toNode
          );

          // Only change nodes of same type
          if (nextChild.type === type) children.push(nextChild);

          children.push(edge);
          parentNode = nextChild;
        }

        return {
          ...state,
          project: {
            ...state.project,
            nodes: state.project.nodes.map((nodes, i) =>
              children.includes(state.project.nodes[i])
                ? { ...nodes, isHidden: isHidden }
                : nodes
            ),
            edges: edgeList.map((edges, i) =>
              children.includes(edgeList[i]) || edgeList[i].toNode === node.id
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
              ? { ...x, isSelected: true }
              : { ...x, isSelected: false }
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

    default:
      return state;
  }
}
