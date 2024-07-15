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

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    increase: (state) => {
     console.log(state);
    },
  },
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
    });
  }
});

export const todoReducer = todoSlice.reducer;
export const {increase} = todoSlice.actions;