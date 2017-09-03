import React, {Component} from 'react';
import * as api from './../api/api';
import MyWords from './../common/MyWords';

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
    return <MyWords data={this.state.words} loading={this.state.loading}/>;
  }
}

export default MyWordsContainer;