import React from 'react';
import styled from 'styled-components';
import LexicalEntries from './LexicalEntries';
import Favorite from './Favorite';

const WordWrapper = styled.div`
`;

const WordLabel = styled.h2`
  text-align: center;
  margin: 10px 0;
  display: flex;
  justify-content: center;
`;

export default ({ wordData, favoriteAction }) => {

  var favIcon;
  if(favoriteAction) {
    favIcon =  <Favorite favorite={wordData.favorite} favoriteAction={favoriteAction}/>;
  }

  if (wordData.id) {
    return (
      <WordWrapper>
        <WordLabel>
          {wordData.id}
          {favIcon}
        </WordLabel>
        <LexicalEntries entries={wordData.lexicalEntries || []}/>
      </WordWrapper>
    )
  }
  else {
    return null;
  }
}