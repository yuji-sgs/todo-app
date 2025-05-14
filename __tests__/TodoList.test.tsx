// __tests__/TodoList.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TodoList from '../components/TodoList';
import { deleteTodo, getAllTodos } from '../utils/supabaseFunctions';
import '@testing-library/jest-dom'

jest.mock('../utils/supabaseFunctions');

describe('TodoList', () => {
  const mockTodos = [
    { id: 1, title: '買い物に行く' },
    { id: 2, title: '勉強する' },
  ];

  it('TODOが表示される', () => {
    render(<TodoList todos={mockTodos} setTodos={jest.fn()} />);
    expect(screen.getByText('✅ 買い物に行く')).toBeInTheDocument();
    expect(screen.getByText('✅ 勉強する')).toBeInTheDocument();
  });

  it('削除ボタンでSupabase関数とsetTodosが呼ばれる', async () => {
    const mockSetTodos = jest.fn();
    (deleteTodo as jest.Mock).mockResolvedValue(undefined);
    (getAllTodos as jest.Mock).mockResolvedValue([
      { id: 999, title: '削除後のTodo' },
    ]);

    render(<TodoList todos={mockTodos} setTodos={mockSetTodos} />);
    fireEvent.click(screen.getAllByText('✖️')[0]);

    await waitFor(() => {
      expect(deleteTodo).toHaveBeenCalledWith(1);
      expect(getAllTodos).toHaveBeenCalled();
      expect(mockSetTodos).toHaveBeenCalledWith([
        { id: 999, title: '削除後のTodo' },
      ]);
    });
  });
});
