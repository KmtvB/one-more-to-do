import React, { Component } from 'react';
import { Header, HeaderTaskList } from './Headers';
import { TaskList } from './TaskList';
import DeleteTasks from './DeleteTasks';
import { FooterNavBar, Footer } from './Footers';
import { InterfaceStateEnum } from './App';
import update from 'immutability-helper';


class ToDoList extends Component {
    constructor(props) {
        super(props);
        const lcstr = localStorage.getItem('tasksPages');
        const tasksPages = lcstr === null ? [{ title: 'your first page', tasks: [] }] : JSON.parse(lcstr);
        this.state = {
            page: 0,
            tasksPages: tasksPages /*[
                {
                    title: 'first',
                    tasks: [
                        {
                            text: 'Play soccer with friends',
                            status: false,
                        },
                        {
                            text: 'Open Photoshop',
                            status: true,
                        },
                        {
                            text: 'Finish client word',
                            status: false,
                        },
                        {
                            text: 'Give away some PSD',
                            status: true,
                        },
                        {
                            text: 'Post a new shot to Dribbble',
                            status: false,
                        },
                        {
                            text: 'Место для вашей рекламы',
                            status: false,
                        }
                    ]
                },
                {
                    title: 'second',
                    tasks: [
                        {
                            text: 'publish on github',
                            status: false,
                        }
                    ]
                }],*/
        }
    }

    componentDidUpdate = (prevProps, prevState) => {
        localStorage.setItem('tasksPages', JSON.stringify(prevState.tasksPages));
    }

    toggleBoxHandler = (lineNumber, currentStatus) => {
        this.setState({
            tasksPages: update(this.state.tasksPages, { [this.state.page]: { tasks: { [lineNumber]: { status: { $set: !currentStatus } } } } })
        });
    }
    toggleBoxAllHandler = () => {
        const allTaskIsDone = this.state.tasksPages[this.state.page].tasks.reduce((prev, curr) => prev && curr.status, true); //on current page
        this.setState({
            tasksPages: update(this.state.tasksPages, {
                [this.state.page]: {
                    tasks:
                    {
                        $apply:
                        (tasks) => tasks.map(
                            elem => Object.assign(elem, { status: !allTaskIsDone }))
                    }
                }
            })
        });
    }
    textInputOnChange = (event, lineNumber) => {
        const newText = event.target.value;
        if (newText === '') {
            this.deleteTasks([lineNumber]);
        } else {
            this.setState({
                tasksPages: update(this.state.tasksPages, { [this.state.page]: { tasks: { [lineNumber]: { text: { $set: newText } } } } })
            });
        }
    }
    titleOnChange = (event) => {
        const newTitle = event.target.value;
        this.setState({
            tasksPages: update(this.state.tasksPages, { [this.state.page]: { title: { $set: newTitle } } })
        });
    }

    //
    addButtonHandler = () => {
        const newTask = { text: '', status: false };
        this.setState({
            tasksPages: update(this.state.tasksPages, { [this.state.page]: { tasks: { $push: [newTask] } } })
        });
    }
    deleteButtonHandler = () => {
        this.props.setInterfaceState(InterfaceStateEnum.taskList.delete);
    }
    deleteTasks = (linesNumber) => {
        const page = this.state.page;
        let tasksNow = this.state.tasksPages[page].tasks;
        let restLines = [];
        for (let i = 0; i < tasksNow.length; i++)
            if (linesNumber.indexOf(i) === -1)
                restLines.push(tasksNow[i]);
        if (restLines.length === 0)
            this.deletePage(this.state.page);
        else {
            this.setState({
                tasksPages: update(this.state.tasksPages, { [this.state.page]: { tasks: { $set: restLines } } })
            });
        }
    }
    deletePage = () => {
        let tasksPages = [...this.state.tasksPages],
            page = this.state.page;
        tasksPages.splice(page, 1);
        if (tasksPages.length !== 0) {
            this.setState({
                tasksPages: tasksPages,
                page: page > 0 ? page - 1 : 0,
            });
        } else {
            this.setState({
                tasksPages: [
                    { title: 'your first page', tasks: [] }
                ],
                page: 0
            });
        }
    }
    settingsButtonHandler() { }
    prevPage = () => {
        this.setState({ page: --this.state.page });
    }
    nextPage = () => {
        this.setState({ page: ++this.state.page });
    }
    newPageHandler = () => {
        this.setState({
            tasksPages: update(this.state.tasksPages, { $push: [{ title: 'new page', tasks: [] }] }),
            page: this.state.page + 1,
        });
    }

    render() {
        if (this.props.interfaceState === InterfaceStateEnum.taskList.base) {
            const page = this.state.page,
                isPrev = page > 0,
                isNextAsNewPage = page === this.state.tasksPages.length - 1,
                taskOnPage = this.state.tasksPages[page].tasks;
            const allTaskIsDone = taskOnPage.reduce((prev, curr) => prev && (curr ? curr.status : false), true);

            return (
                <div id="container">
                    <Header>
                        <HeaderTaskList
                            pageTitle={this.state.tasksPages[page].title} titleOnChange={this.titleOnChange}
                            toggleBoxAllTask={allTaskIsDone} toggleBoxOnClick={this.toggleBoxAllHandler}
                            addOnClick={this.addButtonHandler}
                            delOnClick={this.deleteButtonHandler}
                            setOnClick={this.settingsButtonHandler}
                        />
                    </Header>
                    <TaskList
                        toggleBoxOnClick={this.toggleBoxHandler}
                        taskOnPage={taskOnPage}
                        inputOnChange={this.textInputOnChange}
                    />
                    <Footer>
                        <FooterNavBar
                            isPrevActive={isPrev} prevOnClick={this.prevPage}
                            isNextAsNewPage={isNextAsNewPage} nextOnClick={isNextAsNewPage ? this.newPageHandler : this.nextPage}
                        />
                    </Footer>
                </div>
            );
        } else if (this.props.interfaceState === InterfaceStateEnum.taskList.delete) {
            const taskOnPage = this.state.tasksPages[this.state.page].tasks;
            return (
                <DeleteTasks
                    taskOnPage={taskOnPage}
                    deleteTasks={this.deleteTasks}
                    setInterfaceState={this.props.setInterfaceState}
                />
            );
        }
        return null;
    }
}


export default ToDoList;