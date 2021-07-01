import red from "./redux/store/index";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { App } from "./components";
import { PersistGate } from "redux-persist/integration/react";

// MSAL imports
import {
  PublicClientApplication,
  EventType,
  EventMessage,
  AuthenticationResult,
} from "@azure/msal-browser";
import { msalConfig } from "./models/webclient/MsalConfig";

import "./index.scss";

const rootElement = document.getElementById("root");

export const msalInstance = new PublicClientApplication(msalConfig);

const accounts = msalInstance.getAllAccounts();
if (accounts.length > 0) {
  msalInstance.setActiveAccount(accounts[0]);
}

msalInstance.addEventCallback((event: EventMessage) => {
  if (event.eventType === EventType.LOGIN_SUCCESS && event.payload) {
    const payload = event.payload as AuthenticationResult;
    const account = payload.account;
    msalInstance.setActiveAccount(account);
  }
});

ReactDOM.render(
  <Provider store={red.store}>
    <PersistGate loading={null} persistor={red.persistor}>
      <BrowserRouter forceRefresh={true}>
        <App pca={msalInstance} />
      </BrowserRouter>
    </PersistGate>
  </Provider>,
  rootElement
);
