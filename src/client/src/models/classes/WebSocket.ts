import { HubConnectionBuilder, HubConnection } from "@microsoft/signalr";
import { Dispatch } from "redux";
import { WorkerStatus, Node, Edge, LockUnlockNodeAm, LockUnlockEdgeAm, LockUnlockAttributeAm } from "..";
import {
  addNode,
  createEdge,
  removeEdge,
  removeNode,
  updateNode,
  updateEdge,
  setIsLockedNodeTerminalAttribute,
  setIsLockedTransportTerminalAttribute,
  setIsLockedTransportAttribute,
  setIsLockedCompositeAttribute,
  setIsLockedNode,
  setIsLockedEdge,
  setIsLockedNodeAttribute,
  setIsLockedInterfaceAttribute,
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
        .catch((e: any) => {});
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

  private handleReceiveLockUnlockNodeData = (_: WorkerStatus, data: string) => {
    const lockUnlockNodeAm = JSON.parse(data) as LockUnlockNodeAm;
    this._dispatch(setIsLockedNode(lockUnlockNodeAm));
  };

  private handleReceiveLockUnlockEdgeData = (_: WorkerStatus, data: string) => {
    const lockUnlockEdgeAm = JSON.parse(data) as LockUnlockEdgeAm;
    this._dispatch(setIsLockedEdge(lockUnlockEdgeAm));
  };

  private handleReceiveLockUnlockAttributeData = (_: WorkerStatus, data: string) => {
    const lockUnlockAttributeAm = JSON.parse(data) as LockUnlockAttributeAm;
    this.onLockUnlockAttribute(lockUnlockAttributeAm);
  };

  private onLockUnlockAttribute = (lockUnlockAttributeAm: LockUnlockAttributeAm) => {
    if (lockUnlockAttributeAm.nodeId) {
      if (lockUnlockAttributeAm.terminalId) {
        this._dispatch(setIsLockedNodeTerminalAttribute(lockUnlockAttributeAm));
      } else if (lockUnlockAttributeAm.compositeId) {
        this._dispatch(setIsLockedCompositeAttribute(lockUnlockAttributeAm));
      } else {
        this._dispatch(setIsLockedNodeAttribute(lockUnlockAttributeAm));
      }
    } else if (lockUnlockAttributeAm.transportId) {
      if (lockUnlockAttributeAm.terminalId) {
        this._dispatch(setIsLockedTransportTerminalAttribute(lockUnlockAttributeAm));
      } else {
        this._dispatch(setIsLockedTransportAttribute(lockUnlockAttributeAm));
      }
    } else if (lockUnlockAttributeAm.interfaceId) {
      if (lockUnlockAttributeAm.terminalId) {
        this._dispatch(setIsLockedNodeTerminalAttribute(lockUnlockAttributeAm));
      } else {
        this._dispatch(setIsLockedInterfaceAttribute(lockUnlockAttributeAm));
      }
    }
  };
}

export default WebSocket;
