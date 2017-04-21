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
import WordContainer from '../common/WordContainer.js';

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


  export default () => (
      <Router>
        <AppContainer>
          <NavBar/>
          <Scroller>
            <Switch>
              <Redirect exact from="/" to="/search" />
              <Route exact path="/search" component={Search}/>
              <Route path="/search/:wordId" render={({match}) => <Search wordId={match.params.wordId}/>}/>
              <Route path="/myWords" component={MyWordsContainer}/>
              <Route path="/cards" component={CardsContainer}/>
              <Route path="/word/:wordId" render={({match}) => <WordContainer wordId={match.params.wordId}/>}/>
              <Route component={NoMatch}/>
            </Switch>
          </Scroller>
        </AppContainer>
      </Router>
    );

