import React from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from 'react-router-dom'
import styled from 'styled-components';
import NavBar from './NavBar';

import Search from './../rotues/search/Search';
import CardsContainer from './../rotues/cards/CardsContainer';
import MyWordsContainer from './../rotues/MyWordsContainer';
import WordContainer from '../common/WordContainer';
import WordsToken from '../rotues/WordsToken';
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
  const logged = localStorage.getItem('wordsToken') !== null;

  var renderFunction = (props) => {
    if (logged) {
      return <Component {...props}/>
    }
    else {
      return <Redirect to={{ pathname: '/login', state: { from: props.location } }}/>
    }
  };

  return <Route {...rest} render={renderFunction}/>;
};

export default () => {
    // TODO:  implement navbar container and get user from /api/users/me
  return (
    <Router>
      <AppContainer>
        <NavBar/>
        <Scroller>
          <Switch>
            <Redirect exact from="/" to="/search"/>
            <Route path="/authToken/:token" render={({match}) => <WordsToken token={match.params.token}/>}/>/>
            <Route exact path="/login" component={Login}/>
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

