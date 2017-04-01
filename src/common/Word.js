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

export default function Word({ wordName, wordData, loading }) {
  var word = wordData.word;
  var wordId = word.wordId;
  var wordDescription;

  if (loading) {
    wordDescription = <BigSpinner/>;
  }
  else if (wordId) {
    wordDescription = <LexicalEntries entries={word.lexicalEntries}/>
  }

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