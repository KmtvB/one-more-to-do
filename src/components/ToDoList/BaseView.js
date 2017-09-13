import React, { Component } from 'react'

import { HeaderTaskList } from './Headers'
import { List } from './TaskList'
import { TaskLineInput } from './TaskLine'
import { FooterNavBar } from './Footers'
import { InterfaceStateEnum } from '../../constants/Enums'

import './style/todolistview.css';

class BaseView extends Component {
    textInputChangeHandler = (value, id) => {
        this.props.editTask(id, value)
    }
    titleChangeHandler = (value) => {
        this.props.editPageTitle(value)
    }

    addButtonHandler = () => {
        this.props.addTask()
    }
    deleteButtonHandler = () => {
        if (this.props.tasks.length === 0)
            this.props.deletePage()
        else
            this.props.setInterfaceState(InterfaceStateEnum.taskList.delete)
    }
    settingsButtonHandler() { }

    renderList() {
        const list = this.props.tasks.map((task, indx) =>
            <TaskLineInput
                task={task}
                toggleBoxOnClick={this.props.toggleBox}
                inputOnChange={this.textInputChangeHandler}
            />
        )
        return <List list={list} />
    }

    render() {
        const { tasks, title, toggleAllBoxOnPage } = this.props
        const { isFirstPage, prevPage, isLastPage, newPage, nextPage } = this.props
        
        const allTaskIsDone = tasks.reduce((prev, curr) => prev && (curr ? curr.status : false), true)
        return (
            <section className="to-do">
                <HeaderTaskList
                    pageTitle={title} titleOnChange={this.titleChangeHandler}
                    toggleBoxAllTask={allTaskIsDone} toggleBoxOnClick={toggleAllBoxOnPage}
                    addButtonOnClick={this.addButtonHandler}
                    deleteButtonOnClick={this.deleteButtonHandler}
                    settingsButtonOnClick={this.settingsButtonHandler}
                />
                {this.renderList()}
                <FooterNavBar
                    isPrevActive={!isFirstPage}
                    prevOnClick={!isFirstPage ? prevPage : null}
                    isNextAsNewPage={isLastPage}
                    nextOnClick={isLastPage ? newPage : nextPage}
                />
            </section>
        );
    }
}

export default BaseView

