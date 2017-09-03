import React, { Component } from 'react';
import {RouteWrapper} from '../common/routeComponents';
import styled from 'styled-components';
import FacebookButton from '../common/buttons/FacebookButton.js'
import { getApiHost } from './../api/api';

const LoginRouteWrapper = styled(RouteWrapper)`
  align-items: center;
  justify-content: center;
`;

export default class Logout extends Component {

  logout() {
    document.cookie = "logged=false";
    location.href = `${getApiHost()}/logout`;
  }

  render() {
    return (
      <LoginRouteWrapper>
        <FacebookButton onClick={this.logout} text="Logout"/>
      </LoginRouteWrapper>
    );
  }
}
