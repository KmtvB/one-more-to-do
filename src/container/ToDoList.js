import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionsTask from '../actions';
import ToDoListView from '../components/ToDoListView';

const mapStateToProps = (state, ownProps) => {
    return { ...state, ...ownProps };
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(actionsTask, dispatch);
}

const ToDoList = connect(
    mapStateToProps,
    mapDispatchToProps
)(ToDoListView);

export default ToDoList;