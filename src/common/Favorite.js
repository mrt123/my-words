import React, {Component} from 'react';
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

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {favorite: '', loading: false};
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    var self = this;
    this.setState({loading: true});
    this.props.favoriteAction().then(()=>
      self.setState({loading: false})
    );
    e.preventDefault();
  }

  render() {
    var icon = this.props.favorite ? <StarFilledIcon/> : <StarEmptyIcon/>;
    if (this.state.loading) {
      icon = <Spinner>{icon}</Spinner>
    }
    return <FavoriteContainer onClick={this.handleClick}>{icon}</FavoriteContainer>
  }
}
