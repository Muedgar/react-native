import { useMemo, useState } from 'react';
import {
  ScrollView
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import AnimationOne from '@/components/exercises/animations/1';
import {
  TodoStatus,
  useTodos
} from '@/components/todos/todo-store';

export default function HomeScreen() {
  const { todos, toggleStatus } = useTodos();
  const [search, setSearch] = useState('');

  const filteredTodos = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return todos;
    }

    return todos.filter((todo) =>
      `${todo.title} ${todo.desc} ${todo.status}`.toLowerCase().includes(query),
    );
  }, [search, todos]);

  const counts = useMemo(
    () =>
      todos.reduce<Record<TodoStatus, number>>(
        (result, todo) => {
          result[todo.status] += 1;
          return result;
        },
        { todo: 0, progress: 0, done: 0 },
      ),
    [todos],
  );

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-12"
      >
        
        <AnimationOne />
      </ScrollView>
    </SafeAreaView>
  );
}
