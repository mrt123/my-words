import React, { Component } from 'react';
import 'whatwg-fetch';
import api from './api';
import LexicalEntries from './LexicalEntries';

class ResultsContainer extends Component {

  constructor() {
    super();
    this.state = {lexicalEntries: []}
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.searchValue !== nextProps.searchValue) {
      this.searchWord(nextProps.searchValue);
    }
  }

  searchWord(word) {
    var self = this;
    api.fetchDefinition(word).then(function (resp) {
      self.setState({lexicalEntries: resp.lexicalEntries});
    });
  }

  render() {
    return (
      <LexicalEntries lexicalEntries={this.state.lexicalEntries}></LexicalEntries>
    );
  }
}

export default ResultsContainer;