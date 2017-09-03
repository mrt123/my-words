import React, { Component } from 'react';
import {RouteWrapper} from './routeComponents';
import styled from 'styled-components';
import { getApiHost } from './../api/api';

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

export default class Logout extends Component {

  goToFacebookAuth() {
    document.cookie = "logged=false";
    location.href = `${getApiHost()}/logout`;
  }

  render() {
    return (
      <LoginRouteWrapper>
        <FacebookButton onClick={this.goToFacebookAuth}>
          <ButtonContentWrapper>
            <ButtonText>Logout</ButtonText>
          </ButtonContentWrapper>
        </FacebookButton>
      </LoginRouteWrapper>
    );
  }
}
