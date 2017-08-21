import React, { Component } from 'react';
import Tickbox from './TickBox';
import Line from './Line';
import './css/header.css';

export class Header extends Component {
    render() {
        const leftArea = (
            <Tickbox 
                isClosed={this.props.tickBoxAllTask}
                tickBoxOnClick={this.props.tickBoxOnClick}
            />
        );
        const rightArea = (
            <div className="control-panel">
                <div className="control-icon add-icon" onClick={this.props.addOnClick}></div>
                <div className="control-icon delete-icon" onClick={this.props.delOnClick}></div>
                <input className="page-title" value={this.props.pageTitle} onChange={this.props.titleOnChange}/>
                <div className="control-icon settings-icon" onClick={this.props.setOnClick}></div>
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