import React, { Component } from 'react';
import * as api from './../api/api';
import Word from './Word';

class WordContainer extends Component {

  constructor() {
    super();
    this.state = {wordData: {word: {}, error: ''}, loading: true};
  }

  componentDidMount() {
    this.handleRouteParams();
    if(this.props.wordId) {
      this.fetchWord(this.props.wordId);
    }
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.wordId !== nextProps.wordId) {
      this.fetchWord(nextProps.wordId);
    }
  }

  handleRouteParams() {
    if (this.props.params && this.props.params.wordId) {
      this.fetchWord(this.props.params.wordId);
    }
  }

  fetchWord(wordId) {
    this.setState({loading: true});

    api.fetchDefinition(wordId).then(resp=> {
      this.setState({loading: false, wordData: resp});
    });
  }

  render() {
    // TODO: remove all error handling (backend should provide consistent error format;

    if (this.state.wordData.error) {
      return <div>this.state.wordData.error;</div>;
    }
    else {
      return<Word wordData={this.state.wordData} loading={this.state.loading}/>;
    }
  }
}

export default WordContainer;