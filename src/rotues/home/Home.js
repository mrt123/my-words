import React, {Component} from 'react';
import styled from 'styled-components';
import Search from './Search';
import WordContainer from './../../common/WordContainer';

const Wrap = styled.div`
  flex-grow: 1;
`;

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
      <Wrap>
        <Search searchAction={this.search}></Search>
        <WordContainer wordId={this.state.searchValue}></WordContainer>
      </Wrap>
    );
  }
}