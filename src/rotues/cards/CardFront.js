import React from 'react'
import CardWrapper from './CardWrapper'

export default ({wordData, showAction}) => {

  return <CardWrapper>
    <div>{wordData.id}</div>
    <button onClick={showAction}>Show Definition</button>
  </CardWrapper>
};