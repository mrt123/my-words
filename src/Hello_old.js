import React, { Component } from 'react';
import styled from 'styled-components';




export default class Hello extends Component {
    render () {
        return (
            <div>Hello {this.props.name}! {this.props.children}</div>
        );
    }
}
