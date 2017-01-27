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
    this.markFavorite = this.markFavorite.bind(this);
  }

  componentDidMount() {
    if (this.props.params) {
      var wordId = this.props.params.wordId;

      if (wordId) {
        this.fetchDefinition(wordId);
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.searchValue !== nextProps.searchValue) {
      this.fetchDefinition(nextProps.searchValue);
    }
  }

  fetchDefinition(word) {
    var self = this;
    self.setState({loading: true});

    api.fetchDefinition(word).then(function (resp) {
      self.setState({loading: false});

      if (resp.status === 'NOT_FOUND') {
        self.setState({wordData: {}, error: 'Word not found!'});
      }
      else {
        self.setState({wordData: resp, error: ''});
      }
    });
  }

  markFavorite() {
    var self = this;

    if(this.state.wordData) {
      return api.markWordAsFavorite(this.state.wordData).then(function (wordData) {
        self.setState({wordData: wordData});
      });
    }
  }

  render() {
    var activeComponent = this.state.loading ? <LoadingSpinner/> :
      <Word wordData={this.state.wordData} favoriteAction={this.markFavorite} />;

    return (
      <Result>
        {this.state.error}
        {activeComponent}
      </Result>
    );
  }
}

export default ResultsContainer;