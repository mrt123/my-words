import React from 'react';
import styled from 'styled-components';
import {BigSpinner} from '../routeComponents';
import LexicalEntries from './LexicalEntries';
import FavoriteContainer from './../FavoriteContainer.js';

const WordWrapper = styled.div`
  margin: 30px 10px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const WordLabel = styled.h2`
  text-align: center;
  margin: 10px 0;
`;

export default function Word({ wordName, response, loading }) {

  if(loading) {
    return getWordDom(wordName, <BigSpinner/>);
  }
  else if (response.meta.isError) {
    return getWordDom(wordName, response.meta.errorMsg);
  }
  else {
    return getWordDom(wordName, <LexicalEntries entries={response.data.lexicalEntries}/>);
  }
}

function getWordDom(wordName, wordDescription) {
  return (
    <WordWrapper>
      <WordLabel>
        {wordName}
        <FavoriteContainer wordId={wordName}/>
      </WordLabel>
      {wordDescription}
    </WordWrapper>
  )
}