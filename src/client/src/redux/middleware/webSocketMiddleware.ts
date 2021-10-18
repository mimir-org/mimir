import {
  JsonHubProtocol,
  HttpTransportType,
  HubConnectionBuilder,
  LogLevel
} from '@microsoft/signalr';
import { Token } from "../../models/webclient";
import { msalInstance } from "../../";

const onNotifReceived = (user, comment) => {
  console.log('****** NOTIFICATION ******', user, comment);
};

const startSignalRConnection = connection => connection.start()
  .then(() => console.info('SignalR Connected'))
  .catch(err => console.error('SignalR Connection Error: ', err));

const WebSocketMiddleware = ({ getState }) => next => async (action) => {

  // const isLoggedIn = msalInstance.getActiveAccount();
  // register signalR after the user logged in
  // if (isLoggedIn) {

  (async () => {
    if (msalInstance != null) {
      const connectionHub = `${process.env.REACT_APP_SOCKET_BASE_URL}commenthub`;
      const token = await Token();
      const protocol = new JsonHubProtocol();

      // let transport to fall back to to LongPolling if it needs to
      const transport = HttpTransportType.WebSockets | HttpTransportType.LongPolling;

      const options = {
        transport,
        logMessageContent: true,
        logger: LogLevel.Error,
        accessTokenFactory: () => action.payload
      };

      // create the connection instance
      const connection = new HubConnectionBuilder()
        .withUrl(connectionHub, options)
        .withHubProtocol(protocol)
        .withAutomaticReconnect()
        .build();

      // event handlers, you can use these to dispatch actions to update your Redux store
      connection.on('ReceiveComment', onNotifReceived);
      // connection.on('UploadProgress', onNotifReceived);
      // connection.on('DownloadProgress', onNotifReceived);

      // re-establish the connection if connection dropped
      // connection.onclose(() => setTimeout(startSignalRConnection(connection), 5000));
      connection.onclose(() => console.log('Closed'));
      startSignalRConnection(connection);
    }

    return next(action);
  })();


};

export default WebSocketMiddleware;