import styled from 'styled-components';
import React, { Component } from 'react';

const Container = styled.button`
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
    margin: 0 20px 0 20px;
`;

const ButtonContentWrapper = styled.div`   // Safari does not allow display: flex on a button.
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default class Button1 extends Component {

  render() {
    return (
      <Container onClick={this.props.onClick}>
        <ButtonContentWrapper>
          <ButtonText>{this.props.text}</ButtonText>
        </ButtonContentWrapper>
      </Container>
    );
  }
}