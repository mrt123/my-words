import React from 'react'
import * as api from './../../api/api'
import Card from './Card'

export default class extends React.Component {
  constructor() {
    super();
    this.state = {words: [], loading: false, activeWordIndex: 0};
    this.stepActiveWordIndex = this.stepActiveWordIndex.bind(this);
  }

  componentDidMount() {
    this.getMyUnknownWords();
  }

  getMyUnknownWords() {
    this.setState({loading: true});
    api.fetchMyUnknownWords().then(words=> {
      this.setState({words: words, loading: false});
    });
  }

  stepActiveWordIndex() {
    this.setState({activeWordIndex: this.state.activeWordIndex + 1});
  }

  render() {
    if(this.state.words.length > 0) {
      return <Card word={this.state.words[this.state.activeWordIndex]}
                   nextCardAction={this.stepActiveWordIndex}/>
    }
    else {
      return null;
    }
  }
}
