import { SET_INTERFACE, NEXT_PAGE, PREV_PAGE } from '../actions/ActionTypes';
import { InterfaceStateEnum } from '../actions/ActionTypes';

const initState = InterfaceStateEnum.taskList.base;

export default function interfaceState(state = initState, action) {
    switch (action.type) {
        case SET_INTERFACE:
            return action.state
        default:
            return state;
    }

}