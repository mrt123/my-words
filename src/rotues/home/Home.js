import React, {Component} from 'react';
import {RouteWrapper} from '../routeComponents';
import Search from './Search';
import WordContainer from './../../common/WordContainer';

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
    var searchResult ='';

    if(this.state.searchValue) {
      searchResult = <WordContainer wordId={this.state.searchValue}/>;
    }

    return (
      <RouteWrapper>
        <Search searchAction={this.search}></Search>
        {searchResult}
      </RouteWrapper>
    );
  }
}