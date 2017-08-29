import React, { Component } from 'react';
import { LineTwoArea } from './Line.js';
import { TaskTextArea } from './Inputs';
import { TickBox } from './TickBox';
import './css/tasklist.css';

const List = ({ children }) => {
    return (
        <div className="list">
            <ul>
                {children}
            </ul>
        </div>
    );
}

/* 
* for base view
*/  
export const TaskListViewInput = ({ tasks, toggleBoxOnClick, inputOnChange }) => {
    return (
        <List>
            {tasks.map((task, indx) =>
                <li key={task.id}>
                    <LineTwoArea>
                        {<TickBox id={task.id} onClick={toggleBoxOnClick} isDone={task.status} />}
                        {<TaskTextArea id={task.id} text={task.text} inputOnChange={inputOnChange} />}
                    </LineTwoArea>
                </li>
            )}
        </List>
    );
}
/* 
* for delete view
*/    
const TextLine = ({ text }) => {
    return (
        <LineTwoArea>
            {<div className="left-empty"></div>}
            {<span className="task-text">{text}</span>}
        </LineTwoArea>
    );
}

class SelectListView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedLines: []
        }
    }
    onClickHandler = (lineNumber) => {
        const indx = this.state.selectedLines.indexOf(lineNumber);
        if (indx === -1)
            this.setState({ selectedLines: [...this.state.selectedLines, lineNumber] });
        else
            this.setState({ selectedLines: this.state.selectedLines.filter((_, i) => i !== indx) });
        
    }
    componentDidUpdate() {
        if (this.props.hasOwnProperty('selectedLineGetter')) 
            this.props.selectedLineGetter(this.state.selectedLines);
    }
    
    render() {
        return (
            <List>
                {this.props.list.map((elem, index) =>
                    <li
                        key={index}
                        onClick={() => this.onClickHandler(index)} data-lineNumber={index}
                        className={(this.state.selectedLines.indexOf(index) !== -1 ? this.props.classSelected : this.props.classUnSelected)}
                    >
                        {elem}
                    </li>
                )}
            </List>
        );
    }
}

export const TaskListViewSelect = ({ tasks, selectedLineGetter }) => {
    return (
        <SelectListView
            classUnSelected={""}
            classSelected={"to-delete"}
            list={tasks.map(elem => <TextLine text={elem.text} />)}
            selectedLineGetter={selectedLineGetter}
        />
    );
}