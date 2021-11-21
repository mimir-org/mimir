import { CooperateActionTypes } from "..";
import { WebSocket, WebSocketEvent } from "../../../models";

/**
 * Triggers when a node is added
 */
// eslint-disable-next-line require-yield
export function* nodeAdded(action: CooperateActionTypes) {
  const webSocket = new WebSocket();
  if (webSocket.isRunning()) {
    const nodeAsString = JSON.stringify(action.payload);
    webSocket.getConnection().send("SendNodeData", WebSocketEvent.Create, nodeAsString);
  }
}

/**
 * Triggers when an edge is added
 */
// eslint-disable-next-line require-yield
export function* edgeAdded(action: CooperateActionTypes) {
  const webSocket = new WebSocket();
  if (webSocket.isRunning()) {
    const edgeAsString = JSON.stringify(action.payload);
    webSocket.getConnection().send("SendEdgeData", WebSocketEvent.Create, edgeAsString);
  }
}
