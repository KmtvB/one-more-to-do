import { SET_INTERFACE, NEXT_PAGE, PREV_PAGE, NEW_PAGE, DELETE_PAGE } from '../actions/ActionTypes';
import { InterfaceStateEnum } from '../actions/ActionTypes';

const initState = InterfaceStateEnum.taskList.base;

export function interfaceState(state = initState, action) {
    switch (action.type) {
        case SET_INTERFACE:
            return action.state
        default:
            return state;
    }
}

export function page(state, action) {
    switch (action.type) {
        case NEW_PAGE:
            return {
                current: state.maxPage + 1,
                maxPage: state.maxPage + 1,
            }
        case DELETE_PAGE:
            return {
                current: state.current > 0 ? state.current - 1 : 0,
                maxPage: state.maxPage > 0 ? state.maxPage - 1 : 0,
            }
        case PREV_PAGE:
            return {
                ...state,
                current: state.current > 0 ? state.current - 1 : 0,
            }
        case NEXT_PAGE:
            return {
                ...state,
                current: state.current < state.maxPage ? state.current + 1 : state.current
            }
        default:
            return state
    }
}
