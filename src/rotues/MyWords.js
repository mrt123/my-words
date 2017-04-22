import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import {BigSpinner} from './routeComponents';

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

export default ({ data, loading }) => {

  if (loading) {
    return  <BigSpinner/>;
  }
  else if (data.length > 0) {
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
