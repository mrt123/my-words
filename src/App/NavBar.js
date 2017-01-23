import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router'
import MagnifyGlassSvg from './../img/MagnifyGlass'
import BookSvg from './../img/Book'
import GraduationCapSvg from './../img/GraduationCap'

const NavBarWrapper = styled.div`
  color: #D0D6D9;
  flex-shrink: 0;
  height: 45px;
  background-color: #2b2b2b;
  display: flex;
  justify-content: space-between;
  padding-left: 6px;
`;

const Menu = styled.div`
  display: flex;
  align-items: center;
`;

const NavAnchor = styled.a`
  display: inline-block;
  font-size: 13px;
  text-decoration: none;
  padding: 0 16px;
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

const MagnifyGlassIcon = () => (
  <MagnifyGlassSvg width='25' height='25' color='white'/>
);

const BookIcon = () => (
  <BookSvg width='25' height='25' color='white'/>
);

const GraduationCapIcon = () => (
  <GraduationCapSvg width='25' height='25' color='white'/>
);

export default () => (
  <NavBarWrapper>
    <Menu>
      <NavLink to="/"><MagnifyGlassIcon/></NavLink>
      <NavLink to="/myWords"><BookIcon/></NavLink>
      <NavLink to="/cards"><GraduationCapIcon/></NavLink>
    </Menu>

    <Menu>
      <NavLink to="/xxx">Link</NavLink>
      <NavLink to="/xxx">Link</NavLink>
    </Menu>
  </NavBarWrapper>
)
