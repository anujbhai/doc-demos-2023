import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import App from "./App.jsx";
import "./index.css";
import store from "./store/index.js";
import { worker } from "./mocks/browser";

if (import.meta.env.VITE_NODE_ENV === "development") {
  worker.start();
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>,
);
