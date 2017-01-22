import React, {Component} from 'react';
import Search from './Search';
import WordContainer from './WordContainer';

export default class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {searchValue: ''};
    this.search = this.search.bind(this);
  }

  search(v) {
    this.setState({searchValue: v});
  }

  render () {
    return (
      <div>
        <Search searchAction={this.search}></Search>
        <WordContainer searchValue={this.state.searchValue}></WordContainer>
      </div>
    );
  }
}