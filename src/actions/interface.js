import { SET_INTERFACE, NEXT_PAGE, PREV_PAGE } from './ActionTypes';

export const setInterfaceState = (state) => {
    return {
        type: SET_INTERFACE,
        state
    }  
};

export const nextPage = () => {
    return {
        type: NEXT_PAGE,
    }
}

export const prevPage = () => {
    return {
        type: PREV_PAGE,
    }
}
