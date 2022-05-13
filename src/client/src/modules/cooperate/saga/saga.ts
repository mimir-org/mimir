/* eslint-disable require-yield */
import { CooperateActionTypes } from "..";
import { WebSocket, WorkerStatus } from "../../../models";

/**
 * Triggers when a node is added
 */
export function* nodeAdded(action: CooperateActionTypes) {
  const webSocket = new WebSocket();
  if (webSocket.isRunning()) {
    const nodeAsString = JSON.stringify(action.payload);
    webSocket.getConnection().send("SendNodeData", WorkerStatus.Create, nodeAsString);
  }
}

/**
 * Triggers when an edge is added
 */
export function* edgeAdded(action: CooperateActionTypes) {
  const webSocket = new WebSocket();
  if (webSocket.isRunning()) {
    const edgeAsString = JSON.stringify(action.payload);
    webSocket.getConnection().send("SendEdgeData", WorkerStatus.Create, edgeAsString);
  }
}
