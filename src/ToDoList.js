import React, { Component } from 'react';
import Header from './Header';
import TaskList from './TaskList';
import FooterNavBar from './FooterNavBar';
import './css/todolist.css';


export class ToDoList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 0,
            toDoTasks: [
                {
                    id: 1451,
                    text: 'Play soccer with friends', 
                    done: false,
                },
                {
                    id: 2562,
                    text: 'Open Photoshop',
                    done: true,
                },
                {
                    id: 3645,
                    text: 'Finish client word',
                    done: false,
                },
                {
                    id: 479,
                    text: 'Give away some PSD',
                    done: true,
                },
                {
                    id: 557,
                    text: 'Post a new shot to Dribbble',
                    done: false,
                },
                {
                    id: 16789,
                    text: 'publish on github',
                    done: false,
                }
            ]
        }
    }

    render() {
        const isPrev = false,
              isNext = true;
        const taskToShow = this.state.toDoTasks.slice(this.state.page*5, (this.state.page+1)*5);
        const allTaskIsDone = this.props.toDoTasks.reduce((prev, curr) => prev && curr , true);
        
        return (
            <div id="container">
                <Header 
                    tickBoxAllTask={allTaskIsDone}
                    tickBoxHandler={this.tickBoxHandler}
                    addOnClick={this.addButtonHandler}
                    delOnClick={this.deleteButtonHandler}
                    setOnClick={this.settingsButtonHandler}
                />
                <TaskList
                    tickBoxHandler={this.tickBoxHandler}
                    tasks={taskToShow}
                />
                <FooterNavBar 
                    isPrev={isPrev} prevOnClick={this.prevHandler}
                    isNext={isNext} nextOnClick={this.nextHandler}
                />
            </div>
        );
    }
}

export default ToDoList;