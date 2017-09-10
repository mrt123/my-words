import React from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from 'react-router-dom'
import styled from 'styled-components';
import NavBarContainer from './NavBarContainer';

import Search from '../routes/Search';
import CardsContainer from '../routes/CardsContainer';
import MyWordsContainer from '../routes/MyWordsContainer';
import WordContainer from '../common/word/WordContainer';
import Logout from '../routes/LogOut';
import Login from '../routes/Login';
import SetLogged from '../routes/SetLogged';

const AppContainer = styled.div`
  display: flex;
  height: ${window.innerHeight}px;  // device height - address bar
  flex-direction: column;
  justify-content: center;
`;

const Scroller = styled.div`
  display: flex;
  overflow-y: auto;
  flex-grow: 1;
`;

const NoMatch = ({ location }) => (
  <div>
    <h2>Whoops</h2>

    <p>Sorry but {location.pathname} didn’t match any pages</p>
  </div>
);

const PrivateRoute = ({ component: Component, ...rest }) => {
  const logged = document.cookie.indexOf('logged=true') >= 0;

  var renderFunction = (props) => {
    if (logged) {
      if(rest.render) {
        return <Route render={rest.render}/>
      }
      else {
        return <Component {...props}/>
      }
    }
    else {
      return <Redirect to={{ pathname: '/login', state: { from: props.location } }}/>
    }
  };

  return <Route {...rest} render={renderFunction}/>;
};

export default () => {
  return (
    <Router>
      <AppContainer>
        <NavBarContainer/>
        <Scroller>
          <Switch>
            <Redirect exact from="/" to="/search"/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/setLogged" component={SetLogged}/>
            <PrivateRoute exact path="/logout" component={Logout}/>
            <PrivateRoute exact path="/search" component={Search}/>
            <PrivateRoute path="/search/:wordId" render={({match}) => <Search wordId={match.params.wordId}/>}/>
            <PrivateRoute path="/myWords" component={MyWordsContainer}/>
            <PrivateRoute path="/cards" component={CardsContainer}/>
            <PrivateRoute path="/word/:wordId" render={({match}) => <WordContainer wordId={match.params.wordId}/>}/>
            <Route component={NoMatch}/>
          </Switch>
        </Scroller>
      </AppContainer>
    </Router>
  )
};

