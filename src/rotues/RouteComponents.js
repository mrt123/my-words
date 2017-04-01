import React from 'react'
import styled from 'styled-components';
import LoadingSpinner from '../common/LoadingSpinner.js'

export var BigSpinner = () => (
  <LoadingSpinner size="80"/>
)

export var RouteWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;