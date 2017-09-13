import React, { Component } from 'react'

import { HeaderTaskList } from './Headers'
import { List } from './TaskList'
import { TaskLineInput } from './TaskLine'
import { FooterNavBar } from './Footers'
import { InterfaceStateEnum } from '../../constants/Enums'

import './style/todolistview.css';

class BaseView extends Component {
    toggleBoxAllHandler = () => {
        this.props.toggleAllBoxOnPage()
    }
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
        const allTaskIsDone = this.props.tasks.reduce((prev, curr) => prev && (curr ? curr.status : false), true)

        return (
            <section className="container">
                <HeaderTaskList
                    pageTitle={this.props.title} titleOnChange={this.titleChangeHandler}
                    toggleBoxAllTask={allTaskIsDone} toggleBoxOnClick={this.toggleBoxAllHandler}
                    addButtonOnClick={this.addButtonHandler}
                    deleteButtonOnClick={this.deleteButtonHandler}
                    settingsButtonOnClick={this.settingsButtonHandler}
                />
                {this.renderList()}
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

export default BaseView

