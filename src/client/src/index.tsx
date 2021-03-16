import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "./redux/store/index";
import { App } from "./components";
import "./index.scss";

const rootElement = document.getElementById("root");

ReactDOM.render(
  // <React.StrictMode>
  <Provider store={store}>
    <BrowserRouter forceRefresh={true}>
      <App />
    </BrowserRouter>
  </Provider>,
  rootElement
  // </React.StrictMode>, rootElement
);
