import React from 'react';

import './style/tasktickbox.css'

const TaskTickBox = ({ id, onClick, isDone }) => {
    return (
        <div className="tickbox-container">
            <div
                className={"tick-box " + (isDone ? 'done' : 'open')}
                onClick={() => onClick(id)}
            ></div>
        </div>
    );
}

export default TaskTickBox