import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router'

const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin: 10px;
`;

const WordAnchor = styled.a`
  display: inline-block;
  font-size: 13px;
  text-decoration: none;
  padding: 10px 16px;
  color: black;
`;

const WordLink = ({ children, ...rest }) => (
  <Link {...rest}>
    {params =>
      <WordAnchor {...params}>
        {children}
      </WordAnchor>
    }
  </Link>
);

export default ({ data }) => {

  if(data.length > 0) {
    var words = data.map((word, i)=>(
      <WordLink key={i} to={`/word/${word}`}>{word}</WordLink>
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
