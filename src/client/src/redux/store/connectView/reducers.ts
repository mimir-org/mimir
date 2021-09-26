import { Node } from "../../../models";
import {
  ADD_MAIN_CONNECT_NODE,
  REMOVE_MAIN_CONNECT_NODE,
  ADD_CONNECT_NODE,
  REMOVE_CONNECT_NODE,
  REMOVE_CONNECT_NODES,
  REMOVE_ALL_MAIN_NODES,
  ConnectViewActionTypes,
} from "./types";

const initialState = {
  mainNodes: [] as Node[],
};

export function connectViewReducer(
  state = initialState,
  action: ConnectViewActionTypes
) {
  switch (action.type) {
    case ADD_MAIN_CONNECT_NODE:
      return {
        ...state,
        mainNodes: [...state.mainNodes, action.payload.node],
      };

    case REMOVE_MAIN_CONNECT_NODE:
      return {
        ...state,
        mainNodes: state.mainNodes.filter(
          (x) => x?.id !== action.payload.node.id
        ),
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

    case REMOVE_CONNECT_NODES:
      const main = {
        ...state.mainNodes.find((x) => x.id === action.payload.node.id),
      } as Node;

      main.connectNodes = [];
      const filterMainNodes2 = state.mainNodes.filter((x) => x?.id !== main.id);

      return {
        mainNodes: filterMainNodes2.concat(main),
      };

    case REMOVE_ALL_MAIN_NODES:
      return {
        ...state,
        mainNodes: [],
      };

    default:
      return state;
  }
}
