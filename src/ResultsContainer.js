import React, { Component } from 'react';
import 'whatwg-fetch';
import api from './api';
import LexicalEntries from './LexicalEntries';

import styled from 'styled-components';

const Result = styled.div`
  margin: 30px 10px;
`;

class ResultsContainer extends Component {

  constructor() {
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
    api.fetchDefinition(word).then(function (resp) {

      if (resp.status === 'NOT_FOUND') {
        self.setState({lexicalEntries: [], error: 'Word not found!'});
      }
      else {
        self.setState({lexicalEntries: resp.lexicalEntries, error: ''});
      }
    });
  }

  render() {
    return (
      <Result>
        {this.state.error}
        <LexicalEntries lexicalEntries={this.state.lexicalEntries}></LexicalEntries>
      </Result>
    );
  }
}

export default ResultsContainer;