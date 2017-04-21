import React, {Component} from 'react';
import {RouteWrapper} from '../routeComponents';
import Search from './Search';
import WordContainer from './../../common/WordContainer';

export default class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {searchValue: props.wordId || ''};
    this.performSearch = this.performSearch.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({searchValue: nextProps.wordId});
  }

  performSearch(v) {
    this.setState({searchValue: v});
  }

  render() {
    var searchResult = '';

    if (this.state.searchValue) {
      searchResult = <WordContainer wordId={this.state.searchValue}/>;
    }

    return (
      <RouteWrapper>
        <Search searchValue={this.state.searchValue} searchAction={this.performSearch}></Search>
        {searchResult}
      </RouteWrapper>
    );
  }
}