import { Node } from "../../../models";
import {
  ADD_MAIN_CONNECT_NODE,
  REMOVE_MAIN_CONNECT_NODE,
  ADD_CONNECT_NODE,
  REMOVE_CONNECT_NODE,
  REMOVE_ALL_MAIN_NODES,
} from "./types";

const initialState = {
  mainNodes: [] as Node[],
};

export function connectViewReducer(action, state = initialState) {
  const node = action.payload?.node as Node;

  switch (action.type) {
    case ADD_MAIN_CONNECT_NODE:
      return {
        ...state,
        mainNodes: [...state.mainNodes, node],
      };

    case REMOVE_MAIN_CONNECT_NODE:
      return {
        ...state,
        mainNodes: state.mainNodes.filter((x) => x?.id !== node.id),
      };

    case ADD_CONNECT_NODE:
      const mainNodeId = action.payload.mainNode.id;
      const child = action.payload.child;

      const mainNode = {
        ...state.mainNodes.find((x) => x.id === mainNodeId),
      } as Node;

      mainNode.connectNodes = (mainNode.connectNodes ?? []).concat(child);
      const filterMainNodes = state.mainNodes.filter(
        (x) => x?.id !== mainNodeId
      );

      return {
        mainNodes: filterMainNodes.concat(mainNode),
      };

    case REMOVE_CONNECT_NODE:
      const mainConnectNodeId = action.payload.mainNode.id;
      const connectChild = action.payload.child;

      const mainConnectNode = {
        ...state.mainNodes.find((x) => x.id === mainConnectNodeId),
      } as Node;

      mainConnectNode.connectNodes = mainConnectNode.connectNodes?.filter(
        (x) => x.id !== connectChild.id
      );
      const filterMainConnectNodes = state.mainNodes.filter(
        (x) => x?.id !== mainConnectNodeId
      );

      return {
        mainNodes: filterMainConnectNodes.concat(mainConnectNode),
      };

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
