import React from 'react'
import {RouteWrapper, BigSpinner} from '../routeComponents';
import Card from './Card'

export default class Cards extends React.Component {
  render() {

    if (this.props.loading) {
      return (
          <BigSpinner/>
      );
    }
    else if (this.props.activeWordId) {
      return (
        <RouteWrapper>
          <Card activeWordId={this.props.activeWordId}/>
          <button onClick={this.props.nextCardAction}>Next</button>
        </RouteWrapper>
      );
    }
    else {
      return (
        <div>
          Quiz Finished
          <button>reset</button>
        </div>
      )
    }
  }
};