import React from 'react';
import styled from 'styled-components';
import Sense from './Sense';

const LexicalEntryWrapper = styled.div`
  margin: 10px 0;
`;

const LexicalCategory = styled.span`
color: red;
  font-style: italic;
`;

export default ({ entry }) => {
  var senses = entry.senses.map((sense, i)=> {
    return <Sense key={i} definition={sense.definition} examples={sense.examples}></Sense>
  });

  return (
    <LexicalEntryWrapper>
      <LexicalCategory>{entry.lexicalCategory.toLowerCase()}:</LexicalCategory>
      <ol>{senses}</ol>
    </LexicalEntryWrapper>
  );
}

