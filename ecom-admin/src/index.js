import React from 'react';
import App from './App';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import { store, persistor } from './redux/store'

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading='null' persistor={persistor} >
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);
