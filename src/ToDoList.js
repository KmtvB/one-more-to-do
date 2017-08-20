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
            titles: ['first', 'second'],
            toDoTasks: [
                [{
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
                }],
                [{
                    id: 16789,
                    text: 'publish on github',
                    done: false,
                }]
            ]
        }
    }

    tickBoxHandler = (id) => {
        let tasks = this.state.toDoTasks;
        const page = this.state.page; //current page
        for (let i = 0; i < tasks[page].length; i++) {
            if (tasks[page][i].id === id)
                tasks[page][i].done = !tasks[page][i].done;
        }
        this.setState({
            toDoTasks: tasks
        });
    }
    tickBoxAllHandler = () => {
        let tasks = this.state.toDoTasks;
        const page = this.state.page; //current page
        const allTaskIsDone = tasks[page].reduce((prev, curr) => prev && curr.done, true);
        //if all task is done, then we need tick them as undone, so we use inverted allTaskIsDone
        tasks[page] = tasks[page].map(elem => Object.assign(elem, { done: !allTaskIsDone })) 
        this.setState({
            toDoTasks: tasks  
        });
    }
    addButtonHandler = () => {

     }
    deleteButtonHandler() { }
    settingsButtonHandler() { }
    prevHandler = () => {
        let newPage = this.state.page;
        if (newPage !== 0)
            newPage--;
        this.setState({ page: newPage });
    }
    nextHandler = () => {
        console.log('123');
        let newPage = this.state.page;
        if (newPage !== this.state.toDoTasks.length)
            newPage++;
        this.setState({ page: newPage });
    }

    render() {
        const maxPage = this.state.toDoTasks.length,
            isPrev = this.state.page > 0,
            isNext = this.state.page < maxPage,
            taskOnPage = this.state.toDoTasks[this.state.page];
        const allTaskIsDone = taskOnPage.reduce((prev, curr) => prev && curr.done, true);

        return (
            <div id="container">
                <Header
                    pageTitle={this.state.titles[this.state.page]}
                    tickBoxAllTask={allTaskIsDone}
                    tickBoxOnClick={this.tickBoxAllHandler}
                    addOnClick={this.addButtonHandler}
                    delOnClick={this.deleteButtonHandler}
                    setOnClick={this.settingsButtonHandler}
                />
                <TaskList
                    tickBoxOnClick={this.tickBoxHandler}
                    tasks={taskOnPage}
                />
                <FooterNavBar
                    isPrevActive={isPrev} prevOnClick={this.prevHandler}
                    isNextActive={isNext} nextOnClick={this.nextHandler}
                />
            </div>
        );
    }
}

export default ToDoList;