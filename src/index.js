import React from 'react';
import { BrowserRouter } from 'react-router'
import ReactDOM from 'react-dom';

import App from './App/App';
import './index.css';

ReactDOM.render(
  <BrowserRouter>
    <App></App>
  </BrowserRouter>,
  document.getElementById('root')
);