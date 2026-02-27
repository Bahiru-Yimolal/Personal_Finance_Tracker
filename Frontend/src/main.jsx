import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './styles/global.css';

import { Provider } from 'react-redux';
import { store } from './app/store';

import { BrowserRouter } from 'react-router-dom';
import ThemeWrapper from './components/ThemeWrapper.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ThemeWrapper>
          <App />
        </ThemeWrapper>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
