import React, { Component } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
`;

const Input = styled.input`
  font-size: 1.25em;
  padding: 0.5em;
  color: palevioletred;
  background: papayawhip;
  border: none;
  border-radius: 3px;
  outline: none;

  &:hover {
    box-shadow: inset 1px 1px 2px rgba(0,0,0,0.1);
  }
`;

const Button = styled.button`
  background-color: #B4D1B6;
  color: white;
  border: none;
  outline: none;
  font-size: 1.25em;
`;

const PLACEHOLDER_TEXT = 'enter a word';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSearch(e) {
    if (this.state.value !== '') {
      this.props.searchAction(this.state.value);
    }
    e.preventDefault();
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      this.handleSearch(e);
    }
  }

  render() {
    return (
      <Wrapper>
        <Input type="text" value={this.state.value}
               onChange={this.handleChange}
               onKeyPress={this.handleKeyPress}
               placeholder={PLACEHOLDER_TEXT}/>
        <Button onClick={this.handleSearch}>Search</Button>
      </Wrapper>
    );
  }
}

export default Search;