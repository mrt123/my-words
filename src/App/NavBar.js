import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom'
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

const NavAnchor = styled(Link)`
  display: inline-block;
  font-size: 13px;
  text-decoration: none;
  padding: 0 16px;
  color: #D0D6D9;
`;

const MagnifyGlassIcon = () => (
  <MagnifyGlassSvg width='25' height='25' color='white'/>
);

const BookIcon = () => (
  <BookSvg width='25' height='25' color='white'/>
);

const GraduationCapIcon = () => (
  <GraduationCapSvg width='25' height='25' color='white'/>
);

export default ({user}) => {

  let userExists = user && user.name;
  if(!userExists) {
    return null;
  }

  let lastMenuItemText = userExists ? user.name : 'Login';
  let lastMenuItemPath = userExists ? '/logout' : '/login';

  return (
    <NavBarWrapper>
      <Menu>
        <NavAnchor to="/"><MagnifyGlassIcon/></NavAnchor>
        <NavAnchor to="/myWords"><BookIcon/></NavAnchor>
        <NavAnchor to="/cards"><GraduationCapIcon/></NavAnchor>
      </Menu>

      <Menu>
        <NavAnchor to={lastMenuItemPath}>{lastMenuItemText}</NavAnchor>
      </Menu>
    </NavBarWrapper>
  );
}
