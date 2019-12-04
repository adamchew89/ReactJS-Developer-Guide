// Libraries
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
// CSS
import "./index.css";
// Components
import App from "./App";
// Services
import registerServiceWorker from "./registerServiceWorker";
// Reducers
import reducer from "./stores/reducers";

// Initialise a Redux store
const configuredStore = createStore(reducer);

ReactDOM.render(
  // Connect configuredStore to redux
  <Provider store={configuredStore}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
