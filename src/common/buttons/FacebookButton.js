import styled from 'styled-components';
import React, { Component } from 'react';
import FacebookSvg from './../../img/FacebookOfficial';

const FacebookButtonContainer = styled.button`
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

export default class FacebookButton extends Component {

  render() {
    return (
      <FacebookButtonContainer onClick={this.props.onClick}>
        <ButtonContentWrapper>
          <FacebookIcon>F</FacebookIcon>
          <ButtonText>{this.props.text}</ButtonText>
        </ButtonContentWrapper>
      </FacebookButtonContainer>
    );
  }
}