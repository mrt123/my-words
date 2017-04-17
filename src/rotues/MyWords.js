import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin: 10px;
`;

const WordAnchor = styled(Link)`
  display: inline-block;
  font-size: 13px;
  text-decoration: none;
  padding: 10px 16px;
  color: black;
`;

export default ({ data }) => {

  if(data.length > 0) {
    var words = data.map((word, i)=>(
      <WordAnchor key={i} to={`/word/${word}`}>{word}</WordAnchor>
    ));
    return (
      <Wrapper>
        {words}
      </Wrapper>
    )
  }
  else {
    return <Wrapper>You don't have any words saved</Wrapper>;
  }
}
