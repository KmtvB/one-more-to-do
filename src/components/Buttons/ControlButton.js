import React from 'react'

const ControlButton = ({ className, ...props }) => {
    return <div className={"control-icon " + className} {...props}></div>
}

export default ControlButton