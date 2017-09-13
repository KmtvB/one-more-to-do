import React from 'react'
import classNames from 'classnames'

import './style/controlbutton.css'

const ControlButton = ({ add, del, settings, className, ...props }) => {
    const btnClassName = classNames('control-icon', className, {
        'add-icon': add,
        'delete-icon': del,
        'settings-icon': settings,
    })
    return <div className={btnClassName} {...props}></div>
}

export default ControlButton