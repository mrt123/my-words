import React from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from 'react-router-dom'
import styled from 'styled-components';
import NavBarContainer from './NavBarContainer';

import Search from '../rotues/search/Search';
import CardsContainer from '../rotues/cards/CardsContainer';
import MyWordsContainer from '../rotues/MyWordsContainer';
import WordContainer from '../common/WordContainer';
import Logout from '../rotues/LogOut';
import Login from '../rotues/Login';

const AppContainer = styled.div`
  display: flex;
  height: 100vh;
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
  const logged = document.cookie.indexOf('words-token=') >= 0;

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

