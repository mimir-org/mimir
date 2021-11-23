import { HubConnectionBuilder, HubConnection } from "@microsoft/signalr";
import { Dispatch } from "react";
import { WebSocketEvent, Node, Edge } from "..";
import { addNode, createEdge, removeEdge, removeNode, updateNode, updateEdge } from "../../redux/store/project/actions";
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

          // Joins the project group if any
          if (this._projectState?.project?.id) {
            this._connection.send("JoinGroup", this._projectState.project.id);
            this._group = this._projectState.project.id;
          }

          // Receive information of node changes
          this._connection.on("ReceiveNodeData", (eventType: WebSocketEvent, data: string) => {
            const jsonObject = JSON.parse(data);
            const node = new Node(jsonObject);

            if (eventType === WebSocketEvent.Create) {
              if (this._projectState?.project.nodes.some(x => x.id === node.id))
                return;

              this._dispatch(addNode(node));
            }

            if (!this._projectState?.project.nodes.some(x => x.id === node.id))
              return;

            if (eventType === WebSocketEvent.Delete)
              this._dispatch(removeNode(node.id));

            if (eventType === WebSocketEvent.Update)
              this._dispatch(updateNode(node));
          });

          // Receive information of edge changes
          this._connection.on("ReceiveEdgeData", (eventType: WebSocketEvent, data: string) => {
            const jsonObject = JSON.parse(data);
            const edge = new Edge(jsonObject);

            if (eventType === WebSocketEvent.Create) {
              if (this._projectState?.project.edges.some(x => x.id === edge.id))
                return;

              this._dispatch(createEdge(edge));
            }

            if (!this._projectState?.project.edges.some(x => x.id === edge.id))
              return;

            if (eventType === WebSocketEvent.Delete)
              this._dispatch(removeEdge(edge.id));

            if (eventType === WebSocketEvent.Update)
              this._dispatch(updateEdge(edge));
          });
        })
        .catch((e: any) => { });
    }
  }

  public setGroup(group: string) {
    if (this._group)
      this._connection.send("LeaveGroup", this._group);

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
}

export default WebSocket;
