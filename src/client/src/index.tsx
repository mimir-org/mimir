import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import red from "./redux/store/index";
import { App } from "./components";
import "./index.scss";
import { AzureAD } from "react-aad-msal";
import { authProvider } from "./providers/authProvider";
import { PersistGate } from "redux-persist/integration/react";

const rootElement = document.getElementById("root");

ReactDOM.render(
  <AzureAD provider={authProvider} forceLogin={true}>
    <Provider store={red.store}>
      <PersistGate loading={null} persistor={red.persistor}>
        <BrowserRouter forceRefresh={true}>
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </AzureAD>,
  rootElement
);
