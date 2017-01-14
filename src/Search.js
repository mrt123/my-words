import React, { Component } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const Input = styled.input`
  font-size: 1.25em;
  padding: 0.5em;
  color: palevioletred;
  background: papayawhip;
  border: none;
  border-radius: 3px;

  &:hover {
    box-shadow: inset 1px 1px 2px rgba(0,0,0,0.1);
  }
`;

const Button = styled.button`
  background-color: #B4D1B6;
  color: white;
  border: none;
  font-size: 1.25em;
`;

const PLACEHOLDER_TEXT = 'enter a word';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSearch(event) {
    this.props.searchAction(this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <Wrapper>
        <Input type="text" value={this.state.value} onChange={this.handleChange.bind(this)}
               placeholder={PLACEHOLDER_TEXT}/>
        <Button onClick={this.handleSearch.bind(this)}>Search</Button>
      </Wrapper>
    );
  }
}

export default Search;