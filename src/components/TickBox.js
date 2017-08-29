import React from 'react';
import './css/tickbox.css'

export const TickBox = ({ id, onClick, isDone }) => {
    return (
        <div className="tickbox-container">
            <div
                className={"tick-box " + (isDone ? 'done' : 'open')}
                onClick={() => onClick(id)}
            ></div>
        </div>
    );
}

export const TickBoxAll = ({ page, onClick, isDone }) => {
    return (
        <div className="tickbox-container">
            <div
                className={"tick-box " + (isDone ? 'done' : 'open')}
                onClick={() => onClick()}
            ></div>
        </div>
    );
}