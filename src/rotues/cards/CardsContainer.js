import React from 'react'
import * as api from './../../api/api'
import Cards from './Cards'
import LoadingSpinner from '../../common/LoadingSpinner';

export default class extends React.Component {
  constructor() {
    super();
    this.state = {words: [], loading: false, wordData: {}};
    this.wordIndex = 0;
    this.getNextWord = this.getNextWord.bind(this);
  }

  componentDidMount() {
    this.setState({loading: true});
    api.fetchMyWords().then(words=> {
      this.setState({words: words});
      var wordName = this.state.words[this.wordIndex];
      this.getWord(wordName);
    });
  }

  getWord(wordName) {
    this.setState({loading: true});  // TODO: watch out for multiple renders!

    api.fetchDefinition(wordName).then(resp=> {
      this.setState({loading: false});

      if (resp.status === 'NOT_FOUND') {
        this.setState({wordData: {}, error: 'Word not found!'});
      }
      else {
        this.setState({wordData: Object.assign(this.state.wordData, resp ), error: ''});
      }
    });

  }

  getNextWord() {
    this.wordIndex++;
    var wordName = this.state.words[this.wordIndex];
    this.getWord(wordName);
  }

  render() {
    if(this.state.loading) {
      return  <LoadingSpinner/>;
    }
    else {
      return <Cards activeWord={this.state.wordData} nextCardAction={this.getNextWord}/>
    }
  }
}
