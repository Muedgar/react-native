import {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
  useState,
} from 'react';

export type TodoStatus = 'todo' | 'progress' | 'done';
export type TodoPriority = 'low' | 'medium' | 'high';

export type Todo = {
  id: string;
  title: string;
  desc: string;
  time: string;
  dueDate: string;
  status: TodoStatus;
  priority: TodoPriority;
  progress: number;
  color: string;
  icon: string;
};

export type TodoInput = Omit<Todo, 'id'>;

const seedTodos: Todo[] = [
  {
    id: 'team-meeting',
    title: 'Team Meeting',
    desc: 'Discuss new product direction',
    time: '10:00 AM',
    dueDate: '2026-06-14',
    status: 'todo',
    priority: 'high',
    progress: 48,
    color: 'bg-violet-500',
    icon: 'account-group-outline',
  },
  {
    id: 'ui-review',
    title: 'UI Review',
    desc: 'Check dashboard screens',
    time: '12:30 PM',
    dueDate: '2026-06-14',
    status: 'progress',
    priority: 'medium',
    progress: 72,
    color: 'bg-emerald-500',
    icon: 'palette-outline',
  },
  {
    id: 'api-cleanup',
    title: 'API Cleanup',
    desc: 'Refactor task endpoints',
    time: '03:00 PM',
    dueDate: '2026-06-15',
    status: 'todo',
    priority: 'medium',
    progress: 35,
    color: 'bg-orange-500',
    icon: 'code-braces',
  },
];

type TodoContextValue = {
  todos: Todo[];
  getTodo: (id: string) => Todo | undefined;
  createTodo: (input: TodoInput) => Todo;
  updateTodo: (id: string, input: TodoInput) => void;
  deleteTodo: (id: string) => void;
  toggleStatus: (id: string) => void;
};

const TodoContext = createContext<TodoContextValue | null>(null);

const statusFlow: TodoStatus[] = ['todo', 'progress', 'done'];

const makeId = (title: string) =>
  `${title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')}-${Date.now()}`;

export function TodoProvider({ children }: PropsWithChildren) {
  const [todos, setTodos] = useState<Todo[]>(seedTodos);

  const value = useMemo<TodoContextValue>(
    () => ({
      todos,
      getTodo: (id) => todos.find((todo) => todo.id === id),
      createTodo: (input) => {
        const todo = { ...input, id: makeId(input.title) };
        setTodos((current) => [todo, ...current]);
        return todo;
      },
      updateTodo: (id, input) => {
        setTodos((current) =>
          current.map((todo) => (todo.id === id ? { ...input, id } : todo)),
        );
      },
      deleteTodo: (id) => {
        setTodos((current) => current.filter((todo) => todo.id !== id));
      },
      toggleStatus: (id) => {
        setTodos((current) =>
          current.map((todo) => {
            if (todo.id !== id) {
              return todo;
            }

            const nextIndex =
              (statusFlow.indexOf(todo.status) + 1) % statusFlow.length;
            const status = statusFlow[nextIndex];

            return {
              ...todo,
              status,
              progress: status === 'done' ? 100 : todo.progress,
            };
          }),
        );
      },
    }),
    [todos],
  );

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
}

export function useTodos() {
  const context = useContext(TodoContext);

  if (!context) {
    throw new Error('useTodos must be used inside TodoProvider');
  }

  return context;
}

export const statusLabels: Record<TodoStatus, string> = {
  todo: 'To-Do',
  progress: 'Progress',
  done: 'Done',
};

export const priorityLabels: Record<TodoPriority, string> = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
};
