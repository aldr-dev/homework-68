import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../app/store';
import {addTodo, getTodo} from '../../containers/Todo/todoSlice';
import './TodoForm.css';

const TodoForm = () => {
  const [title, setTitle] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const isLoader = useSelector((state: RootState) => state.todo.isLoading);

  const onFieldChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const valueInput = (event.target as HTMLTextAreaElement).value;
    setTitle(valueInput);
  };

  const onFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (title.length !== 0) {
     await dispatch(addTodo(title));
      setTitle('');
      await dispatch(getTodo());
    }
  };

  return (
    <form className="form-todo" onSubmit={onFormSubmit}>
      <textarea className="form-input-todo" required onChange={onFieldChange} value={title}/>
      <button className="form-btn-todo" disabled={isLoader} type="submit">
        <div className={isLoader ? 'spinner' : ''}>
          {isLoader ? '' : 'Send'}
        </div>
      </button>
    </form>
  );
};

export default TodoForm;