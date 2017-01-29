import React from 'react'
import CardFront from './CardFront'
import CardBack from './CardBack'
import CardWrapper from './CardWrapper'

export default class extends React.Component {

  constructor() {
    super();
    this.goToNext = this.goToNext.bind(this);
    this.state = {showDef: false};
    this.showDef = this.showDef.bind(this);
  }

  goToNext() {
    console.log('click');


    // set presentation state
    this.setState({showDef: false});

    // swap data
    this.props.nextCardAction();

    // set presentation state

  }

  showDef() {
    this.setState({showDef: true})
  }

  render() {
    var wordData = this.props.word;

    if (wordData) {
      if (!this.state.showDef) {
        return <CardFront wordData={wordData} showAction={this.showDef} />;
      }
      else {
        return <CardBack wordData={wordData} nextCardAction={this.goToNext} />;
      }
    }
    else return <CardWrapper>Quiz Finished</CardWrapper>;
  }
};