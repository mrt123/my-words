import React, { Component } from 'react';
import { Link } from 'react-router'
import styled, { keyframes } from 'styled-components';
import logo from './logo.svg';
import './App.css';

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

  render() {
    return (
      <AppContainer>

        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/myWords">My Words</Link></li>
        </ul>

        <AppHeader>
          <AppLogo src={logo} alt="logo"/>
          <span>My Words</span>
        </AppHeader>

        {this.props.children}
      </AppContainer>
    );
  }
}

export default App;
