import React, { Component } from 'react';

export class TickBox extends Component {
    render() {
        return (
            <div 
                className={"tick-box " + this.props.isClosed ? 'done' : 'open'} 
                onClick={this.props.handler}
            ></div>
        );
    }
}

export default TickBox;