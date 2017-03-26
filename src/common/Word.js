import React from 'react';
import styled from 'styled-components';
import LexicalEntries from './LexicalEntries';
import FavoriteContainer from './FavoriteContainer.js';

const WordWrapper = styled.div`
  flex-grow: 1;
`;

const WordLabel = styled.h2`
  text-align: center;
  margin: 10px 0;
  display: flex;
  justify-content: center;
`;

export default function Word2({ wordData }) {
  var word = wordData.word;
  var wordId = word.wordId;

  if (wordId) {
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
  else {
    return null;
  }
}