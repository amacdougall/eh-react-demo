import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import registerServiceWorker from "./registerServiceWorker";

import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { reducer, initialState } from "./redux/state";

// dev
import { composeWithDevTools } from "redux-devtools-extension";

// debug
import { getPatients } from "./redux/actionCreators";

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(thunk))
);

window.store = store; // debug
window.getPatients = getPatients;

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
