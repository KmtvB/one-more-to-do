import { ADD_TASK, DELETE_TASKS, EDIT_TASK, TOGGLE_BOX, TOGGLE_BOXS_PAGE } from './ActionTypes';
import { NEW_PAGE, DELETE_PAGE, EDIT_PAGE_TITLE } from './ActionTypes'

/*
** Tasks
*/
let lastId = 1
export const addTask = () => {
    return {
        type: ADD_TASK,
        id: lastId++,
    }
}

export const deleteTasks = (ids) => {
    return {
        type: DELETE_TASKS,
        ids
    }
}

export const editTask = (id, text) => {
    return {
        type: EDIT_TASK,
        id,
        text
    }
}

/*
** Status
*/
export const toggleBox = (id) => {
    return {
        type: TOGGLE_BOX,
        id
    }
}

export const toggleAllBoxOnPage = () => {
    return {
        type: TOGGLE_BOXS_PAGE,
    }
}


/*
** Page
*/
export const newPage = () => {
    return {
        type: NEW_PAGE,
    }
}

export const deletePage = () => {
    return {
        type: DELETE_PAGE,
    }
}

/*
** Title
*/
export const editPageTitle = (text) => {
    return {
        type: EDIT_PAGE_TITLE,
        text
    }
};
