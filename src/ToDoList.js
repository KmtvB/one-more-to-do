import React, { Component } from 'react';
import Header from './Header';
import TaskList, { includes } from './TaskList';
import { FooterNavBar, Footer, FooterDialog } from './FooterNavBar';
import './css/todolist.css';

const interfaceStateEnum = {
    base: '0', //base interface, nav-bar, clicking on tasks set 'editing' state and allow to change text of selected task
    deleting: '1', //deleting mode, dialog-bar, clicking on tasks set 'pick' them in red color, list of picked, also, 
    editing: '3', //editing mode, dialog-bar, everything else is not function
}

//get task by id
function getLineNumberById(tasksList, id) {
    let lineNumber = null;
    for (let i = 0; i < tasksList.length; i++) {
        if (tasksList[i].id === id)
            lineNumber = i;
    }
    if (lineNumber === null)
        throw Error('lineNumber is null');
    return lineNumber;
}

export class ToDoList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 0,
            interfaceState: {
                state: interfaceStateEnum.base,
                lineNumbers: null,
                additionalInfo: null,
            },
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
                },
                {
                    id: 154565,
                    text: 'Место для вашей рекламы',
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
    textInputOnChange = (event) => {
        const newText = event.target.value,
            page = this.state.page,
            editingText = this.state.interfaceState.lineNumbers;
        let tasks = this.state.toDoTasks;
        tasks[page][editingText].text = newText;
        this.setState({
            toDoTasks: tasks
        });
    }
    titleOnChange = (event) => {
        const newTitle = event.target.value,
            page = this.state.page;
        let titles = this.state.titles;
        titles[page] = newTitle;
        this.setState({
            titles: titles,
        });
    }
    startEditingState(lineNumber) {
        if (this.state.interfaceState.state != interfaceStateEnum.base)
            return;
        const page = this.state.page;
        const tasksOnPage = this.state.toDoTasks[page];
        const newInterfaceState = interfaceStateEnum.editing;
        const previousText = tasksOnPage[lineNumber].text;
        this.setState({
            interfaceState: {
                state: newInterfaceState,
                lineNumbers: lineNumber,
                additionalInfo: previousText,
            }
        });
    }
    
    taskTextClickHandler = (id) => {
        const page = this.state.page;
        const tasksOnPage = this.state.toDoTasks[page];
        this.startEditingState(getLineNumberById(tasksOnPage, id));
    }
    //
    addButtonHandler = () => {
        if (this.state.interfaceState.state !== interfaceStateEnum.base)
            return;
        const page = this.state.page;
        let tasks = this.state.toDoTasks;
        tasks[page].push({
            id: Math.floor(Math.random() * (1000 - 1)) + 1,
            text: '',
            done: false,
        });
        this.setState({toDoTasks: tasks});
        this.startEditingState(tasks[page].length-1);
    }
    deleteButtonHandler = () => { 
        if (this.state.interfaceState.state !== interfaceStateEnum.base)
            return;
        this.setState({
            interfaceState: {
                state: interfaceStateEnum.deleting,
                lineNumbers: [],
                additionalInfo: null,
            }
        });
    }
    tasksDeleteClickHandler = (id) => { 
        const page = this.state.page;
        const tasksOnPage = this.state.toDoTasks[page];
        const lineNumber = getLineNumberById(tasksOnPage, id);
        let selectedLines = this.state.interfaceState.lineNumbers;
        const index = selectedLines.indexOf(lineNumber);
        if (index === -1) {
            selectedLines.push(lineNumber);
        } else {
            selectedLines.splice(index, 1);
        }
        this.setState({
            interfaceState: {
                state: interfaceStateEnum.deleting,
                lineNumbers: selectedLines,
                additionalInfo: null,
            }
        });
    }
    settingsButtonHandler() { }
    yesHandler = () => {
        const appState = this.state.interfaceState.state;
        let page = this.state.page; //current page
        let tasks = this.state.toDoTasks;

        if (appState === interfaceStateEnum.editing) {

        } else if (appState === interfaceStateEnum.deleting) {
            const linesToDelete = this.state.interfaceState.lineNumbers;
            let restLines = [];
            for (let i = 0; i < tasks[page].length; i++) 
                if (linesToDelete.indexOf(i) === -1)
                    restLines.push(tasks[page][i]);

            tasks[page] = restLines;
            if (restLines.length === 0 && tasks.length > 1) { //no more task and there is also page. delete this page
                tasks.splice(page, 1);
                this.state.titles.splice(page, 1);
                page = page > 0 ? page-1 : 0; 
            }
            
        }
        this.setState({
            toDoTasks: tasks,
            page: page,
            interfaceState: {
                state: interfaceStateEnum.base,
                lineNumbers: null,
                additionalInfo: null,
            }
        });
    }
    noHandler = () => {
        const page = this.state.page;
        let tasks = this.state.toDoTasks;

        const appState = this.state.interfaceState.state;
        if (appState === interfaceStateEnum.editing) {
            const lineNumber = this.state.interfaceState.lineNumbers;
            const previousText = this.state.interfaceState.additionalInfo;
            if (previousText === '' && lineNumber === tasks[page].length-1) { //means it's new task, so delete
                tasks[page].pop();
            } else {
                tasks[page][lineNumber].text = previousText;
            }
        } else if (appState === interfaceStateEnum.deleting) {

        }
        this.setState({
            toDoTasks: tasks,
            interfaceState: {
                state: interfaceStateEnum.base,
                lineNumbers: null,
                additionalInfo: null,
            }
        });
    }
    prevNavHandler = () => {
        let newPage = this.state.page;
        if (newPage !== 0)
            newPage--;
        this.setState({ page: newPage });
    }
    nextNavHandler = () => {
        let newPage = this.state.page;
        if (newPage !== this.state.toDoTasks.length-1)
            newPage++;
        this.setState({ page: newPage });
    }
    newPageHandler = () => {
        this.setState({
            titles: this.state.titles.concat(['new page']),
            toDoTasks: this.state.toDoTasks.concat([[
                {
                    id: Math.floor(Math.random() * (1000 - 1)) + 1,
                    text: 'new task',
                    done: false,
                }
            ]]),
            page: ++this.state.page,
        });
    }

    render() {
        const maxPage = this.state.toDoTasks.length,
            isPrev = this.state.page > 0,
            isNextAsNewPage = this.state.page == (maxPage - 1),
            taskOnPage = this.state.toDoTasks[this.state.page];
        const allTaskIsDone = taskOnPage.reduce((prev, curr) => prev && (curr ? curr.done : false), true);


        let numTaskToEdit = null,
            numsTaskToPickAsDeleting = null,
            tasksOnClick = this.taskTextClickHandler; //default value, change only on deleting

        let footer = <FooterDialog //placed here because it should be changed only on base state
            yesOnClick={this.yesHandler}
            noOnClick={this.noHandler}
        />

        const appState = this.state.interfaceState.state;
        if (appState === interfaceStateEnum.base) {
            footer = <FooterNavBar
                isPrevActive={isPrev} prevOnClick={this.prevNavHandler}
                isNextAsNewPage={isNextAsNewPage} nextOnClick={isNextAsNewPage ? this.newPageHandler : this.nextNavHandler}
            />
        } else if (appState === interfaceStateEnum.editing) {
            numTaskToEdit = this.state.interfaceState.lineNumbers;
        } else if (appState === interfaceStateEnum.deleting) {
            numsTaskToPickAsDeleting = this.state.interfaceState.lineNumbers;
            tasksOnClick = this.tasksDeleteClickHandler;
        }

        return (
            <div id="container">
                <Header
                    pageTitle={this.state.titles[this.state.page]} titleOnChange={this.titleOnChange}
                    tickBoxAllTask={allTaskIsDone}
                    tickBoxOnClick={this.tickBoxAllHandler}
                    addOnClick={this.addButtonHandler}
                    delOnClick={this.deleteButtonHandler}
                    setOnClick={this.settingsButtonHandler}
                />
                <TaskList
                    tickBoxOnClick={this.tickBoxHandler}
                    tasks={taskOnPage}
                    tasksOnClick={tasksOnClick}

                    numTaskToEdit={numTaskToEdit} inputOnChange={this.textInputOnChange} onInputEndEvent={this.yesHandler}
                    numsTaskToPickAsDeleting={numsTaskToPickAsDeleting}
                />
                <Footer>
                    {footer}
                </Footer>
            </div>
        );
    }
}

export default ToDoList;