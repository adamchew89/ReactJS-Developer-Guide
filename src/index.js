// Libraries
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
// CSS
import "./index.css";
// Components
import App from "./App";
// Services
import registerServiceWorker from "./registerServiceWorker";
// Reducers
import rootReducer from "./stores/reducers/reducer";

// Middleware: Chrome Redux Dev Tool Extension
const composeEnhancers =
  (process.env.NODE_ENV === "development" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

// Initialise a Redux store
const configuredStore = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

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
