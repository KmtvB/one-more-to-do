import React, { Component } from 'react'
import { InterfaceStateEnum } from '../../constants/Enums'

import { HeaderTitle } from './Headers';
import { FooterDialog } from './Footers';
import { List } from './TaskList'
import { TaskLineText } from './TaskLine'

import './style/todolistview.css'

class DeleteView extends Component {
    constructor(props) {
        super(props)

        this.state = {
            selectedLines: []
        }
    }

    onClickHandler = (lineNumber) => {
        const { selectedLines } = this.state

        const indx = selectedLines.indexOf(lineNumber)
        if (indx === -1)
            this.setState({ selectedLines: [...selectedLines, lineNumber] })
        else
            this.setState({ selectedLines: selectedLines.filter((_, i) => i !== indx) })
    }

    yesHandler = () => {
        const { selectedLines } = this.state
        const { tasks, deletePage, deleteTasks } = this.props

        if (selectedLines.length === tasks.length)
            deletePage()
        else {
            const ids = selectedLines.map(line => tasks[line].id)
            deleteTasks(ids)
        }

        this.props.setInterfaceState(InterfaceStateEnum.taskList.base)
    }
    noHandler = () => {
        this.props.setInterfaceState(InterfaceStateEnum.taskList.base)
    }

    renderList() {
        const list = this.props.tasks.map((elem, index) => (
            <TaskLineText
                textClassName={this.state.selectedLines.indexOf(index) !== -1 ? "to-delete" : ""}
                text={elem.text}
                onClick={() => this.onClickHandler(index)}
            />
        ))
        return <List list={list} />
    }

    render() {
        return (
            <section className="container">
                <HeaderTitle text={'select to delete'} />
                {this.renderList()}
                <FooterDialog
                    yesOnClick={this.yesHandler}
                    noOnClick={this.noHandler}
                />
            </section>
        );
    }
}

export default DeleteView