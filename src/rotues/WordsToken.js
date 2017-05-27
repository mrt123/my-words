import React, { Component } from 'react';
// TODO: remove component and replace with a independent Route Redirect in App.js.

export default class WordsToken extends Component {

  componentWillMount() {
    localStorage.setItem('wordsToken', this.props.token);
    location.href = '/search';
  }

  render () {
    return (
      <div>Authenticating {this.props.token}</div>
    );
  }
}
