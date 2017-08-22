import React, { Component } from 'react';
import Tickbox from './TickBox';
import Line from './Line';
import './css/header.css';

function Header(props) {
    return (
        <div className="header">
            {props.children}
        </div>
    );
}

class HeaderTaskList extends Component {
    render() {
        const leftArea = (
            <Tickbox
                isClosed={this.props.toggleBoxAllTask}
                toggleBoxOnClick={this.props.toggleBoxOnClick}
            />
        );
        const rightArea = (
            <div className="control-panel">
                <div className="control-icon add-icon" onClick={this.props.addOnClick}></div>
                <div className="control-icon delete-icon" onClick={this.props.delOnClick}></div>
                <input className="page-title" value={this.props.pageTitle} onChange={this.props.titleOnChange} />
                <div className="control-icon settings-icon" onClick={this.props.setOnClick}></div>
            </div>
        );
        return (
            <Line
                left={leftArea}
                right={rightArea}
            />
        );
    }
}

class HeaderTitle extends Component {
    render() {
        const leftArea = <div className="left-empty"></div>;
        const rightArea = <div className="header-title">{this.props.text}</div>;
        return (
            <Line
                left={leftArea}
                right={rightArea}
            />
        );
    }
}

export { HeaderTitle, HeaderTaskList, Header }