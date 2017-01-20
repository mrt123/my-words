import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router'

const NavBarWrapper = styled.div`
  color: #D0D6D9;
  height: 45px;
  background-color: #2b2b2b;
  display: flex;
  justify-content: space-between;
`;

const Menu = styled.div`
  margin: 0 0px;
`;

const NavAnchor = styled.a`
  display: inline-block;
  font-size: 13px;
  text-decoration: none;
  padding: 14px 16px;
  color: #D0D6D9;
`;

const NavLink = ({ children, ...rest }) => (
  <Link {...rest}>
    {params =>
      <NavAnchor {...params}>
        {children}
      </NavAnchor>
    }
  </Link>
);

export default () => (
  <NavBarWrapper>
    <Menu>
      <NavLink to="/">Search</NavLink>
      <NavLink to="/myWords">My Words</NavLink>
      <NavLink to="/about">About</NavLink>
    </Menu>

    <Menu>
      <NavLink to="/">Link</NavLink>
      <NavLink to="/">Link</NavLink>
    </Menu>
  </NavBarWrapper>
)
