import React from 'react'
import Word from './../../common/Word'
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
    var wordData = this.props.word;

    if (wordData) {
      if (!this.state.showDef) {
        return <Card>
          <div>
            {wordData.id}
          </div>

          <button onClick={this.showDef}>Show Definition</button>
        </Card>
      }
      else {
        return <Card>
          <Word wordData={wordData}/>
          <button onClick={this.goToNext}>Next</button>
        </Card>
      }
    }
    else return null;
  }
};