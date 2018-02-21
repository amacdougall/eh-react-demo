import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import registerServiceWorker from "./registerServiceWorker";
import { createStore } from "redux";
import { reducer } from "./src/state";

let store = createStore(reducer);

window.store = store; // debug

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
