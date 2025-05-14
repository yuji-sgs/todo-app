// __mocks__/supabaseFunctions.ts
export const deleteTodo = jest.fn();
export const getAllTodos = jest.fn().mockResolvedValue([
  { id: 1, title: 'モックTodo' },
]);
