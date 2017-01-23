import React, { Component } from 'react';
import 'whatwg-fetch';
import api from './../api/api';
import LoadingSpinner from './LoadingSpinner';
import Word from './Word';

import styled from 'styled-components';

const Result = styled.div`
  margin: 30px 10px;
`;

class ResultsContainer extends Component {

  constructor() {
    super();
    this.state = {wordData: {}, error: ''};
  }

  componentDidMount() {
    if (this.props.params) {
      var wordId = this.props.params.wordId;

      if (wordId) {
        this.searchWord(wordId);
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.searchValue !== nextProps.searchValue) {
      this.searchWord(nextProps.searchValue);
    }
  }

  searchWord(word) {
    var self = this;
    self.setState({loading: true});

    api.fetchDefinition(word).then(function (resp) {
      console.log(resp);
      self.setState({loading: false});

      if (resp.status === 'NOT_FOUND') {
        self.setState({wordData: {}, error: 'Word not found!'});
      }
      else {
        self.setState({wordData: resp, error: ''});
      }
    });
  }

  render() {
    var activeComponent = this.state.loading ? <LoadingSpinner/> :
      <Word wordData={this.state.wordData}/>;

    return (
      <Result>
        {this.state.error}
        {activeComponent}
      </Result>
    );
  }
}

export default ResultsContainer;