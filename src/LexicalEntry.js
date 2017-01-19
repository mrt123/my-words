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
  var senses = entry.senses.map((sense)=> {
    return <Sense key={sense.id} definition={sense.definition} examples={sense.examples}></Sense>
  });

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


const ExamplesWrapper = styled.div`
  margin-top: 5px;
`;

const ExampleWrapper = styled.div`
  color: #878787;
  font-size: 15px;
`;

const Sense = ({ definition, examples }) => {

  var exampleElements = examples.map((example, i)=> (
    <ExampleWrapper key={i}>"{example}"</ExampleWrapper>
  ));

  return (
    <SenseWrapper>
      <li>
        {definition}
        <ExamplesWrapper>{exampleElements}</ExamplesWrapper>
      </li>
    </SenseWrapper>
  );
};