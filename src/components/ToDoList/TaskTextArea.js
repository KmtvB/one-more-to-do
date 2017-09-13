import React, { Component } from 'react'

function adjustTextAreaHeight(elem) {
    elem.style.height = '1px'
    elem.style.height = elem.scrollHeight + 'px'
}

class TaskTextArea extends Component {
    keyPressHandler = (event) => {
        if (event.key === 'Enter')
            event.target.blur();
    }
    keyUpHandler(event) {
        adjustTextAreaHeight(event.target)
    }
    onChange = (event) => {
        this.props.inputOnChange(event.target.value, this.props.id)
    }
    render() {
        return (
            <textarea type="text"
                onChange={this.onChange}
                onKeyPress={this.keyPressHandler}
                onKeyUp={this.keyUpHandler}
                value={this.props.text} />
        );
    }
}

export default TaskTextArea