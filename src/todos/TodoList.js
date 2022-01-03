import React, { useEffect } from "react";
import { connect } from "react-redux";
import TodoListItem from "./TodoListItem";
import NewTodoFrom from "./NewTodoForm";
import {
  loadTodos,
  removeTodoRequest,
  markTodoAsCompletedRequest,
} from "./thunks";
import {
  getTodos,
  getTodosLoading,
  getCompletedTodos,
  getIncompleteTodos,
} from "./selectors";
import "./TodoList.css";

const TodoList = ({
  isLoading,
  completedTodos,
  incompleteTodos,
  startLoadingTodos,
  onRemovePressed,
  onCompletedPressed,
}) => {
  useEffect(() => {
    startLoadingTodos();
  }, []);

  const loadingMessage = <div>Loading todos...</div>;

  const contenet = (
    <div className="list-wrapper">
      <NewTodoFrom />
      <h3>Incomplete:</h3>
      {incompleteTodos.map((todo) => (
        <TodoListItem
          todo={todo}
          onCompletedPressed={onCompletedPressed}
          onRemovePressed={onRemovePressed}
        />
      ))}
      <h3>Completed:</h3>
      {completedTodos.map((todo) => (
        <TodoListItem
          todo={todo}
          onCompletedPressed={onCompletedPressed}
          onRemovePressed={onRemovePressed}
        />
      ))}
    </div>
  );

  return isLoading ? loadingMessage : contenet;
};
const mapStateToProps = (state) => ({
  isLoading: getTodosLoading(state),
  completedTodos: getCompletedTodos(state),
  incompleteTodos: getIncompleteTodos(state),
  // todos: getTodos(state),
});

const mapDispatchToProps = (dispatch) => ({
  startLoadingTodos: () => dispatch(loadTodos()),
  onRemovePressed: (id) => dispatch(removeTodoRequest(id)),
  onCompletedPressed: (id) => dispatch(markTodoAsCompletedRequest(id)),
});
export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
