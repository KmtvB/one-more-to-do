import React from 'react';
import { LineTwoArea, EmptyLeft } from './TaskLine';
import { NavButtonNewPage, NavButtonPrev, NavButtonNext } from '../Buttons/NavButton'
import DialogButton from '../Buttons/DialogButton'

import './style/footer.css';

const Footer = ({ children }) => {
    return <footer className="footer to-do__footer">{children}</footer>
}

export const FooterNavBar = (props) => {
    return (
        <Footer>
            <LineTwoArea>
                {<EmptyLeft />}
                {<div className="footer__panel">
                    <NavButtonPrev disabled={!props.isPrevActive} onClick={props.prevOnClick} />
                    {props.isNextAsNewPage ?
                        (<NavButtonNewPage onClick={props.nextOnClick} />) :
                        (<NavButtonNext onClick={props.nextOnClick} />)}
                </div>}
            </LineTwoArea>
        </Footer>
    );
}

export const FooterDialog = ({ yesOnClick, noOnClick }) => {
    return (
        <Footer>
            <LineTwoArea>
                {<EmptyLeft />}
                {<div className="footer__panel">
                    <DialogButton no onClick={noOnClick} />
                    <DialogButton yes onClick={yesOnClick} />
                </div>}
            </LineTwoArea>
        </Footer>
    );
}

