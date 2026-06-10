import { router, useLocalSearchParams } from 'expo-router';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { TodoFormScreen } from '@/components/todos/todo-form';
import { useTodos } from '@/components/todos/todo-store';

export default function EditTaskScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { getTodo, updateTodo } = useTodos();
  const todo = getTodo(id);

  if (!todo) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-slate-50 px-6">
        <View className="rounded-3xl bg-white p-6 shadow-sm">
          <Text className="text-center text-lg font-extrabold text-slate-950">
            Task not found
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <TodoFormScreen
      todo={todo}
      title="Edit Task"
      submitLabel="Save Changes"
      onSubmit={(input) => {
        updateTodo(todo.id, input);
        router.replace(`/tasks/${todo.id}`);
      }}
    />
  );
}
