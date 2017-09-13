import React from 'react'

import './style/navbutton.css'

const NavButton = ({ className, children, ...props }) => {
    return (
        <div className={"nav-button " + className} {...props}>
            {children}
        </div>
    )
}

export const NavButtonNext = ({ onClick, ...props }) => {
    return (
        <NavButton onClick={props.nextOnClick} className="nav-button-next">
            <span>Next</span>
            <div className="nav-icon next-icon"></div>
        </NavButton>
    )
}


export const NavButtonPrev = ({ onClick }) => {
    return (
        <NavButton onClick={onClick} className="nav-button-prev">
            <div className="nav-icon prev-icon"></div>
            <span>Previous</span>
        </NavButton>
    )
}

export const NavButtonNewPage = ({ onClick}) => {
    return (
        <NavButton onClick={onClick} className="nav-button-new">
            <span>New page</span>
        </NavButton>
    )
}

