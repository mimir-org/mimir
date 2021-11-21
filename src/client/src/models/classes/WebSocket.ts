import { HubConnectionBuilder, HubConnection } from "@microsoft/signalr";
import { Dispatch } from "react";
import { WebSocketEvent, Node, Edge } from "..";
import { addNode, createEdge } from "../../redux/store/project/actions";
import { ProjectState } from "../../redux/store/project/types";

let instance = null;
class WebSocket {
  private _connection: HubConnection;
  private _running: boolean;
  private _dispatch: Dispatch<any>;
  private _projectState: ProjectState;

  constructor() {
    if (instance) {
      return instance;
    }

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
          console.log("Websocket connected to server");
          this._running = true;

          this._connection.send("JoinGroup", "All");

          if (this._projectState?.project?.id)
            this._connection.send("JoinGroup", this._projectState?.project?.id);

          this._connection.on("ReceiveNodeData", (eventType: WebSocketEvent, data: string) => {
            if (eventType === WebSocketEvent.Create) {
              const jsonObject = JSON.parse(data);
              const node = new Node(jsonObject);
              this._dispatch(addNode(node));
            }

            // switch (eventType) {
            //   case WebSocketEvent.Create:
            //     const node = new Node(data);
            //     this._dispatch(addNode(node));
            //     break;
            //   default:
            //     console.log(eventType, data);
            //     break;
            // }
          });

          this._connection.on("ReceiveEdgeData", (eventType: WebSocketEvent, data: string) => {
            if (eventType === WebSocketEvent.Create) {
              const jsonObject = JSON.parse(data);
              const edge = new Edge(jsonObject);
              this._dispatch(createEdge(edge));
            }
          });
        })
        .catch((e: any) => { });
    }
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
