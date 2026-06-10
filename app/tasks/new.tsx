import { router } from 'expo-router';

import { TodoFormScreen } from '@/components/todos/todo-form';
import { useTodos } from '@/components/todos/todo-store';

export default function NewTaskScreen() {
  const { createTodo } = useTodos();

  return (
    <TodoFormScreen
      title="New Task"
      submitLabel="Create Task"
      onSubmit={(input) => {
        const todo = createTodo(input);
        router.replace(`/tasks/${todo.id}`);
      }}
    />
  );
}
