import React from 'react';
import styled, { keyframes } from 'styled-components';
import CogSvg from './../img/CogSvg.js';

const rotate360 = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const SpinnerWrapper = styled.div`
  display: flex;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
`;

const Spinner = styled.div`
  display: flex;
  animation: ${rotate360} 1s linear infinite;
`;

export default ({size}) => (
  <SpinnerWrapper>
    <Spinner><CogSvg width={size} height={size} color="#B4D1B6"/></Spinner>
  </SpinnerWrapper>
);