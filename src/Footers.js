import React, { Component } from 'react';
import { LineTwoArea } from './Line';
import './css/footer.css';

export const Footer = ({ children }) => {
    return (
        <div className="footer">
            {children}
        </div>
    );
}

export const FooterNavBar = (props) => {
    const rightArea = (
        <div className="nav-panel">
            <div onClick={props.prevOnClick} className={"nav-button nav-button-prev " + (props.isPrevActive ? '' : 'nav-button-inactive')}>
                <div className="nav-icon prev-icon"></div>
                <span>Previous</span>
            </div>
            {props.isNextAsNewPage ? (
                <div onClick={props.nextOnClick} className={"nav-button nav-button-new"}>
                    <span>New page</span>
                    <div className="nav-icon new-icon"></div>
                </div>
            ) : (
                    <div onClick={props.nextOnClick} className={"nav-button nav-button-next"}>
                        <span>Next</span>
                        <div className="nav-icon next-icon"></div>
                    </div>
                )}
        </div>
    );
    return (
        <LineTwoArea>
            {<div className="left-empty"></div>}
            {rightArea}
        </LineTwoArea>
    );
}

const DialogButton = ({ className, ...props }) => {
    return <div className={"dialog-button " + className} {...props}></div>
}

export const FooterDialog = ({ yesOnClick, noOnClick }) => {
    return (
        <LineTwoArea>
            {<div className="left-empty"></div>}
            {<div className="dialog-panel">
                <DialogButton className="button-no" onClick={() => noOnClick}>No</DialogButton>
                <DialogButton className="button-yes" onClick={() => yesOnClick}>Yes</DialogButton>
            </div>}
        </LineTwoArea>
    );
}

