import React from 'react'

import './style/controlbutton.css'

const ControlButton = ({ className, ...props }) => {
    return <div className={"control-icon " + className} {...props}></div>
}

export default ControlButton