import React, { Component } from 'react';
import ToDoList from './ToDoList';

export const InterfaceStateEnum = {
  settings: 'settings',
  taskList: {
    base: 'taskList-browse',
    delete: 'taskList-delete',
  },
  pageList: 'pageList',
  login: 'login',
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      interfaceState: InterfaceStateEnum.taskList.base,
    }
  }

  setInterfaceState = (newState) => {
    this.setState({
      interfaceState: newState,
    });
  }

  render() {
    return <ToDoList
      interfaceState={this.state.interfaceState}
      setInterfaceState={this.setInterfaceState}
    />
  }
}

export default App;
