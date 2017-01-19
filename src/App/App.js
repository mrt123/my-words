import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';
import logo from './logo.svg';
import './App.css';
import Search from './../Search';
import ResultsContainer from './../ResultsContainer';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const AppHeader = styled.div`
  height: 80px;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const rotate360 = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const AppLogo = styled.img`
  animation: ${rotate360} 20s linear infinite;
  height: 80px;
`;

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {searchValue: ''};
    this.search = this.search.bind(this);
  }

  search(v) {
    this.setState({searchValue: v});
  }

  render() {
    return (
      <AppContainer>
        <AppHeader>
          <AppLogo src={logo} alt="logo"/>
          <span>My Words</span>
        </AppHeader>
        <Search searchAction={this.search}></Search>
        <ResultsContainer searchValue={this.state.searchValue}></ResultsContainer>
      </AppContainer>
    );
  }
}

export default App;
