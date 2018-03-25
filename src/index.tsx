import * as React from "react";
import * as ReactDOM from "react-dom";
import { observable } from "mobx";
import { observer, Provider } from "mobx-react";
import { AppState } from "./stores/AppStore";
//import App from "./components/App";
import { BrowserRouter } from "react-router-dom";
import App from "./App.";
import SliderProva from "./SliderProva.";

const appState: AppState = new AppState();
appState.login();

ReactDOM.render(
  <Provider appState={appState}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);