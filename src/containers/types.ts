export interface ApiTodo {
  message: string;
  completed: boolean;
}

export interface mutationApiTodo extends ApiTodo {
  id: string;
}

export interface TodoState {
  todos: mutationApiTodo[];
  isLoading: boolean;
  error: boolean;
}