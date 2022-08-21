import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { store, persistor } from './redux/store';
import 'modern-normalize/modern-normalize.css';

import { PersistGate } from 'redux-persist/integration/react';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <App />
        </Router>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();

// client id: 811627433312-n1bbpbtdhdb7o1g43qr4s4fp2of9q4pm.apps.googleusercontent.com
// client secret: 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
