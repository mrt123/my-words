import React, { Component } from 'react';
import WordContainer from '../common/WordContainer.js';

class WordRoute extends Component {

  render() {
    if (this.props.params && this.props.params.wordId) {
      return <WordContainer wordId={this.props.params.wordId}/>;
    }
    else {
      return null;
    }
  }
}

export default WordRoute;