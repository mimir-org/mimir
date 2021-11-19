import { WebSocket, WebSocketEvent } from "../../../models";

/**
 * Triggers when a node is changed
 */
// eslint-disable-next-line require-yield
export function* nodeAdded(action) {
  const webSocket = new WebSocket();
  if (webSocket.isRunning()) {
    console.log("FIRE WEBSOCKET");
    webSocket.getConnection().send("SendNodeData", WebSocketEvent.Create, action.payload);
  }
}

/**
 * Triggers when an edge is changed
 */
// eslint-disable-next-line require-yield
export function* edgeChanged(action) {

}
