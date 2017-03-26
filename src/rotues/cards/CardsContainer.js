import React from 'react'
import * as api from './../../api/api'
import Cards from './Cards'
import LoadingSpinner from '../../common/LoadingSpinner';

export default class extends React.Component {  // TODO: remove duplication with myWordsContainer.
  constructor() {
    super();
    this.state = {loading: false};
    this.wordIdIndex = 0;
    this.setActiveWordId = this.setActiveWordId.bind(this);
  }

  componentDidMount() {
    this.setState({loading: true});
    api.fetchMyWordsIds().then(wordIds=> {
      this.setState({wordIds: wordIds, activeWordId: wordIds[0], loading: false});
    });
  }

  setActiveWordId() {
    this.wordIdIndex++;
    var nextWordId = this.state.wordIds[this.wordIdIndex];
    this.setState({activeWordId: nextWordId});
  }

  render() {
    if (this.state.loading) {
      return <LoadingSpinner/>;   // TODO: remove loading related rendering from Container Component!
    }
    else {
      return <Cards activeWordId={this.state.activeWordId} nextCardAction={this.setActiveWordId}/>
    }
  }
}
