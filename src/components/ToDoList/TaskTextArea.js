import React, { Component } from 'react'

import './style/task.css'

function adjustTextAreaHeight(elem) {
    elem.style.height = '1px'
    elem.style.height = elem.scrollHeight + 'px'
}

class TaskTextArea extends Component {
    keyPressHandler = (event) => {
        if (event.key === 'Enter')
            event.target.blur();
    }

    onChange = (event) => {
        this.props.inputOnChange(event.target.value, this.props.id)
    }
    
    componentDidMount = () => {
        adjustTextAreaHeight(this.textarea)
    }
    
    componentDidUpdate = (prevProps, prevState) => {
        adjustTextAreaHeight(this.textarea)
    }

    render() {
        return (
            <textarea type="text"
                ref={elem => { this.textarea = elem }}
                className="task-input"
                onChange={this.onChange}
                onKeyPress={this.keyPressHandler}
                onKeyUp={this.keyUpHandler}
                value={this.props.text} />
        );
    }
}

export default TaskTextArea