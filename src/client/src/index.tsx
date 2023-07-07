import store from "store";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { App } from "./components/pages/App";
import { AuthenticationResult, EventMessage, EventType, PublicClientApplication } from "@azure/msal-browser";
import { ReactFlowProvider } from "react-flow-renderer";
import { ApplicationInsights } from "@microsoft/applicationinsights-web";
import { config, loginRequest, msalConfig } from "lib";

const isSilent = config.SILENT === "true";

export const msalInstance = isSilent ? null : new PublicClientApplication(msalConfig);

if (!isSilent) {
  const accounts = msalInstance.getAllAccounts();
  if (accounts.length > 0) msalInstance.setActiveAccount(accounts[0]);

  msalInstance.handleRedirectPromise().then((response) => {
    if (response !== null) return;

    if (!accounts || accounts.length < 1) msalInstance.loginRedirect(loginRequest);
    else msalInstance.acquireTokenSilent(loginRequest);
  });

  msalInstance.addEventCallback((event: EventMessage) => {
    if (event.eventType === EventType.LOGIN_SUCCESS && event.payload) {
      const payload = event.payload as AuthenticationResult;
      const account = payload.account;
      msalInstance.setActiveAccount(account);
    }
  });
}

if (config.APP_INSIGHTS_CONNECTION_STRING) {
  const appInsights = new ApplicationInsights({ config: { connectionString: config.APP_INSIGHTS_CONNECTION_STRING } });
  appInsights.loadAppInsights();
  appInsights.trackPageView();
}

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <ReactFlowProvider>
      <App pca={isSilent ? null : msalInstance} />
    </ReactFlowProvider>
  </Provider>
);
