import React from 'react';
import styled from 'styled-components';
import LexicalEntry from './LexicalEntry';

const LexicalEntriesWrapper = styled.div`
`;

export default ({lexicalEntries}) => {
  var entries = lexicalEntries.map((lexicalEntry, i)=> (
    <LexicalEntry key={i} entry={lexicalEntry}></LexicalEntry>
  ));

  return (
    <LexicalEntriesWrapper>{entries}</LexicalEntriesWrapper>
  );
}