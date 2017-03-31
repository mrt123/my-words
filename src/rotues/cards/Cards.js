import React from 'react'
import styled from 'styled-components'
import LoadingSpinner from '../../common/LoadingSpinner';
import Card from './Card'

const Wrapper = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
`;

export default class Cards extends React.Component {
  render() {

    if (this.props.loading) {
      return (
          <LoadingSpinner/>
      );
    }
    else if (this.props.activeWordId) {
      return (
        <Wrapper>
          <Card activeWordId={this.props.activeWordId}/>
          <button onClick={this.props.nextCardAction}>Next</button>
        </Wrapper>
      );
    }
    else {
      return (
        <div>
          Quiz Finished
          <button>reset</button>
        </div>
      )
    }
  }
};