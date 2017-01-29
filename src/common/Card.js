import React from 'react'
import Word from './Word'
import styled from 'styled-components'

const Card = styled.div`
  border: 1px solid;
  margin: 40px;
  padding: 10px;
`;

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
    console.log(this.state)
    if (!this.state.showDef) {
      return <Card>
        <div>
          {this.props.word.id}
        </div>

        <button onClick={this.showDef}>Show Definition</button>
      </Card>
    }
    else {
      return <Card>
        <Word wordData={this.props.word}/>
        <button onClick={this.goToNext}>Next</button>
      </Card>
    }
  }
};