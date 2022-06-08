import Config from "../Config";
import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import { Dispatch } from "redux";
import { Edge, Node, WorkerStatus } from "../index";
import { ProjectState } from "../../redux/store/project/types";
import { LockCm } from "../application/LockCm";
import { EntityType } from "@mimirorg/modelbuilder-types";
import {
  addNode,
  createEdge,
  deleteEdge,
  deleteNode,
  setLockedAttribute,
  setLockedAttributes,
  setLockedEdge,
  setLockedEdges,
  setLockedNode,
  setLockedNodes,
  updateEdge,
  updateNode,
} from "../../redux/store/project/actions";

let instance = null;

export class WebSocket {
  private _connection: HubConnection;
  private _running: boolean;
  private _dispatch: Dispatch;
  private _projectState: ProjectState;
  private _group: string;

  constructor() {
    if (instance) {
      return instance;
    }

    this._group = null;
    this._running = false;

    this._connection = new HubConnectionBuilder()
      .withUrl(`${Config.SOCKET_BASE_URL}hub/modelbuilder`)
      .withAutomaticReconnect()
      .build();

    // eslint-disable-next-line @typescript-eslint/no-this-alias
    instance = this;
    return instance;
  }

  public start() {
    if (this._connection && !this._running) {
      this._connection
        .start()
        .then(() => {
          // Start websocket connection
          this._running = true;

          console.log("Websocket connection ok");

          // Joins the project group if any
          if (this._projectState?.project?.id) {
            this._connection.send("JoinGroup", this._projectState.project.id);
            this._group = this._projectState.project.id;
          }

          this._connection.on("ReceiveNodeData", this.handleReceivedNodeData);
          this._connection.on("ReceiveEdgeData", this.handleReceivedEdgeData);
          this._connection.on("ReceiveLockData", this.handleReceiveLockData);
        })
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        .catch((_e: unknown) => {});
    }
  }

  public setGroup(group: string) {
    if (this._group) this._connection.send("LeaveGroup", this._group);

    this._group = group;
    this._connection.send("JoinGroup", this._group);
  }

  public setDispatcher(dispatch: Dispatch) {
    this._dispatch = dispatch;
  }

  public setProjectState(projectState: ProjectState) {
    this._projectState = projectState;
  }

  public isRunning(): boolean {
    return this._running;
  }

  public getConnection(): HubConnection {
    return this._connection;
  }

  private handleReceivedNodeData = (eventType: WorkerStatus, data: string) => {
    const node = JSON.parse(data) as Node;

    if (eventType === WorkerStatus.Create) {
      if (this._projectState?.project.nodes.some((x) => x.id === node.id)) return;

      this._dispatch(addNode(node));
    }

    if (!this._projectState?.project.nodes.some((x) => x.id === node.id)) return;
    if (eventType === WorkerStatus.Delete) {
      this._dispatch(deleteNode(node.id));
    }
    if (eventType === WorkerStatus.Update) {
      this._dispatch(updateNode(node));
    }
  };

  private handleReceivedEdgeData = (eventType: WorkerStatus, data: string) => {
    const edge = JSON.parse(data) as Edge;

    if (eventType === WorkerStatus.Create) {
      if (this._projectState?.project.edges.some((x) => x.id === edge.id)) return;

      this._dispatch(createEdge(edge));
    }

    if (!this._projectState?.project.edges.some((x) => x.id === edge.id)) return;
    if (eventType === WorkerStatus.Delete) {
      this._dispatch(deleteEdge(edge.id));
    }
    if (eventType === WorkerStatus.Update) {
      this._dispatch(updateEdge(edge));
    }
  };

  private handleReceiveLockData = (_: WorkerStatus, data: string) => {
    const locks = JSON.parse(data) as LockCm[];

    const nodeLocks = locks.filter((l) => l.type === EntityType.Node);
    if (nodeLocks) {
      if (nodeLocks.length > 1) this._dispatch(setLockedNodes(nodeLocks));
      else if (nodeLocks.length === 1) this._dispatch(setLockedNode(nodeLocks[0]));
    }

    const edgeLocks = locks.filter((l) => l.type === EntityType.Edge);
    if (edgeLocks) {
      if (edgeLocks.length > 1) this._dispatch(setLockedEdges(edgeLocks));
      else if (edgeLocks.length === 1) this._dispatch(setLockedEdge(edgeLocks[0]));
    }

    const attributeLocks = locks.filter((l) => l.type === EntityType.Attribute);
    if (attributeLocks) {
      if (attributeLocks.length > 1) this._dispatch(setLockedAttributes(attributeLocks));
      else if (attributeLocks.length === 1) this._dispatch(setLockedAttribute(attributeLocks[0]));
    }
  };
}
