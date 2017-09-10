import React from 'react'
import * as api from './../api/api'
import Cards from './../common/Cards'

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
    return <Cards activeWordId={this.state.activeWordId} loading={this.state.loading} nextCardAction={this.setActiveWordId}/>
  }
}
