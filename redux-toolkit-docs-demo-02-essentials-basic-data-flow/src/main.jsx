import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import App from "./App.jsx";
import "./index.css";
import store from "./store/index.js";
import {worker} from './api/server'
import { extendedApiSlice } from "./features/users/usersSlice.js";

async function start() {
  await worker.start({
    onUnhandledRequest: 'bypass',
  })

  store.dispatch(extendedApiSlice.endpoints.getUsers.initiate())

  ReactDOM.createRoot(document.getElementById("root")).render(
    <Provider store={store}>
      <App />
    </Provider>,
  );
}

start()

