import { Node } from "../../../models";
import {
  ADD_MAIN_CONNECT_NODE,
  REMOVE_MAIN_CONNECT_NODE,
  ADD_CONNECT_NODE,
  ADD_CONNECT_NODES,
  REMOVE_CONNECT_NODE,
  REMOVE_CONNECT_NODES,
  REMOVE_MAIN_CONNECT_NODES,
  ConnectViewActionTypes,
} from "./types";

const initialState = {
  mainNodes: [] as Node[],
};

export function connectViewReducer(state = initialState, action: ConnectViewActionTypes) {
  switch (action.type) {
    case ADD_MAIN_CONNECT_NODE:
      return {
        ...state,
        mainNodes: [...state.mainNodes, action.payload.node],
      };

    case REMOVE_MAIN_CONNECT_NODE:
      return {
        ...state,
        mainNodes: state.mainNodes.filter((x) => x?.id !== action.payload.node.id),
      };

    case REMOVE_MAIN_CONNECT_NODES:
      return {
        ...state,
        mainNodes: [],
      };

    // Select one connect node from drop-down
    case ADD_CONNECT_NODE:
      const mainNode = {
        ...state.mainNodes.find((x) => x.id === action.payload.mainNode.id),
      } as Node;

      const child = action.payload.child;
      mainNode.connectNodes = (mainNode.connectNodes ?? []).concat(child);
      const filterMainNodes = state.mainNodes.filter((x) => x?.id !== action.payload.mainNode.id);

      return {
        mainNodes: filterMainNodes.concat(mainNode),
      };

    // Select all connect nodes from drop-down
    case ADD_CONNECT_NODES:
      const parent = {
        ...state.mainNodes.find((x) => x.id === action.payload.mainNode.id),
      } as Node;

      const children = action.payload.nodes;

      children.forEach((n) => {
        const isNodeAdded = parent.connectNodes?.find((x) => x.id === n.id) !== undefined;
        if (!isNodeAdded) parent.connectNodes = (parent.connectNodes ?? []).concat(n);
      });

      return {
        mainNodes: state.mainNodes.filter((x) => x?.id !== parent.id).concat(parent),
      };

    case REMOVE_CONNECT_NODE:
      const mainConnectNode = {
        ...state.mainNodes.find((x) => x.id === action.payload.mainNode.id),
      } as Node;

      mainConnectNode.connectNodes = mainConnectNode.connectNodes?.filter((x) => x.id !== action.payload.child.id);

      return {
        mainNodes: state.mainNodes.filter((x) => x?.id !== action.payload.mainNode.id).concat(mainConnectNode),
      };

    case REMOVE_CONNECT_NODES:
      const main = {
        ...state.mainNodes.find((x) => x.id === action.payload.node.id),
      } as Node;

      main.connectNodes = [];

      return {
        mainNodes: state.mainNodes.filter((x) => x?.id !== main.id).concat(main),
      };

    default:
      return state;
  }
}
