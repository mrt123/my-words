import React from 'react';
import CardWrapper from './CardWrapper'
import Word from './../../common/Word'

export default ({wordData, nextCardAction}) => (
  <CardWrapper>
    <Word wordData={wordData}/>
    <button onClick={nextCardAction}>Next</button>
  </CardWrapper>
);