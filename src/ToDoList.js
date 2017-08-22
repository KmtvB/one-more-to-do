import React, { Component } from 'react';
import { Header, HeaderTaskList, HeaderTitle } from './Headers';
import { TaskList } from './TaskList';
import DeleteTasks  from './DeleteTasks';
import { FooterNavBar, Footer, FooterDialog } from './Footers';
import { InterfaceStateEnum } from './App';


class ToDoList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 0,
            titles: ['first', 'second'],
            tasksPages: [
                [
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
                        id: 154565,
                        text: 'Место для вашей рекламы',
                        done: false,
                    }
                ],
                [
                    {
                        id: 16789,
                        text: 'publish on github',
                        done: false,
                    }
                ]],
        }
    }

    toggleBoxHandler = (lineNumber, currentStatus) => {
        let tasksPages = this.state.tasksPages;
        tasksPages[this.state.page][lineNumber].done = !currentStatus;
        this.setState({
            tasksPages: tasksPages,
        });
    }
    toggleBoxAllHandler = () => {
        let tasksPages = this.state.tasksPages;
        const allTaskIsDone = this.state.tasksPages[this.state.page].reduce((prev, curr) => prev && curr.done, true); //on current page
        //if all task is done, then we need tick them as undone, so we use inverted allTaskIsDone
        for (let i = 0; i < tasksPages[this.state.page].length; i++)
            tasksPages[this.state.page][i].done = !allTaskIsDone;
        this.setState({
            tasksPages: tasksPages,
        });
    }
    textInputOnChange = (event, lineNumber) => {
        let tasksPages = this.state.tasksPages;
        tasksPages[this.state.page][lineNumber].text = event.target.value;
        this.setState({
            tasksPages: tasksPages,
        });
    }
    titleOnChange = (event) => {
        this.setState({
            titles: this.state.titles.map((title, index) => index === this.state.page ? event.target.value : title),
        });
    }

    //
    addButtonHandler = () => {
        let tasksPages = this.state.tasksPages;
        tasksPages[this.state.page].push({ id: Math.floor(Math.random() * (1000 - 1)) + 1, text: '', done: false });
        this.setState({
            tasksPages: tasksPages,
        });
    }
    deleteButtonHandler = () => {
        this.props.setInterfaceState(InterfaceStateEnum.taskList.delete);
    }
    deleteTasks = (linesNumber) => {
        let tasksPages = this.state.tasksPages;
        let restLines = [];
        for (let i = 0; i < tasksPages[this.state.page].length; i++)
            if (linesNumber.indexOf(i) === -1)
                restLines.push(tasksPages[this.state.page][i]);
        if (restLines.length === 0)
            this.deletePage(this.state.page);
        else {
            tasksPages[this.state.page] = restLines;
            this.setState({
                tasksPages: tasksPages,
            });
        }
    }
    deletePage = () => {
        let tasksPages = this.state.tasksPages,
            titles = this.state.titles,
            page = this.state.page;
        titles.splice(page, 1);
        tasksPages.splice(page, 1);
        if (tasksPages.length !== 0) {
            this.setState({
                titles: titles,
                tasksPages: tasksPages,
                page: page > 0 ? --page : 0,
            });
        } else {
            this.setState({
                titles: ['your first page'],
                tasksPages: [[]],
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
        const newTitle = 'new page';
        const newTasks = [];
        this.setState({
            titles: this.state.titles.concat([newTitle]),
            tasksPages: this.state.tasksPages.concat([newTasks]),
            page: ++this.state.page,
        });
    }

    render() {
        if (this.props.interfaceState === InterfaceStateEnum.taskList.base) {
            const isPrev = this.state.page > 0,
                isNextAsNewPage = this.state.page === this.state.tasksPages.length - 1,
                taskOnPage = this.state.tasksPages[this.state.page];
            const allTaskIsDone = taskOnPage.reduce((prev, curr) => prev && (curr ? curr.done : false), true);
            //if some input in focus...

            return (
                <div id="container">
                    <Header>
                        <HeaderTaskList
                            pageTitle={this.state.titles[this.state.page]} titleOnChange={this.titleOnChange}
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
            const taskOnPage = this.state.tasksPages[this.state.page];
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