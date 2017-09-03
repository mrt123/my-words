import React, { Component } from 'react';
import {RouteWrapper} from './routeComponents';
import styled from 'styled-components';
import FacebookButton from '../common/buttons/FacebookButton.js'
import { getApiHost } from './../api/api';

const LoginRouteWrapper = styled(RouteWrapper)`
  align-items: center;
  justify-content: center;
`;

export default class Login extends Component {

  goToFacebookAuth() {
    location.href = `${getApiHost()}/auth/facebook`;
  }

  render() {
    return (
      <LoginRouteWrapper>
        <FacebookButton onClick={this.goToFacebookAuth} text={"Log in With Facebook"}/>
      </LoginRouteWrapper>
    );
  }
}
