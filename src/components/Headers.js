import React, { Component } from 'react';
import { TickBox, TickBoxAll } from './TickBox';
import { LineTwoArea } from './Line';
import './css/header.css';

export const Header = ({ children }) => {
    return (
        <div className="header">
            {children}
        </div>
    );
}

const ControlButton = ({ className, ...props }) => {
    return <div className={"control-icon " + className} {...props}></div>;
}

export const HeaderTaskList = (props) => {
    return (
        <Header>
            <LineTwoArea>
                {<TickBoxAll isDone={props.toggleBoxAllTask} onClick={props.toggleBoxOnClick} />}
                {<div className="control-panel">
                    <ControlButton className="add-icon" onClick={props.addButtonOnClick} />
                    <ControlButton className="delete-icon" onClick={props.deleteButtonOnClick} />
                    <input className="page-title" value={props.pageTitle} onChange={props.titleOnChange} />
                    <ControlButton className="settings-icon" onClick={props.settingsButtonOnClick} />
                </div>}
            </LineTwoArea>
        </Header>
    );
}

export const HeaderTitle = ({ text }) => {
    return (
        <Header>
            <LineTwoArea>
                {<div className="left-empty"></div>}
                {<div className="header-title">{text}</div>}
            </LineTwoArea>
        </Header>
    );
}