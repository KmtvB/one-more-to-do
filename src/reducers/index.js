import { tasks, titles } from './tasks';
import {interfaceState, page } from './interface';
import { InterfaceStateEnum } from '../actions/ActionTypes'

const initState = {
    titles: ['your first page'],
    tasks: [{
            text: 'your first task',
            status: false,
            id: 0,
            page: 0
    }],
    interfaceState: InterfaceStateEnum.taskList.base,
    page: {
        current: 0,
        maxPage: 0
    }
}

const todoApp = (state = initState, action) => {
    const spage = Object.assign({}, state.page);
    return {
        titles: titles(state.titles, { ...action, page: spage.current }),
        tasks: tasks(state.tasks, {...action, page: spage.current }),
        interfaceState: interfaceState(state.interfaceState, action),
        page: page(state.page, action)
    }
}

export default todoApp;