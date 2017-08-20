import React, { Component } from 'react';


export class Line extends Component {
    render() {
        return (
            <div className="line">
                <div className="left-area">
                    {this.props.left}
                </div>
                <div className="right-area">
                    {this.props.right}
                </div>
            </div>
        );
    }
}

export default Line;