import React, { Component } from 'react';

import { Header, HeaderTitle, HeaderTaskList } from '../components/Headers';
import { TaskListViewInput, TaskListViewSelect } from '../components/TaskList';
import { FooterNavBar, Footer, FooterDialog } from './Footers';
import { InterfaceStateEnum } from '../actions/ActionTypes';


class ToDoListView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 0,
        }
    }

    toggleBoxHandler = (lineNumber) => {
        this.props.toggleBox(this.state.page, lineNumber);
    }
    toggleBoxAllHandler = () => {
        this.props.toggleAllBoxOnPage(this.state.page);
    }
    textInputChangeHandler = (event, lineNumber) => {
        this.props.editTask(this.state.page, lineNumber, event.target.value);
    }
    titleChangeHandler = (event) => {
        this.props.editPageTitle(this.state.page, event.target.value);
    }
    addButtonHandler = () => {
        this.props.addTask(this.state.page);
    }
    deleteButtonHandler = () => {
        this.props.setInterfaceState(InterfaceStateEnum.taskList.delete);
    }
    deleteTasks = (linesNumber) => {
        this.props.deleteTasks(this.state.page, linesNumber);
    }
    deletePage = () => {
        this.props.deletePage(this.state.page);
    }
    settingsButtonHandler() { }
    prevPageHandler = () => {
        this.setState({ page: this.state.page > 0 ? this.state.page - 1 : 0 });
    }
    nextPageHandler = () => {
        this.setState({ page: this.state.page + 1 });
    }
    newPageHandler = () => {
        this.props.newPage();
        this.nextPageHandler();
    }
    yesHandler = () => {
        if (this.selectedLinesToDelete.length === this.props.tasks[this.state.page].tasksOnPage.length) {
            this.deletePage();
            this.prevPageHandler();
        } else {
            this.deleteTasks(this.selectedLinesToDelete);
        }
        this.props.setInterfaceState(InterfaceStateEnum.taskList.base);
    }
    noHandler = () => {
        this.props.setInterfaceState(InterfaceStateEnum.taskList.base);
    }

    render() {
        if (this.props.interfaceState === InterfaceStateEnum.taskList.base) {
            const page = this.state.page,
                isPrev = page > 0,
                isNextAsNewPage = page === this.props.tasks.length - 1,
                taskOnPage = this.props.tasks[page].tasksOnPage,
                pageTitle = this.props.tasks[page].title;
            const allTaskIsDone = taskOnPage.reduce((prev, curr) => prev && (curr ? curr.status : false), true);

            return (
                <div id="container">
                    <Header>
                        <HeaderTaskList
                            pageTitle={pageTitle} titleOnChange={this.titleChangeHandler}
                            toggleBoxAllTask={allTaskIsDone} toggleBoxOnClick={this.toggleBoxAllHandler}
                            addButtonOnClick={this.addButtonHandler}
                            deleteButtonOnClick={this.deleteButtonHandler}
                            settingsButtonOnClick={this.settingsButtonHandler}
                        />
                    </Header>
                    <TaskListViewInput
                        tasks={taskOnPage}
                        toggleBoxOnClick={(l) => this.toggleBoxHandler(l)}
                        inputOnChange={this.textInputChangeHandler}
                    />
                    <Footer>
                        <FooterNavBar
                            isPrevActive={isPrev} prevOnClick={isPrev ? this.prevPageHandler : null}
                            isNextAsNewPage={isNextAsNewPage}
                            nextOnClick={isNextAsNewPage ? this.newPageHandler : this.nextPageHandler}
                        />
                    </Footer>
                </div>
            );
        } else if (this.props.interfaceState === InterfaceStateEnum.taskList.delete) {
            const page = this.state.page,
                taskOnPage = this.props.tasks[page].tasksOnPage;
            return (
                <div id="container">
                    <Header>
                        <HeaderTitle text={'select to delete'} />
                    </Header>
                    <TaskListViewSelect
                        tasks={taskOnPage}
                        selectedLineGetter={(lines) => {this.selectedLinesToDelete = lines;}}
                    />
                    <Footer>
                        <FooterDialog
                            yesOnClick={this.yesHandler}
                            noOnClick={this.noHandler}
                        />
                    </Footer>
                </div>
            );
        }
        return null;
    }
}


export default ToDoListView;