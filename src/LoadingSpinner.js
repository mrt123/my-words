import React from 'react';
import styled, { keyframes } from 'styled-components';

const rotate360 = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const SpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  animation: ${rotate360} 2s linear infinite;
  margin: 10px;
`;

export default () => (
  <SpinnerWrapper>SPINNER</SpinnerWrapper>
);