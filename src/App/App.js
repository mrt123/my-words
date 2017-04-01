import React, { Component } from 'react';
import { Match, Miss } from 'react-router'
import styled from 'styled-components';
import NavBar from './NavBar';

import Home from './../rotues/home/Home';
import CardsContainer from './../rotues/cards/CardsContainer';
import MyWordsContainer from './../rotues/MyWordsContainer';
import WordRoute from './../rotues/WordRoute'


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

class App extends Component {
  render() { // TODO: pass a prop to WordContainer Instead using WordRoute
    return (
      <AppContainer>
        <NavBar/>
        <Scroller>
          <Match exactly pattern="/" component={Home} />
          <Match pattern="/cards" component={CardsContainer} />
          <Match pattern="/myWords" component={MyWordsContainer} />
          <Match pattern="/word/:wordId" component={WordRoute}/>
          <Miss component={NoMatch}/>
        </Scroller>
      </AppContainer>
    );
  }
}

export default App;
