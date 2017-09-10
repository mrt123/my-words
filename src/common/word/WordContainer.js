import React, { Component } from 'react';
import * as api from './../../api/api';
import Word from './Word';

class WordContainer extends Component {

  constructor() {
    super();
    this.state = {
      loading: true
    };
  }

  componentDidMount() {
    if (this.props.wordId) {
      this.fetchWord(this.props.wordId);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.wordId !== nextProps.wordId) {
      this.fetchWord(nextProps.wordId);
    }
  }

  fetchWord(wordId) {
    this.setState({loading: true});

    api.fetchDefinition(wordId).then(resp=> {
      this.setState({loading: false, wordData: resp});
    });
  }

  render() {
    return <Word wordName={this.props.wordId} response={this.state.wordData} loading={this.state.loading}/>;
  }
}

export default WordContainer;