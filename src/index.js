import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import registerServiceWorker from "./registerServiceWorker";

import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { reducer, initialState } from "./redux/state";
import { Provider } from "react-redux";

// dev
import { composeWithDevTools } from "redux-devtools-extension";

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(thunk))
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
