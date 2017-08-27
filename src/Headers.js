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

export const HeaderTaskList = ({ pageTitle, addTodo, setInterface, changeTitle }) => {
    return (
        <LineTwoArea>
            {<TickBoxAll />}
            {<div className="control-panel">
                <ControlButton className="add-icon" onClick={() => addTodo()}></ControlButton>
                <ControlButton className="delete-icon" onClick={() => setInterface()}></ControlButton>
                <input className="page-title" value={pageTitle} onChange={() => changeTitle()} />
                <ControlButton className="settings-icon" onClick={() => setInterface()}></ControlButton>
            </div>}
        </LineTwoArea>
    );
}

export const HeaderTitle = ({ text }) => {
    return (
        <LineTwoArea>
            {<div className="left-empty"></div>}
            {<div className="header-title">{text}</div>}
        </LineTwoArea>
    );
}