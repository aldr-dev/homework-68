import React from 'react';
import {mutationApiTodo} from '../../types';
import {deleteTodo, getTodo, toggleCheckedTodo} from '../../containers/Todo/todoSlice';
import {AppDispatch, RootState} from '../../app/store';
import {useDispatch, useSelector} from 'react-redux';
import './TodoItem.css';

interface Props {
  todo: mutationApiTodo;
}

const TodoItem: React.FC<Props> = ({todo}) => {
  const dispatch: AppDispatch = useDispatch();
  const isLoader = useSelector((state: RootState) => state.todo.isLoading);

  const handleToggleCheckedTodo = async (id: string, title: string, completed: boolean) => {
   await dispatch(toggleCheckedTodo({id, title, completed}));
   await dispatch(getTodo());
  };
  const handleDeleteTodo = async (id: string) => {
    const isConfirm = confirm('Вы действительно хотите удалить данную задачу?');
    if (isConfirm) {
     await dispatch(deleteTodo(id));
     await dispatch(getTodo());
    }
  };


  return (
    <div className="todo-item">
      <div className="todo-item-inner">
        <p content="todo-item-title">{todo.title}</p>
        <div className="todo-item-btn-inner">
          <input
            id={todo.id}
            className="todo-item-checkbox"
            type="checkbox"
            checked={todo.completed}
            onChange={() => handleToggleCheckedTodo(todo.id, todo.title, todo.completed)}/>
          <label className="todo-item-custom-checked" htmlFor={todo.id}></label>
          <button className="todo-item-btn" disabled={isLoader} onClick={() => handleDeleteTodo(todo.id)} type="button">
            <div className={isLoader ? 'spinner' : ''}>
              {isLoader ? '' : 'Delete'}
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;