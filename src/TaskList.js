import React, { Component } from 'react';
import Line from './Line.js';
import TickBox from './TickBox';
import './css/tasklist.css';

function includes(array, elem) {
    for (var i = 0; i < array.length; i++)
        if (array[i] === elem)
            return true;
    return false;
}

export class TaskList extends Component {
    keyPressHandler = (event) => {
        if (event.key === 'Enter')
            this.props.onInputEndEvent();
    }

    makeList() {
        let list = [];
        for (let i = 0; i < this.props.tasks.length; i++) {
            const elem = this.props.tasks[i];
            const leftArea = (
                <TickBox 
                    isClosed={elem.done} 
                    tickBoxOnClick={() => this.props.tickBoxOnClick(elem.id)}
                />
            );
            
            let rightArea = null;
            if (this.props.numTaskToEdit === i) {
                rightArea = <input type="text" value={elem.text} onChange={this.props.inputOnChange} autoFocus onKeyPress={this.keyPressHandler}></input>
            } else if (this.props.numsTaskToPickAsDeleting && includes(this.props.numsTaskToPickAsDeleting, i)) {
                rightArea = <div className="task-text to-delete" onClick={() => this.props.tasksOnClick(elem.id)}>{elem.text}</div>;
            } else { //standart
                rightArea = <div className="task-text" onClick={() => this.props.tasksOnClick(elem.id)}>{elem.text}</div>;
            }

            list.push(
                <li key={elem.id}>
                    <Line
                        left={leftArea}
                        right={rightArea}
                    />
                </li>
            );
        }
        return list;
    }

    render() {
        const list = this.makeList();
        return (
            <div className="list">
                <ul>
                    {list}
                </ul>
            </div>
        );
    }
}

export default TaskList;
export { includes }