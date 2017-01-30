import React from 'react'
import styled from 'styled-components'
import Card from './Card'

const Wrapper = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
`;

export default class extends React.Component {
  render() {
    return (
      <Wrapper>
        <Card word={this.props.activeWord} />
        <button onClick={this.props.nextCardAction}>Next</button>
      </Wrapper>
    );
  }
};