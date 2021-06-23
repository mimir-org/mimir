import { Node } from "../../../models";
import {
  ADD_MAIN_CONNECT_NODE,
  REMOVE_MAIN_CONNECT_NODE,
  ADD_CONNECT_NODE,
  REMOVE_CONNECT_NODE,
  REMOVE_ALL_CONNECT_NODES,
  REMOVE_ALL_MAIN_NODES,
} from "./types";

const initialState = {
  mainNodes: [] as Node[],
};

export function connectViewReducer(state = initialState, action) {
  const node = action.payload?.node as Node;

  switch (action.type) {
    case ADD_MAIN_CONNECT_NODE:
      return {
        ...state,
        mainNodes: [...state?.mainNodes, node],
      };

    case REMOVE_MAIN_CONNECT_NODE:
      return {
        ...state,
        mainNodes: state.mainNodes.filter((x) => x?.id !== node.id),
      };

    // work in progress
    case ADD_CONNECT_NODE:
      const mainNode = action.payload.mainNode;
      const child = action.payload.child;
      return {
        ...state,
        mainNodes: state.mainNodes.map(
          (node) =>
            node.id === mainNode.id && {
              ...node,
              connectNodes: [child],
            }
        ),
      };

    // case ADD_CONNECT_NODE:
    //   return {
    //     ...state,
    //     connectNodes: [...state.connectNodes, node],
    //   };

    // case REMOVE_CONNECT_NODE:
    //   return {
    //     ...state,
    //     connectNodes: state.connectNodes.filter((x) => x.id !== node.id),
    //   };

    case REMOVE_ALL_MAIN_NODES:
      return {
        ...state,
        mainNodes: [],
      };

    // case REMOVE_ALL_CONNECT_NODES:
    //   return {
    //     ...state,
    //     connectNodes: [],
    //   };

    default:
      return state;
  }
}
