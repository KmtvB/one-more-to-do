import React, { Component } from 'react';
import Line from './Line.js';
import TickBox from './TickBox';

export class TaskList extends Component {
    render() {
        const list = this.props.tasks.map(elem => {
            const leftArea = (
                <TickBox isClosed={elem.done} />
            );
            const rightArea = (
                <span className>{elem.text}</span>
            );

            return (
                <li key={elem.id}>
                    <Line
                        left={leftArea}
                        right={rightArea}
                    />
                </li>
            );
        })
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