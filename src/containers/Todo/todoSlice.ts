import {ApiTodo, mutationApiTodo, TodoState} from '../types';
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import {RootState} from '../../app/store';

const initialState: TodoState = {
  todos: [],
  isLoading: false,
  error: false,
};

export const getTodo = createAsyncThunk<mutationApiTodo, void, {state: RootState}>('todo/fetchTodo', async () => {
  const response = await axiosApi.get<mutationApiTodo | null>('/todos.json', );
  return response.data || null;
});

export const addTodo = createAsyncThunk<ApiTodo, string>('todo/addTodo', async (message: string) => {
  const response = await axiosApi.post<ApiTodo>('/todos.json', {message, completed: false});
  return response.data;
});

export const toggleCheckedTodo = createAsyncThunk<mutationApiTodo, string>('todo/toggleCheckedTodo', async (id: string) => {
  const response = await axiosApi.put<mutationApiTodo>(`/todos/${id}.json`, {completed: true});
  return response.data;
});

export const deleteTodo = createAsyncThunk<mutationApiTodo, string>('todo/deleteTodo', async (id: string) => {
  const response = await axiosApi.delete<mutationApiTodo>(`/todos/${id}.json`);
  return response.data.id;
});

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {todo: (state: TodoState) => state},
  extraReducers: (builder) => {
    builder.addCase(getTodo.pending, (state: TodoState) => {
      state.error = false;
      state.isLoading = true;
    }).addCase(getTodo.fulfilled, (state: TodoState, action: PayloadAction<mutationApiTodo>) => {
      state.isLoading = false;
      if (action.payload) {
        state.todos = Object.keys(action.payload).map((id) => ({
          id: id,
          ...action.payload[id],
        }));
      } else {
        state.todos = [];
      }
    }).addCase(getTodo.rejected, (state: TodoState) => {
      state.isLoading = false;
      state.error = true;
    }).addCase(addTodo.pending, (state: TodoState) => {
      state.error = false;
      state.isLoading = true;
    }).addCase(addTodo.fulfilled, (state: TodoState) => {
      state.isLoading = false;
    }).addCase(addTodo.rejected, (state: TodoState) => {
      state.error = true;
      state.isLoading = false;
    }).addCase(toggleCheckedTodo.pending, (state: TodoState) => {
      state.error = false;
      state.isLoading = true;
    }).addCase(toggleCheckedTodo.fulfilled, (state:TodoState, action: PayloadAction<mutationApiTodo> )  => {
      state.isLoading = false;
      const foundIndex = state.todos.findIndex((item) => item.id === action.payload.id);
        if (foundIndex !== -1) {
          state.todos[foundIndex].completed = true;
        }
    }).addCase(toggleCheckedTodo.rejected, (state: TodoState) => {
      state.error = true;
      state.isLoading = false;
    }).addCase(deleteTodo.pending, (state: TodoState) => {
      state.error = false;
      state.isLoading = true;
    }).addCase(deleteTodo.fulfilled, (state: TodoState, action: PayloadAction<mutationApiTodo>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload.id);
    }).addCase(deleteTodo.rejected, (state: TodoState) => {
      state.error = true;
      state.isLoading = false;
    });
  }
});

export const todoReducer = todoSlice.reducer;
export const {todo} = todoSlice.actions;