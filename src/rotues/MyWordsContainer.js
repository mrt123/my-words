import React, {Component} from 'react';
import * as api from './../api/api';
import MyWords from './MyWords';
import LoadingSpinner from './../common/LoadingSpinner'

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
    var activeComponent = this.state.loading ? <LoadingSpinner/> :
      <MyWords data={this.state.words}/>;

    return (
      <div>
        {activeComponent}
      </div>
    )
  }
}

export default MyWordsContainer;