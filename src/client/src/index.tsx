import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';

import store from './store/index';
import { App } from './components';
import './index.scss';

const rootElement = document.getElementById('root');

ReactDOM.render(
  // <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter forceRefresh={true}>
        <App />
      </BrowserRouter>
    </Provider>, rootElement
  // </React.StrictMode>, rootElement
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
