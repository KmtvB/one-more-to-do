import { ADD_TASK, DELETE_TASKS, EDIT_TASK, TOGGLE_BOX, TOGGLE_BOXS_PAGE } from '../constants/ActionTypes';
import { EDIT_PAGE_TITLE, DELETE_PAGE, NEW_PAGE } from '../constants/ActionTypes';
/* 
page -> page.current
 */
export function titles(state, action) {
    switch (action.type) {
        case EDIT_PAGE_TITLE:
            return state.map(
                (text, indx) =>
                    indx === action.page ? action.text : text
            )
        /*
        ** Page
        */
        case NEW_PAGE: 
            return state.concat(['new page'])
        case DELETE_PAGE:
            const newState = state.filter(
                (_, indx) => indx !== action.page
            )
            if (newState.length === 0) 
                return ['first page']
            else
                return newState
        default:
            return state;
    }
}

export function tasks(state, action) {
    if (!Array.isArray(state))
        throw new Error("WHAT ARE YOU DOING I'M NOT ARRAY - state.")
    switch (action.type) {
        case ADD_TASK:
            return [
                ...state,
                {
                    text: '',
                    status: false,
                    id: action.id,
                    page: action.page,
                }
            ]
        case DELETE_TASKS:
            return state.filter(
                task => action.ids.indexOf(task.id) === -1
            )
        case EDIT_TASK:
            return state.map(
                task =>
                    task.id === action.id ? { ...task, text: action.text } : task
            )
        case TOGGLE_BOX:
            return state.map(
                task =>
                    task.id === action.id ? { ...task, status: !task.status } : task
            )
        case TOGGLE_BOXS_PAGE: {
            const taskAllDone =
                state
                    .filter(task => task.page === action.page)
                    .reduce((prev, task) => prev && task.status, true);
            return state.map(
                task =>
                    task.page === action.page ? ({ ...task, status: !taskAllDone }) : task
            )
        }
        /*
        ** Page
        */
        case DELETE_PAGE: {
            return state
                .filter(
                    task => task.page !== action.page
                )
                .map(
                    task =>
                        task.page > action.page ? ({ ...task, page: task.page - 1 }) : task
                )
            /* if (newState.length !== 0)
                return newState
            else 
                return [{
                    text: 'your first task',
                    status: false,
                    id: 0,
                    page: 0
                }] */
        }
        default:
            return state
    }
}