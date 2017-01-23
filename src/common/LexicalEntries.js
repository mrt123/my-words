import React from 'react';
import styled from 'styled-components';
import LexicalEntry from './LexicalEntry';

const LexicalEntriesWrapper = styled.div`
`;

export default ({entries}) => {
  var lexicalEntries = entries.map((lexicalEntry, i)=> (
    <LexicalEntry key={i} entry={lexicalEntry}></LexicalEntry>
  ));

  return (
    <LexicalEntriesWrapper>{lexicalEntries}</LexicalEntriesWrapper>
  );
}