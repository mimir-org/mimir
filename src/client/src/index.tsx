import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Switch, BrowserRouter } from "react-router-dom";
import store from "./redux/store/index";
import { App } from "./components";
import "./index.scss";
import { AzureAD } from "react-aad-msal";
import { authProvider } from "./providers/authProvider";

const rootElement = document.getElementById("root");

ReactDOM.render(
  <AzureAD provider={authProvider} forceLogin={true}>
    <Provider store={store}>
      <BrowserRouter forceRefresh={true}>
        <Switch>
          <App />
        </Switch>
      </BrowserRouter>
    </Provider>
  </AzureAD>,
  rootElement
);
