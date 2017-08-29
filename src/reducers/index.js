import tasks from './tasks';
import interfaceState from './interface';
import { combineReducers } from 'redux';

/*treeExpample = {
    tasks: [{
        title: 'your first page',
        tasksOnPage: [{
            text: 'your first task',
            status: false
        }]
    }],
    interfaceState: InterfaceState.TASKLIST.BASE,
} */

const todoApp = combineReducers({
    interfaceState,
    tasks
});

export default todoApp;