import React, { Component } from 'react';
import 'whatwg-fetch';
import * as api from './../api/api';
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
    this.setState({loading: true});

    api.fetchDefinition(word).then(resp=> {
      this.setState({loading: false});

      if (resp.status === 'NOT_FOUND') {
        this.setState({wordData: {}, error: 'Word not found!'});
      }
      else {
        this.setState({wordData: resp, error: ''});
      }
    });
  }

  markFavorite() {
    if(this.state.wordData) {
      return api.markWordAsFavorite(this.state.wordData).then(wordData =>
        this.setState({wordData: wordData})
      );
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