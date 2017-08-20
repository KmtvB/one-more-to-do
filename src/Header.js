import React, { Component } from 'react';
import Tickbox from './TickBox';
import Line from './Line';
import './css/header.css'

export class Header extends Component {
    render() {
        const leftArea = (
            <Tickbox 
                isClosed={this.props.tickBoxAllTask}
                handler={this.props.tickBoxHandler}
            />
        );
        const rightArea = (
            <div class="control-panel">
                <div class="control-icon add-icon"></div>
                <div class="control-icon delete-icon"></div>
                <div class="control-icon settings-icon"></div>
            </div>
        );
        return (
            <div className="header">
                <Line
                    left={leftArea}
                    right={rightArea}
                />
            </div>
        );
    }
}

export default Header;