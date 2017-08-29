import { ADD_TASK, DELETE_TASKS, EDIT_TASK, TOGGLE_BOX, TOGGLE_BOXS_PAGE } from '../actions/ActionTypes';
import { EDIT_PAGE_TITLE, NEW_PAGE, DELETE_PAGE } from '../actions/ActionTypes';

const initialState = [{
    title: 'your first page',
    tasksOnPage: [{
        text: 'your first task',
        status: false,
        id: 0
    }]
}]

export default function tasks(state = initialState, action) {
    let newState = [...state];
        if (action.hasOwnProperty('page')) {
        newState[action.page] = editTitle(newState[action.page], action)
        newState[action.page].tasksOnPage = editTaskOnPage(newState[action.page].tasksOnPage, action)
    }
    newState = editPaging(newState, action)
    return newState
}

function editTitle(state, action) {
    switch (action.type) {
        case EDIT_PAGE_TITLE:
            return {
                ...state,
                title: action.text
            }
        default:
            return state;
    }
}

function editPaging(state, action) {
    switch (action.type) {
        case NEW_PAGE:
            return [
                ...state,
                {
                    title: 'new page',
                    tasksOnPage: []
                }
            ]
        case DELETE_PAGE:
            if (state.length === 1)
                return [{
                    title: 'your first page',
                    tasksOnPage: [{
                        text: 'your first task',
                        status: false,
                        id: 0
                    }]
                }]
            else
                return state.filter((_, pageNum) => pageNum !== action.page)
        default:
            return state
    }
}

function editTaskOnPage(state, action) {
    if (!Array.isArray(state))
        throw new Error("WHAT ARE YOU DOING I'M NOT ARRAY - state.")
    switch (action.type) {
        case ADD_TASK:
            return [
                ...state,
                {
                    text: '',
                    status: false,
                    id: state.length,
                }
            ]
        case DELETE_TASKS: {
            return state.filter(
                task => action.ids.indexOf(task.id) === -1
            )
        }
        case EDIT_TASK: {
            return state.map(
                task =>
                    task.id === action.id ? { ...task, text: action.text } : task
            )
        }
        case TOGGLE_BOX: {
            return state.map(
                task =>
                    task.id === action.id ? { ...task, status: !task.status } : task
            )
        }
        case TOGGLE_BOXS_PAGE: {
            const taskAllDone = state.reduce((prev, task) => prev && task.status, true);
            return state.map(
                task =>
                    ({ ...task, status: !taskAllDone })
            )
        }
        default:
            return state
    }
}