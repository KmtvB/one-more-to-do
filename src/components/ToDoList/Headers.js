import React from 'react'
import TaskTickBox from './TaskTickBox'
import { LineTwoArea, EmptyLeft } from './TaskLine'
import ControlButton from '../Buttons/ControlButton'

import './style/header.css'

const Header = ({ children }) => {
    return <header className="header to-do__header">{children}</header>
}

export const HeaderTaskList = (props) => {
    return (
        <Header>
            <LineTwoArea>
                {<TaskTickBox isDone={props.toggleBoxAllTask} onClick={props.toggleBoxOnClick} />}
                {<div className="header__panel">
                    <ControlButton add onClick={props.addButtonOnClick} />
                    <ControlButton del onClick={props.deleteButtonOnClick} />
                    <input className="header__page-title" value={props.pageTitle} onChange={(e) => props.titleOnChange(e.target.value)} />
                    <ControlButton settings onClick={props.settingsButtonOnClick} />
                </div>}
            </LineTwoArea>
        </Header>
    );
}

export const HeaderTitle = ({ text }) => {
    return (
        <Header>
            <LineTwoArea>
                {<EmptyLeft />}
                {<div className="header__header-text">{text}</div>}
            </LineTwoArea>
        </Header>
    );
}