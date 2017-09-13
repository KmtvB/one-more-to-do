import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionsTask from '../actions';
import { ToDoListBaseView, ToDoListDeleteView } from '../components/ToDoList';

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(actionsTask, dispatch);
}
/* 
* base view
 */
const mapStateToProps = (state) => {
    //tasks only on current page
    return {
        tasks: state.tasks.filter(task => task.page === state.page.current),
        title: state.titles[state.page.current],
        isFirstPage: state.page.current === 0,
        isLastPage: state.page.current === state.page.maxPage,
    }
}

export const ToDoListBase = connect(
    mapStateToProps,
    mapDispatchToProps
)(ToDoListBaseView);

/* 
* delete view
*/
export const ToDoListDelete = connect(
    (state) => ({ tasks: state.tasks.filter(task => task.page === state.page.current) }),
    mapDispatchToProps
)(ToDoListDeleteView);