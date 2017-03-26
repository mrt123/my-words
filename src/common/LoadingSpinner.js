import React from 'react';
import styled, { keyframes } from 'styled-components';
import reactLogo from './../img/reactLogo.svg';

const rotate360 = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const SpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 10px;
`;

const Spinner = styled.img`
  animation: ${rotate360} 2s linear infinite;
`;

export default ({size}) => (
  <SpinnerWrapper src={reactLogo}>
    <Spinner src={reactLogo} size={size}></Spinner>
  </SpinnerWrapper>
);