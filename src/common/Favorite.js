import React from 'react';
import styled from 'styled-components';
import StarFilledSvg from './../img/StarFilled'
import StarEmptySvg from './../img/StarEmpty'
import LoadingSpinner from './../common/LoadingSpinner.js'

const starSize = 22;

const FavoriteContainer = styled.div`
  display: inline-block;
  height: ${props => props.size}px;
  margin-left: 15px;
  &:hover {
    cursor: pointer;
  }
`;

const StarFilledIcon = () => (
  <StarFilledSvg width={starSize} height={starSize} color='orange'/>
);

const StarEmptyIcon = () => (
  <StarEmptySvg width={starSize} height={starSize} color='grey'/>
);

export default ({ loading, favoriteData, favoriteAction }) => {
  var icon, title;

  if (loading) {
    icon = <LoadingSpinner size={starSize}/>
  }
  else if (favoriteData.isFavorite){
    title = 'un-favorite';
    icon = <StarFilledIcon/>
  }
  else if (!favoriteData.isFavorite) {
    title = 'make favorite';
    icon = <StarEmptyIcon/>
  }

  return <FavoriteContainer title={title} size={starSize} onClick={favoriteAction}>{icon}</FavoriteContainer>
}
