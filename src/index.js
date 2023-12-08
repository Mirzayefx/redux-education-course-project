import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./css/style.css"
import { setupStore } from './reduxFolder/store';
import { Provider } from 'react-redux';
const store = setupStore()

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
