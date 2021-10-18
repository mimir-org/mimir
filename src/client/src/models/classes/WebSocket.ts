import { HubConnectionBuilder, HubConnection } from "@microsoft/signalr";
import { Dispatch } from "react";
// import { updatePositionReceived } from "../../redux/store/project/actions";
// import { NodePosition } from "../Types";
import { default as reduxStore } from "./../../redux/store/index";

let instance = null;

class WebSocket {

  private _connection: HubConnection;
  private _running: boolean;
  private _dispatch: Dispatch<any>;

  constructor() {

    if (instance) {
      return instance;
    }

    this._running = false; // REACT_APP_SOCKET_METHODS

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
        .then((result) => {
          console.log("Websocket connected to server");
          this._running = true;

          const methods = JSON.parse(process.env.REACT_APP_SOCKET_METHODS) as string[];

          methods.forEach(name => {
            this._connection.on(name, (data) => {
              console.log(data);
              if (name === "ReceiveNodePosition") {
                // const position = data as NodePosition;
                // reduxStore.store.dispatch(updatePositionReceived(position.nodeId, position.x, position.y));
              }
            });
          });


        })
        .catch((e: any) => {
          // console.log("Connection failed: ", e);
        })
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
