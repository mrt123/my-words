import React, {Component} from 'react';
import * as api from './../api/api';
import MyWords from './MyWords';
import {BigSpinner} from './routeComponents';

class MyWordsContainer extends Component {
  constructor() {
    super();
    this.state = {words: [], loading: false};
  }

  componentDidMount() {
    this.getWords();
  }

  getWords() {
    this.setState({loading: true});
    api.fetchMyWordsIds().then(words => {
      this.setState({words: words, loading: false});
    });
  }

  render() {
    return this.state.loading ? <BigSpinner/> : <MyWords data={this.state.words}/>;
  }
}

export default MyWordsContainer;