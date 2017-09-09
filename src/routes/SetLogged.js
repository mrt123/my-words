import { Component } from 'react';

export default class Logout extends Component {

  // TODO: * /setLogged cannot be book-mark-able
  // TODO: remove from history

  componentDidMount() {
    document.cookie = "logged=true";
    location.href = `/`;
  }

  render() {
    return null;
  }
}
