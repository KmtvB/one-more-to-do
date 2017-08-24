import React, { Component } from 'react';
import './css/tickbox.css'

export class TickBox extends Component {
    render() {
        return (
            <div className="tickbox-container">
                <div
                    className={"tick-box " + (this.props.isClosed ? 'done' : 'open')}
                    onClick={this.props.toggleBoxOnClick}
                ></div>
            </div>
        );
    }
}

export default TickBox;