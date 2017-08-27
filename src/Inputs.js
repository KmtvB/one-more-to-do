import React from 'react';
import React, { Component } from 'react';

function adjustTextAreaHeight(elem) {
    elem.style.height = '1px';
    elem.style.height = elem.scrollHeight + 'px';
}

export class TaskTextArea extends Component {
    keyPressHandler = (event) => {
        if (event.key === 'Enter')
            event.target.blur();
    }
    keyUpHandler(event) {
        adjustTextAreaHeight(event.target);
    }
    render() {
        return (
            <textarea type="text"
                onChange={(e) => this.props.editTask(this.props.id, e.target.value)}
                onKeyPress={this.keyPressHandler}
                onKeyUp={this.keyUpHandler}
                value={this.props.text} />
        );
    }
}