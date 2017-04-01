import React from 'react';
import styled from 'styled-components';
import {BigSpinner} from '../rotues/routeComponents';
import LexicalEntries from './LexicalEntries';
import FavoriteContainer from './FavoriteContainer.js';

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

export default function Word({ wordData, loading }) {
  var word = wordData.word;
  var wordId = word.wordId;

  if(loading) {
    return <BigSpinner/>;
  }
  else if (wordId) {
    return (
      <WordWrapper>
        <WordLabel>
          {wordId}
          <FavoriteContainer wordId={wordId}/>
        </WordLabel>
        <LexicalEntries entries={word.lexicalEntries}/>
      </WordWrapper>
    )
  }
}