import React from 'react';
import styled from 'styled-components';
import LexicalEntry from './LexicalEntry';

const LexicalEntriesWrapper = styled.div`
  margin-top: 30px;
`;

export default (props) => {
  var lexicalEntries = props.lexicalEntries.map((lexicalEntry, i)=> (
    <LexicalEntry key={i} entry={lexicalEntry}></LexicalEntry>
  ));

  return (
    <LexicalEntriesWrapper>{lexicalEntries}</LexicalEntriesWrapper>
  );
}