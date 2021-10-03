import * as Types from "./types";
import { Node } from "../../../models";

const initialState = {
  mainNodes: [] as Node[],
};

export function connectViewReducer(state = initialState, action: Types.ConnectViewActionTypes) {
  switch (action.type) {
    case Types.ADD_MAIN_CONNECT_NODE:
      return {
        ...state,
        mainNodes: [...state.mainNodes, action.payload.node],
      };

    case Types.REMOVE_MAIN_CONNECT_NODE:
      return {
        ...state,
        mainNodes: state.mainNodes.filter((x) => x?.id !== action.payload.node.id),
      };

    case Types.REMOVE_MAIN_CONNECT_NODES:
      return {
        ...state,
        mainNodes: [],
      };

    // Select one connect node from drop-down
    case Types.ADD_CONNECT_NODE:
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
    case Types.ADD_CONNECT_NODES:
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

    case Types.REMOVE_CONNECT_NODE:
      const mainConnectNode = {
        ...state.mainNodes.find((x) => x.id === action.payload.mainNode.id),
      } as Node;

      mainConnectNode.connectNodes = mainConnectNode.connectNodes?.filter((x) => x.id !== action.payload.child.id);

      return {
        mainNodes: state.mainNodes.filter((x) => x?.id !== action.payload.mainNode.id).concat(mainConnectNode),
      };

    case Types.REMOVE_CONNECT_NODES:
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
