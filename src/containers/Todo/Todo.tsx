import React, {useEffect} from 'react';
import './Todo.css';
import {AppDispatch} from '../../app/store';
import {useDispatch, useSelector} from 'react-redux';
import {getTodo} from './todoSlice';
import TodoForm from '../../components/TodoForm/TodoForm';

const Todo = () => {
  const dispatch: AppDispatch = useDispatch();
  const todos = useSelector((state) => state.todo.todos);
  if (todos !== undefined) {
    console.log(todos);
  }

  useEffect(() => {
    dispatch(getTodo());
  }, [dispatch]);

  return (
    <div>
      <TodoForm/>

      {todos && (
        <>
          {todos.map((todo) => (
            <div key={todo.id}>
              <span>{todo.message}</span>
              <input type="checkbox" checked={todo.completed}/>
              <button type="button">Delete</button>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default Todo;