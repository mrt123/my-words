import React, { Component } from 'react';
import { Match, Miss } from 'react-router'
import styled from 'styled-components';
import NavBar from './../NavBar';

import Home from './../rotues/home/Home';
import Cards from './../rotues/Cards';
import MyWords from './../rotues/MyWords';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Scroller = styled.div`
  overflow-y: auto;
`;

const NoMatch = ({ location }) => (
  <div>
    <h2>Whoops</h2>
    <p>Sorry but {location.pathname} didn’t match any pages</p>
  </div>
);

class App extends Component {
  render() {
    return (
      <AppContainer>
        <NavBar/>
        <Scroller>
          <Match exactly pattern="/" component={Home} />
          <Match pattern="/cards" component={Cards} />
          <Match pattern="/myWords" component={MyWords} />
          <Miss component={NoMatch}/>
        </Scroller>
      </AppContainer>
    );
  }
}

export default App;
