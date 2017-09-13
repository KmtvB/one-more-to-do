import React from 'react';
import { LineTwoArea, EmptyLeft } from './TaskLine';
import { NavButtonNewPage, NavButtonPrev, NavButtonNext } from '../Buttons/NavButton'
import { DialogButtonNo, DialogButtonYes } from '../Buttons/DialogButton'

import './style/footer.css';

export const FooterNavBar = (props) => {
    return (
        <footer>
            <LineTwoArea>
                {<EmptyLeft />}
                {<div className="nav-panel">
                    <NavButtonPrev disabled={!props.isPrevActive} onClick={props.prevOnClick} />
                    {props.isNextAsNewPage ?
                        (<NavButtonNewPage onClick={props.nextOnClick} />) :
                        (<NavButtonNext onClick={props.nextOnClick} />)}
                </div>}
            </LineTwoArea>
        </footer>
    );
}

export const FooterDialog = ({ yesOnClick, noOnClick }) => {
    return (
        <footer>
            <LineTwoArea>
                {<EmptyLeft />}
                {<div className="dialog-panel">
                    <DialogButtonNo onClick={noOnClick} />
                    <DialogButtonYes onClick={yesOnClick} />
                </div>}
            </LineTwoArea>
        </footer>
    );
}

