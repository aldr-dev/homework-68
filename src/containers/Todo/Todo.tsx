import React, {useEffect} from 'react';
import './Todo.css';
import {AppDispatch} from '../../app/store';
import {useDispatch} from 'react-redux';
import {getTodo} from './todoSlice';

const Todo = () => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(getTodo());
  }, [dispatch]);

  return (
    <div>

    </div>
  );
};

export default Todo;