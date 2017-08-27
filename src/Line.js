import React, { Component } from 'react';
import './css/line.css';

export const LineTwoArea = (props) => {
    return (
        <div className="line">
            <div className="left-area">
                {props.children[0]}
            </div>
            <div className="right-area">
                {props.children[1]}
            </div>
        </div>
    );
}

