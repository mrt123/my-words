import React from 'react';
import styled from 'styled-components';

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

export default ({ definition, examples }) => {

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