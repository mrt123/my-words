import React, {Component} from 'react';
import api from './../api/api'
import MyWords from './MyWords';
import LoadingSpinner from './../LoadingSpinner'

class MyWordsContainer extends Component {
  constructor() {
    super();
    this.state = {words: [], loading: false};
  }

  componentDidMount() {
    this.getWords();
  }

  getWords() {
    var self = this;
    this.setState({loading: true});
    api.fetchMyWords().then(function (words) {
      self.setState({words: words});
      self.setState({loading: false});
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