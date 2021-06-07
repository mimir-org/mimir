import {
  ADD_CONNECT_NODE,
  ADD_MAIN_CONNECT_NODE,
  REMOVE_ALL_CONNECT_NODES,
  REMOVE_CONNECT_NODE,
} from "./types";

const initialState = {
  mainNode: null,
  connectNodes: [],
};

export function connectViewReducer(state = initialState, action) {
  const node = action.payload?.node;
  switch (action.type) {
    case ADD_CONNECT_NODE:
      return {
        ...state,
        connectNodes: [...state.connectNodes, node],
      };

    case REMOVE_CONNECT_NODE:
      return {
        ...state,
        connectNodes: state.connectNodes.filter((x) => x.id !== node.id),
      };

    case REMOVE_ALL_CONNECT_NODES:
      return {
        ...state,
        connectNodes: [],
      };

    case ADD_MAIN_CONNECT_NODE:
      return {
        ...state,
        mainNode: action.payload.mainNode,
      };

    default:
      return state;
  }
}
