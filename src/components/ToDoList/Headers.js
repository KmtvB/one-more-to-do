import React from 'react'
import TaskTickBox from './TaskTickBox'
import { LineTwoArea, EmptyLeft } from './TaskLine'
import ControlButton from '../Buttons/ControlButton'

import './style/header.css'

export const HeaderTaskList = (props) => {
    return (
        <header>
            <LineTwoArea>
                {<TaskTickBox isDone={props.toggleBoxAllTask} onClick={props.toggleBoxOnClick} />}
                {<div className="control-panel">
                    <ControlButton className="add-icon" onClick={props.addButtonOnClick} />
                    <ControlButton className="delete-icon" onClick={props.deleteButtonOnClick} />
                    <input className="page-title" value={props.pageTitle} onChange={(e) => props.titleOnChange(e.target.value)} />
                    <ControlButton className="settings-icon" onClick={props.settingsButtonOnClick} />
                </div>}
            </LineTwoArea>
        </header>
    );
}

export const HeaderTitle = ({ text }) => {
    return (
        <header>
            <LineTwoArea>
                {<EmptyLeft />}
                {<div className="header-title">{text}</div>}
            </LineTwoArea>
        </header>
    );
}