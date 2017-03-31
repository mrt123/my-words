import React from 'react'
import styled from 'styled-components'
import WordContainer from './../../common/WordContainer.js'

const Perspective = styled.div`
  display: flex;
  flex-grow: 1;
  perspective: 800px;
`;

const Flipper = styled.div`
  display: flex;
  flex-grow: 1;
  position: relative;
  margin: 40px 40px 100px 40px;
  transform-style: preserve-3d;
  transition: transform ${props => props.speed};
  transform: ${props => props.flipped ? 'rotateY( 180deg )' : 'rotateY( 0deg )'};
`;

const Card = styled.div`
  overflow-y: scroll;
  cursor: pointer;
  display: flex;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.75);
  border-radius: 12px;
  backface-visibility: hidden;
  padding: 10px;
  transform: ${props => props.flipped ? 'rotateY( 180deg )' : 'rotateY( 0deg )'};
`;

const CardFrontHeading = styled.div`
  display: flex;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
  font-size: 33px;
  font-family: "Comic Sans MS", cursive, sans-serif;
`;

const CardFrontContent = ({wordId}) => (
  <Card>
    <CardFrontHeading>{wordId}</CardFrontHeading>
  </Card>
);

export default class Cards extends React.Component {

  constructor() {
    super();
    this.state = {flipped: false, rotationTime: '1s'};
    this.rotate = this.rotate.bind(this);
  }

  componentWillReceiveProps() {
    this.setState({flipped: false, rotationTime: '0'});
  }

  rotate(e) {
    this.setState({flipped: !this.state.flipped, rotationTime: '1s'});
    e.preventDefault();
  }

  render() {  // TODO: provide loading animation to CardFrontContent
    return (
      <Perspective onClick={this.rotate}>
        <Flipper flipped={this.state.flipped} speed={this.state.rotationTime}>
          <CardFrontContent wordId={this.props.activeWordId}/>
          <Card flipped>
            <WordContainer wordId={this.props.activeWordId}/>
          </Card>
        </Flipper>
      </Perspective>
    );
  }
};