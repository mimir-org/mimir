import { HubConnectionBuilder, HubConnection } from "@microsoft/signalr";
import { Dispatch } from "react";

let instance = null;
class WebSocket {
  private _connection: HubConnection;
  private _running: boolean;
  private _dispatch: Dispatch<any>;

  constructor() {
    if (instance) {
      return instance;
    }

    this._running = false;

    this._connection = new HubConnectionBuilder()
      .withUrl(`${process.env.REACT_APP_SOCKET_BASE_URL}mimir`)
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

          this._connection.on("ReceiveNode", (data) => {
            console.log(data);
          });
        })
        .catch((e: any) => {});
    }
  }

  public setDispatcher(dispatch: Dispatch<any>) {
    this._dispatch = dispatch;
  }

  public isRunning(): boolean {
    return this._running;
  }

  public getConnection(): HubConnection {
    return this._connection;
  }
}

export default WebSocket;
