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

const NavButton = ({ className, children, ...props }) => {
    return (
        <div className={"nav-button " + className} {...props}>
            {children}
        </div>
    );
}

export const FooterNavBar = (props) => {
    const rightArea = (
        <div className="nav-panel">
            <NavButton onClick={props.prevOnClick} className={"nav-button-prev " + (props.isPrevActive ? '' : 'nav-button-inactive')}>
                <div className="nav-icon prev-icon"></div>
                <span>Previous</span>
            </NavButton>
            {props.isNextAsNewPage ?
                (
                    <NavButton onClick={props.nextOnClick} className="nav-button-new">
                        <span>New page</span>
                        <div className="nav-icon new-icon"></div>
                    </NavButton>
                ) : (
                    <NavButton onClick={props.nextOnClick} className="nav-button-next">
                        <span>Next</span>
                        <div className="nav-icon next-icon"></div>
                    </NavButton>
                )}
        </div>
    );
    return (
        <Footer>
            <LineTwoArea>
                {<div className="left-empty"></div>}
                {rightArea}
            </LineTwoArea>
        </Footer>
    );
}

const DialogButton = ({ className, children, ...props }) => {
    return (
        <div className={"dialog-button " + className} {...props}>
            {children}
        </div>
    );
}

export const FooterDialog = ({ yesOnClick, noOnClick }) => {
    return (
        <Footer>
            <LineTwoArea>
                {<div className="left-empty"></div>}
                {<div className="dialog-panel">
                    <DialogButton className="button-no" onClick={noOnClick}>No</DialogButton>
                    <DialogButton className="button-yes" onClick={yesOnClick}>Yes</DialogButton>
                </div>}
            </LineTwoArea>
        </Footer>
    );
}

