import { ADD_TASK, DELETE_TASKS, EDIT_TASK, TOGGLE_BOX, TOGGLE_BOXS_PAGE } from './ActionTypes';
import { NEW_PAGE, DELETE_PAGE, EDIT_PAGE_TITLE } from './ActionTypes'

/*
** Tasks
*/
export const addTask = (page) => {
    return {
        type: ADD_TASK, 
        page
    }
}

export const deleteTasks = (page, ids) => {
    return {
        type: DELETE_TASKS,
        page,
        ids
    }
}

export const editTask = (page, id, text) => {
    return {
        type: EDIT_TASK,
        page,
        id,
        text
    }
}

/*
** Status
*/
export const toggleBox = (page, id) => {
    return {
        type: TOGGLE_BOX,
        page, 
        id
    }
}

export const toggleAllBoxOnPage = (page) => {
    return {
        type: TOGGLE_BOXS_PAGE,
        page
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

export const deletePage = (page) => {
    return {
        type: DELETE_PAGE,
        page
    }
}

export const editPageTitle = (page, text) => {
    return {
        type: EDIT_PAGE_TITLE,
        page,
        text
    }
};
