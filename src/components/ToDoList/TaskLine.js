import React from 'react'

import TaskTextArea from './TaskTextArea'
import TaskTickBox from './TaskTickBox'

import './style/taskline.css'
import './style/task.css'

export const LineTwoArea = ({ children }) => {
    return (
        <div className="line">
            <div className="line__left-area">
                {children[0]}
            </div>
            <div className="line__right-area">
                {children[1]}
            </div>
        </div>
    );
}

export const EmptyLeft = () => {
    return <div className="line__left-empty"></div>
}

export const TaskLineInput = ({ task, toggleBoxOnClick, inputOnChange }) => {
    return (
        <LineTwoArea>
            {<TaskTickBox id={task.id} onClick={toggleBoxOnClick} isDone={task.status} />}
            {<TaskTextArea id={task.id} text={task.text} inputOnChange={inputOnChange} />}
        </LineTwoArea>
    );
}

export const TaskLineText = ({ text, textClassName, onClick }) => {
    return (
        <LineTwoArea>
            {<EmptyLeft />}
            {<div className={"task-text " + (textClassName ? textClassName : '')} onClick={onClick}>
                {text}
            </div>}
        </LineTwoArea>
    );
}