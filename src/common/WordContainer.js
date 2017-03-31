import React, { Component } from 'react';
import * as api from './../api/api';
import LoadingSpinner from './LoadingSpinner';
import Word from './Word';

import styled from 'styled-components';

const Result = styled.div`
  margin: 30px 10px;
  display: flex;
  flex-grow: 1;
`;

class WordContainer extends Component {

  constructor() {
    super();
    this.state = {wordData: {word: {}, error: ''}};
  }

  componentDidMount() {
    this.handleRouteParams();
    if(this.props.wordId) {
      this.fetchWord(this.props.wordId);
    }
  }

  componentWillReceiveProps(nextProps) {  console.log('old: ' + this.props.wordId, 'new: ' + nextProps.wordId)
    if(this.props.wordId !== nextProps.wordId) {        console.log('WordContainer: props recieived ')
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

    // TODO : remove all rendering relating to loading and move to <Word>.
    // TODO: remove all error handling (backend should provide consistent error format;

    var activeComponent;
    if (this.state.loading) {
      activeComponent = <LoadingSpinner size="{80}"/>;
    }
    else {
      activeComponent = <Word wordData={this.state.wordData}/>;
    }

    var error = '';
    if (this.state.wordData.error) {
      error = this.state.wordData.error;
    }

    return (
      <Result>
        {error}
        {activeComponent}
      </Result>
    );
  }
}

export default WordContainer;