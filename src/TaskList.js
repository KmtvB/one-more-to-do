import React, { Component } from 'react';
import Line from './Line.js';
import TickBox from './TickBox';
import './css/tasklist.css';

class TaskList extends Component {
    static adjustTextAreaHeight(elem) {
        elem.style.height = '1px';
        elem.style.height = elem.scrollHeight + 'px';
    }
    keyPressHandler(event){
        if (event.key === 'Enter')
            event.target.blur();
        TaskList.adjustTextAreaHeight(event.target);
    }
    keyUpHandler(event) {
        TaskList.adjustTextAreaHeight(event.target);
    }

    componentDidMount() {
        [...this.textAreaList].map(TaskList.adjustTextAreaHeight);
    }  
    render() {
        this.textAreaList = [];
        const list = this.props.taskOnPage.map((elem, lineNumber) => {
            const leftArea = (
                    <TickBox
                        isClosed={elem.status}
                        toggleBoxOnClick={() => this.props.toggleBoxOnClick(lineNumber, elem.status)}
                    />
            );
            const rightArea = (
                <textarea type="text"
                    onChange={(e) => this.props.inputOnChange(e, lineNumber)}
                    ref={(elem) => {this.textAreaList.push(elem);}}
                    onKeyPress={this.keyPressHandler}
                    onKeyUp={this.keyUpHandler}
                    value={elem.text}/>
            );
            return (
                <li key={lineNumber.toString()}>
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