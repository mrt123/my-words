import React, { Component } from 'react';
import * as api from './../api/api';
import NavBar from './NavBar';

export default class NavBarContainer extends Component {

  constructor() {
    super();
    this.state = { user: null  };
  }

  componentDidMount() {
    const logged = document.cookie.indexOf('words-token=') >= 0;
    if(logged) {
      this.fetchUser(this.props.userId);
    }
  }

  fetchUser(wordId) {
    this.setState({loading: true});
    api.fetchUser(wordId).then(resp=> {
      this.setState({loading: false, user: resp});
    });
  }

  render() {
    return <NavBar user={this.state.user} loading={this.state.loading}/>;
  }
}