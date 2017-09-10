import React from 'react'
import {RouteWrapper, BigSpinner} from './routeComponents';
import Card from './Card'
import Button1 from './buttons/Button1.js'
import styled from 'styled-components'

const Footer = styled.div`
  display: flex;
  height: 70px;
  align-items: center;
  justify-content: center;
`;

export default class Cards extends React.Component {
  render() {

    if (this.props.loading) {
      return (
        <BigSpinner/>
      );
    }
    else if (this.props.activeWordId) {
      return (
        <RouteWrapper>
          <Card activeWordId={this.props.activeWordId}/>
          <Footer>
            <Button1 onClick={this.props.nextCardAction} text="Next"/>
          </Footer>
        </RouteWrapper>
      );
    }
    else {
      return (
        <div>
          Quiz Finished
          <Button1 text="XXX"/>
        </div>
      )
    }
  }
};