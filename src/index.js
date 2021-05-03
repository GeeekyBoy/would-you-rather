import { StrictMode } from "react";
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"
import store from "./utils/store"
import ReactDOM from "react-dom";

import App from "./components/App";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
  rootElement
);
