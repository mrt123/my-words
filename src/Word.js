import React from 'react';
import styled from 'styled-components';
import LexicalEntries from './rotues/home/LexicalEntries';

const WordWrapper = styled.div`
`;

const WordLabel = styled.h2`
  margin: 10px 0;
`;

export default ({ wordData }) => {

  return <WordWrapper>
    <WordLabel>{wordData.id}</WordLabel>
    <LexicalEntries entries={wordData.lexicalEntries || []}/>
  </WordWrapper>
}