import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "./redux/store/index";
import { App } from "./components";
import "./index.scss";
import { AzureAD } from "react-aad-msal";
import { authProvider } from "./providers/authProvider";

const rootElement = document.getElementById("root");

ReactDOM.render(
  // <React.StrictMode>
  //   <AzureAD provider={authProvider} forceLogin={true}>
  <Provider store={store}>
    <BrowserRouter forceRefresh={true}>
      <App />
    </BrowserRouter>
  </Provider>,
  //   </AzureAD>
  rootElement
  // </React.StrictMode>, rootElement
);
