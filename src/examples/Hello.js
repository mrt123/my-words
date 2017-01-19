import React from 'react';
import styled from 'styled-components';

const Header = styled.div`
    color: red;
`;

export default ({ name, children }) => (
  <Header>Hello {name}! {children}</Header>
)
