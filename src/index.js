import React from 'react';

import { Router, Route, IndexRoute, hashHistory } from 'react-router'
import Home from './Home';
import About from './About';
import MyWords from './MyWords';

import ReactDOM from 'react-dom';
import App from './App/App';
import './index.css';

ReactDOM.render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="about" component={About} />
      <Route path="myWords" component={MyWords} />
    </Route>
  </Router>
), document.getElementById('root'));