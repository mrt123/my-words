import React, { Component } from 'react';
import styled from 'styled-components';
import createHistory from '../../node_modules/history/createBrowserHistory'
const history = createHistory();

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-shrink: 0;
  margin: 20px;
`;

const Input = styled.input`
  flex-grow: 3;
  font-size: 20px;
  padding: 10px;
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
  flex-grow: 1;
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
    this.state = {value: props.searchValue || ''};

    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.performSearch = this.performSearch.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({value: nextProps.searchValue});
  }

  handleInputChange(event) {
    this.setState({value: event.target.value});
  }

  performSearch(e) {

    const path = '/search/' + this.state.value;
    history.push(path);

    if (this.state.value !== '') {
      this.props.searchAction(this.state.value);
    }
    e.preventDefault();
  }

  handleKeyPress(e) {
    console.log(Object.keys(e));
    console.log(e.target);
    if (e.key === 'Enter') {
      this.performSearch(e);
      e.target.blur();
    }
  }

  render() {
    return (
      <Wrapper>
        <Input type="text" value={this.state.value}
               onChange={this.handleInputChange}
               onKeyPress={this.handleKeyPress}
               size="2"
               placeholder={PLACEHOLDER_TEXT}/>
        <Button onClick={this.performSearch}>Search</Button>
      </Wrapper>
    );
  }
}

export default Search;
