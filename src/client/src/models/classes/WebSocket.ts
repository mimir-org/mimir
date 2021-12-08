import { HubConnectionBuilder, HubConnection } from "@microsoft/signalr";
import { Dispatch } from "react";
import { Attribute } from ".";
import { WorkerStatus, Node, Edge, LockUnlockNodeAm, LockUnlockEdgeAm, LockUnlockAttributeAm } from "..";
import {
  addNode,
  createEdge,
  removeEdge,
  removeNode,
  updateNode,
  updateEdge,
  setIsLockedNodeAttribute,
  setIsLockedNodeTerminalAttribute,
  setIsLockedTransportTerminalAttribute,
  setIsLockedTransportAttribute,
  setIsLockedCompositeAttribute,
} from "../../redux/store/project/actions";
import { ProjectState } from "../../redux/store/project/types";

let instance = null;
class WebSocket {
  private _connection: HubConnection;
  private _running: boolean;
  private _dispatch: Dispatch<any>;
  private _projectState: ProjectState;
  private _group: string;

  constructor() {
    if (instance) {
      return instance;
    }

    this._group = null;
    this._running = false;

    this._connection = new HubConnectionBuilder()
      .withUrl(`${process.env.REACT_APP_SOCKET_BASE_URL}hub/modelbuilder`)
      .withAutomaticReconnect()
      .build();

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
          this._connection.on("ReceiveLockUnlockAttributeData", this.handleReceiveLockUnlockAttributeData);
          this._connection.on("ReceiveLockUnlockNodeData", this.handleReceiveLockUnlockNodeData);
          this._connection.on("ReceiveLockUnlockEdgeData", this.handleReceiveLockUnlockEdgeData);
        })
        .catch((e: any) => { });
    }
  }

  public setGroup(group: string) {
    if (this._group) this._connection.send("LeaveGroup", this._group);

    this._group = group;
    this._connection.send("JoinGroup", this._group);
  }

  public setDispatcher(dispatch: Dispatch<any>) {
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
    const jsonObject = JSON.parse(data);
    const node = new Node(jsonObject);

    if (eventType === WorkerStatus.Create) {
      if (this._projectState?.project.nodes.some((x) => x.id === node.id)) return;

      this._dispatch(addNode(node));
    }

    if (!this._projectState?.project.nodes.some((x) => x.id === node.id)) return;

    if (eventType === WorkerStatus.Delete) this._dispatch(removeNode(node.id));

    if (eventType === WorkerStatus.Update) this._dispatch(updateNode(node));
  };

  private handleReceivedEdgeData = (eventType: WorkerStatus, data: string) => {
    const jsonObject = JSON.parse(data);
    const edge = new Edge(jsonObject);

    if (eventType === WorkerStatus.Create) {
      if (this._projectState?.project.edges.some((x) => x.id === edge.id)) return;

      this._dispatch(createEdge(edge));
    }

    if (!this._projectState?.project.edges.some((x) => x.id === edge.id)) return;

    if (eventType === WorkerStatus.Delete) this._dispatch(removeEdge(edge.id));

    if (eventType === WorkerStatus.Update) this._dispatch(updateEdge(edge));
  };

  private handleReceiveLockUnlockNodeData = (eventType: WorkerStatus, data: string) => {
    const obj = JSON.parse(data) as LockUnlockNodeAm
    console.log(obj);
  };

  private handleReceiveLockUnlockEdgeData = (eventType: WorkerStatus, data: string) => {
    const obj = JSON.parse(data) as LockUnlockEdgeAm
    console.log(obj);
  };

  private handleReceiveLockUnlockAttributeData = (eventType: WorkerStatus, data: string) => {
    const obj = JSON.parse(data) as LockUnlockAttributeAm
    console.log(obj);
  };

  private onLockUnlockAttribute = (attribute: Attribute) => {
    if (attribute.nodeId) {
      if (attribute.terminalId) {
        this._dispatch(setIsLockedNodeTerminalAttribute(attribute));
      } else if (attribute.compositeId) {
        this._dispatch(setIsLockedCompositeAttribute(attribute));
      } else {
        this._dispatch(setIsLockedNodeAttribute);
      }
    } else if (attribute.transportId) {
      if (attribute.terminalId) {
        this._dispatch(setIsLockedTransportTerminalAttribute(attribute));
      } else {
        this._dispatch(setIsLockedTransportAttribute(attribute));
      }
    } else if (attribute.interfaceId) {
      if (attribute.terminalId) {
        this._dispatch(setIsLockedNodeTerminalAttribute(attribute));
      } else {
        this._dispatch(setIsLockedNodeAttribute);
      }
    }
  };
}

export default WebSocket;
