import React from 'react';
import styled, { keyframes } from 'styled-components';
import StarFilledSvg from './../img/StarFilled'
import StarEmptySvg from './../img/StarEmpty'

const FavoriteContainer = styled.div`
  display: flex;
  height: 20px;
  margin-left: 15px;
  &:hover {
    cursor: pointer;
  }
`;

const starSize = 22;

const StarFilledIcon = () => (
  <StarFilledSvg width={starSize} height={starSize} color='orange'/>
);

const StarEmptyIcon = () => (
  <StarEmptySvg width={starSize} height={starSize} color='grey'/>
);

const rotate360 = keyframes`
  from { transform: rotateY(0deg); }
  to { transform: rotateY(360deg); }
`;

const Spinner = styled.div`
  display: flex;
  animation: ${rotate360} 0.5s linear infinite;
`;

export default ({ loading, favoriteData, favoriteAction }) => {
  var icon;
  if (loading) {
    icon = <Spinner>x</Spinner>
  }
  else {
    icon = favoriteData.isFavorite ? <StarFilledIcon/> : <StarEmptyIcon/>
  }

  return <FavoriteContainer onClick={favoriteAction}>{icon}</FavoriteContainer>
}
