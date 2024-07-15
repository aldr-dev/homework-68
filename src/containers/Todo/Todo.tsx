import React, {useEffect} from 'react';
import './Todo.css';
import {AppDispatch, RootState} from '../../app/store';
import {useDispatch, useSelector} from 'react-redux';
import {getTodo, toggleCheckedTodo} from './todoSlice';
import TodoForm from '../../components/TodoForm/TodoForm';

const Todo = () => {
  const dispatch: AppDispatch = useDispatch();
  const todos = useSelector((state: RootState) => state.todo.todos);
  if (todos !== undefined) {
    console.log(todos);
  }

  useEffect(() => {
    dispatch(getTodo());
  }, [dispatch]);

 const handleCheckedChange = (id: string) => {
   dispatch(toggleCheckedTodo(id));
 };

  return (
    <div>
      <TodoForm/>

      {todos && (
        <>
          {todos.map((todo) => (
            <div key={todo.id}>
              <span>{todo.message}</span>
              <input type="checkbox" checked={todo.completed} onChange={() => handleCheckedChange(todo.id)}/>
              <button type="button">Delete</button>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default Todo;