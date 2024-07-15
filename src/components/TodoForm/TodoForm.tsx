import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../app/store';
import {addTodo, getTodo} from '../../containers/Todo/todoSlice';

const TodoForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [message, setMessage] = useState('');


  const onFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const valueInput = (event.target as HTMLInputElement).value;
    setMessage(valueInput);
  };

  const onFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (message.length !== 0) {
      dispatch(addTodo(message));
      setMessage('');
    }
  };

  return (
    <form onSubmit={onFormSubmit}>
      <input onChange={onFieldChange} value={message} type="text"/>
      <button type="submit">Отправить</button>
    </form>
  );
};

export default TodoForm;