import React, { Component } from 'react';
import {RouteWrapper} from './routeComponents';
import styled from 'styled-components';
import FacebookSvg from './../img/FacebookOfficial'

const LoginRouteWrapper = styled(RouteWrapper)`
  align-items: center;
  justify-content: center;
`;

const FacebookButton = styled.button`
  padding: 10px 15px;
  background-color: #3B5998;
  border: 1px solid #3B5998;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  font-family: Helvetica, Arial, sans-serif;
  letter-spacing: .25px;
  color: #fff;
`;

const ButtonText = styled.span`
    margin: 0 15px 0 22px;
`;

const ButtonContentWrapper = styled.div`   // Safari does not allow display: flex on a button.
  display: flex;
  justify-content: center;
  align-items: center;
`;


const FacebookIcon = () => (
  <FacebookSvg width='25' height='25' color='white'/>
);

export default class Login extends Component {

  goToFacebookAuth() {
    location.href = 'http://localhost:1337/auth/facebook';  // TODO: assemble url during build/run time!
  }

  render() {
    return (
      <LoginRouteWrapper>
        <FacebookButton onClick={this.goToFacebookAuth}>
          <ButtonContentWrapper>
            <FacebookIcon>F</FacebookIcon>
            <ButtonText>Log in With Facebook</ButtonText>
          </ButtonContentWrapper>
        </FacebookButton>
      </LoginRouteWrapper>
    );
  }
}
