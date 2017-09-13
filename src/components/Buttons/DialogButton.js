import React from 'react'

import './style/dialogbutton.css'

const DialogButton = ({ className, children, ...props }) => {
    return (
        <div className={"dialog-button " + className} {...props}>
            {children}
        </div>
    );
}

export const DialogButtonYes = ({ onClick }) => {
    return <DialogButton className="button-yes" onClick={onClick}>Yes</DialogButton>
}

export const DialogButtonNo = ({ onClick }) => {
    return <DialogButton className="button-no" onClick={onClick}>No</DialogButton>
}
