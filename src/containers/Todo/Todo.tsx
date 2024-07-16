import React, {useEffect} from 'react';
import {AppDispatch, RootState} from '../../app/store';
import {useDispatch, useSelector} from 'react-redux';
import {getTodo} from './todoSlice';
import TodoForm from '../../components/TodoForm/TodoForm';
import TodoItem from '../../components/TodoItem/TodoItem';
import './Todo.css';
import Preloader from '../../components/Preloader/Preloader';

const Todo = () => {
  const dispatch = useDispatch<AppDispatch>();
  const todos = useSelector((state: RootState) => state.todo.todos);
  const isLoader = useSelector((state: RootState) => state.todo.isLoading);

  useEffect(() => {
    dispatch(getTodo());
  }, [dispatch]);

  return (
    <>
      <Preloader preloader={isLoader} />
      <div className="container">
        <h1 className="title-app">ToDo List</h1>
        <TodoForm/>
        <div className={todos.length > 0 ? 'container-todo-item' : ''}>
          {todos && (
            <>
              {todos.map((todo) => (
                <TodoItem key={todo.id} todo={todo}/>
              ))}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Todo;