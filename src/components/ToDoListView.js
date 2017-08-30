import React, { Component } from 'react';

import { HeaderTitle, HeaderTaskList } from '../components/Headers';
import { TaskListViewInput, TaskListViewSelect } from '../components/TaskList';
import { FooterNavBar, FooterDialog } from './Footers';
import { InterfaceStateEnum } from '../actions/ActionTypes';

import './css/todolist.css';


export class ToDoListViewBase extends Component {
    toggleBoxHandler = (id) => {
        this.props.toggleBox(id);
    }
    toggleBoxAllHandler = () => {
        this.props.toggleAllBoxOnPage();
    }
    textInputChangeHandler = (event, id) => {
        this.props.editTask(id, event.target.value);
    }
    titleChangeHandler = (event) => {
        this.props.editPageTitle(event.target.value);
    }

    addButtonHandler = () => {
        this.props.addTask();
    }
    deleteButtonHandler = () => {
        if (this.props.tasks.length === 0)
            this.props.deletePage();
        else
            this.props.setInterfaceState(InterfaceStateEnum.taskList.delete);
    }
    settingsButtonHandler() { }

    render() {
        const allTaskIsDone = this.props.tasks.reduce((prev, curr) => prev && (curr ? curr.status : false), true);

        return (
            <section id="container">
                <HeaderTaskList
                    pageTitle={this.props.title} titleOnChange={this.titleChangeHandler}
                    toggleBoxAllTask={allTaskIsDone} toggleBoxOnClick={this.toggleBoxAllHandler}
                    addButtonOnClick={this.addButtonHandler}
                    deleteButtonOnClick={this.deleteButtonHandler}
                    settingsButtonOnClick={this.settingsButtonHandler}
                />
                <TaskListViewInput
                    tasks={this.props.tasks}
                    toggleBoxOnClick={this.toggleBoxHandler}
                    inputOnChange={this.textInputChangeHandler}
                />
                <FooterNavBar
                    isPrevActive={!this.props.isFirstPage}
                    prevOnClick={!this.props.isFirstPage ? this.props.prevPage : null}
                    isNextAsNewPage={this.props.isLastPage}
                    nextOnClick={this.props.isLastPage ? this.props.newPage : this.props.nextPage}
                />
            </section>
        );
    }
}

export class ToDoListViewDelete extends Component {
    deleteTasks = (lines) => {
        const ids = lines.map(line => this.props.tasks[line].id);
        this.props.deleteTasks(ids);
    }
    yesHandler = () => {
        if (this.selectedLinesToDelete.length === this.props.tasks.length)
            this.props.deletePage();
        else
            this.deleteTasks(this.selectedLinesToDelete);
        this.props.setInterfaceState(InterfaceStateEnum.taskList.base);
    }
    noHandler = () => {
        this.props.setInterfaceState(InterfaceStateEnum.taskList.base);
    }

    render() {
        return (
            <section id="container">
                <HeaderTitle text={'select to delete'} />
                <TaskListViewSelect
                    tasks={this.props.tasks}
                    selectedLineGetter={(lines) => { this.selectedLinesToDelete = lines; }}
                />
                <FooterDialog
                    yesOnClick={this.yesHandler}
                    noOnClick={this.noHandler}
                />
            </section>
        );
    }
}
