import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import './index.css'
import store from './app/store'
import App from './App'
import { worker } from './api/server'
// import { apiSlice } from './api/apiSlice'
import { extendApiSlice } from './features/users/usersSlice'

// Wrap app rendering so we can wait for the mock API to initialize
async function start() {
  // Start our mock API server
  await worker.start({ onUnhandledRequest: 'bypass' })

  // store.dispatch(apiSlice.endpoints.getUsers.initiate())
  store.dispatch(extendApiSlice.endpoints.getUsers.initiate())

  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>,
    document.getElementById('root'),
  )
}

start()
