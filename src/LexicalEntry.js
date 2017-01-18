import React from 'react';
import styled from 'styled-components';

const LexicalEntryWrapper = styled.div`
  margin: 10px;
`;

const LexicalCategory = styled.span`
color: red;
  font-style: italic;
`;

export default (props) => {
  var senses = props.entry.senses.map((sense)=> (
    <Sense key={sense.id} definition={sense.definition}></Sense>
  ));

  return (
    <LexicalEntryWrapper>
      <LexicalCategory>{props.entry.lexicalCategory.toLowerCase()}:</LexicalCategory>
      <ol>{senses}</ol>
    </LexicalEntryWrapper>
  );
}

const SenseWrapper = styled.div`
  margin: 10px;
`;

const Sense = (props) => (
  <SenseWrapper>
    <li>{props.definition}</li>
  </SenseWrapper>
);