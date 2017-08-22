import React, { Component } from 'react';
import { Header, HeaderTitle } from './Headers';
import { Footer, FooterDialog } from './Footers';
import { TaskListTipLines } from './TaskList';
import { InterfaceStateEnum } from './App';

export class DeleteTasks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedLines: [],
        }
    }
    taskOnClick = (lineNumber) => {
        const indx = this.state.selectedLines.indexOf(lineNumber);
        let yetSelectedLines = this.state.selectedLines;
        if (indx === -1)
            yetSelectedLines.push(lineNumber)
        else
            yetSelectedLines.splice(indx, 1);
        this.setState({
            selectedLines: yetSelectedLines,
        });

    }
    yesHandler = () => {
        this.props.deleteTasks(this.state.selectedLines);
        this.props.setInterfaceState(InterfaceStateEnum.taskList.base)
    }
    noHandler = () => {
        this.props.setInterfaceState(InterfaceStateEnum.taskList.base)
    }

    render() {
        return (
            <div id="container">
                <Header>
                    <HeaderTitle text="Select to delete" />
                </Header>
                <TaskListTipLines
                    taskOnPage={this.props.taskOnPage}
                    taskOnClick={this.taskOnClick}
                    selectedLines={this.state.selectedLines}
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
}

export default DeleteTasks;