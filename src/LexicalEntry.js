import React from 'react';
import styled from 'styled-components';

const LexicalEntryWrapper = styled.div`
  margin: 10px 0;
`;

const LexicalCategory = styled.span`
color: red;
  font-style: italic;
`;

export default ({ entry }) => {
  var senses = entry.senses.map((sense)=> (
    <Sense key={sense.id} definition={sense.definition}></Sense>
  ));

  return (
    <LexicalEntryWrapper>
      <LexicalCategory>{entry.lexicalCategory.toLowerCase()}:</LexicalCategory>
      <ol>{senses}</ol>
    </LexicalEntryWrapper>
  );
}

const SenseWrapper = styled.div`
  margin: 10px;
`;

const Sense = ({ definition }) => (
  <SenseWrapper>
    <li>{definition}</li>
  </SenseWrapper>
);