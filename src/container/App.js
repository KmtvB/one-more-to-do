import React, { Component } from 'react';
import { connect } from 'react-redux'
import { ToDoListBase, ToDoListDelete } from './ToDoList';
import { InterfaceStateEnum } from '../constants/Enums';

class AppView extends Component {
  render() {
    if (this.props.interfaceState === InterfaceStateEnum.taskList.base)
      return <ToDoListBase />
    else if (this.props.interfaceState === InterfaceStateEnum.taskList.delete)
      return <ToDoListDelete />
  }
}

const App = connect(
  (state) => ({ interfaceState: state.interfaceState }),
  null
)(AppView)

export default App;
