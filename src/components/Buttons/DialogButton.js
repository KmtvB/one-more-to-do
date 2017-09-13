import React from 'react'
import classNames from 'classnames'

import './style/dialogbutton.css'

const DialogButton = ({ yes, no, className, children, ...props }) => {
    const text = yes ? 'Yes' : (no ? 'No' : children)
    const btnClassName = classNames('dialog-button', className, {
        'button-yes': yes,
        'button-no': no,
    })
    return <div className={btnClassName} {...props}>{text}</div>
}

export default DialogButton