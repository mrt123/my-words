import React, { Component } from 'react';
import 'whatwg-fetch';
import api from './../../api/api';
import LexicalEntries from './LexicalEntries';
import LoadingSpinner from './../../LoadingSpinner';
import MagnifyGlass from './../../img/MagnifyGlass'

import styled from 'styled-components';

const Result = styled.div`
  margin: 30px 10px;
`;

class ResultsContainer extends Component {

  constructor() {
    console.log(MagnifyGlass);
    super();
    this.state = {lexicalEntries: [], error: ''};
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

      self.setState({loading: false});

      if (resp.status === 'NOT_FOUND') {
        self.setState({lexicalEntries: [], error: 'Word not found!'});
      }
      else {
        self.setState({lexicalEntries: resp.lexicalEntries, error: ''});
      }
    });
  }

  render() {
    var activeComponent = this.state.loading ? <LoadingSpinner/> :
      <LexicalEntries entries={this.state.lexicalEntries}/>;

    return (
      <Result>
        {this.state.error}
        {activeComponent}
      </Result>
    );
  }
}

export default ResultsContainer;