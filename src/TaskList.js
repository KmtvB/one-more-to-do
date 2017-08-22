import React, { Component } from 'react';
import Line from './Line.js';
import TickBox from './TickBox';
import './css/tasklist.css';

class TaskList extends Component {
    keyPressHandler = (event) => {
        if (event.key === 'Enter')
            event.target.blur();
    }
    render() {
        const list = this.props.taskOnPage.map((elem, lineNumber) => {
            const leftArea = (
                <TickBox
                    isClosed={elem.done}
                    toggleBoxOnClick={() => this.props.toggleBoxOnClick(lineNumber, elem.done)}
                />
            );
            const rightArea = (
                <input type="text"
                    value={elem.text}
                    onChange={(e) => this.props.inputOnChange(e, lineNumber)}
                    onKeyPress={this.keyPressHandler} />
            );
            return (
                <li key={elem.id}>
                    <Line
                        left={leftArea}
                        right={rightArea}
                    />
                </li>
            );
        });
        return (
            <div className="list">
                <ul>
                    {list}
                </ul>
            </div>
        );
    }
}


class TaskListTipLines extends Component {
    render() {
        const list = this.props.taskOnPage.map((elem, lineNumber) => {
            const leftArea = <div className="left-empty"></div>;
            const rightArea = (
                <div className={"task-text " + (this.props.selectedLines.indexOf(lineNumber) !== -1 ? "to-delete" : "")}
                    onClick={() => this.props.taskOnClick(lineNumber)}>
                    {elem.text}
                </div>
            );
            return (
                <li key={elem.id}>
                    <Line
                        left={leftArea}
                        right={rightArea}
                    />
                </li>
            );
        });
        return (
            <div className="list">
                <ul>
                    {list}
                </ul>
            </div>
        );
    }
}

export { TaskListTipLines, TaskList };