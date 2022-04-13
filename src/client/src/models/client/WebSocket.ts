import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import { Dispatch } from "redux";
import { Edge, LockAttributeAm, LockEdgeAm, LockNodeAm, Node, WorkerStatus } from "../index";
import { ProjectState } from "../../redux/store/project/types";
import Config from "../Config";
import {
  addNode,
  createEdge,
  deleteEdge,
  deleteNode,
  setIsLockedEdge,
  setIsLockedInterfaceAttribute,
  setIsLockedNode,
  setIsLockedNodeAttribute,
  setIsLockedNodeTerminalAttribute,
  setIsLockedSimpleAttribute,
  setIsLockedTransportAttribute,
  setIsLockedTransportTerminalAttribute,
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
    instance = this; // TODO: Check
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
          this._connection.on("ReceiveLockAttributeData", this.handleReceiveLockAttributeData);
          this._connection.on("ReceiveLockNodeData", this.handleReceiveLockNodeData);
          this._connection.on("ReceiveLockEdgeData", this.handleReceiveLockEdgeData);
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

    if (eventType === WorkerStatus.Delete) this._dispatch(deleteNode(node.id));
    if (eventType === WorkerStatus.Update) this._dispatch(updateNode(node));
  };

  private handleReceivedEdgeData = (eventType: WorkerStatus, data: string) => {
    const edge = JSON.parse(data) as Edge;

    if (eventType === WorkerStatus.Create) {
      if (this._projectState?.project.edges.some((x) => x.id === edge.id)) return;
      this._dispatch(createEdge(edge));
    }

    if (!this._projectState?.project.edges.some((x) => x.id === edge.id)) return;
    if (eventType === WorkerStatus.Delete) this._dispatch(deleteEdge(edge.id));
    if (eventType === WorkerStatus.Update) this._dispatch(updateEdge(edge));
  };

  private handleReceiveLockNodeData = (_: WorkerStatus, data: string) => {
    const lockNodeAm = JSON.parse(data) as LockNodeAm;
    this._dispatch(setIsLockedNode(lockNodeAm));
  };

  private handleReceiveLockEdgeData = (_: WorkerStatus, data: string) => {
    const lockEdgeAm = JSON.parse(data) as LockEdgeAm;
    this._dispatch(setIsLockedEdge(lockEdgeAm));
  };

  private handleReceiveLockAttributeData = (_: WorkerStatus, data: string) => {
    const lockAttributeAm = JSON.parse(data) as LockAttributeAm;
    this.onLockAttribute(lockAttributeAm);
  };

  private onLockAttribute = (lockAttributeAm: LockAttributeAm) => {
    if (lockAttributeAm.nodeId) {
      if (lockAttributeAm.terminalId) {
        this._dispatch(setIsLockedNodeTerminalAttribute(lockAttributeAm));
      } else if (lockAttributeAm.compositeId) {
        this._dispatch(setIsLockedSimpleAttribute(lockAttributeAm));
      } else {
        this._dispatch(setIsLockedNodeAttribute(lockAttributeAm));
      }
    } else if (lockAttributeAm.transportId) {
      if (lockAttributeAm.terminalId) {
        this._dispatch(setIsLockedTransportTerminalAttribute(lockAttributeAm));
      } else {
        this._dispatch(setIsLockedTransportAttribute(lockAttributeAm));
      }
    } else if (lockAttributeAm.interfaceId) {
      if (lockAttributeAm.terminalId) {
        this._dispatch(setIsLockedNodeTerminalAttribute(lockAttributeAm));
      } else {
        this._dispatch(setIsLockedInterfaceAttribute(lockAttributeAm));
      }
    }
  };
}
