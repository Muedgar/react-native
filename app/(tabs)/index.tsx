import { useMemo, useState } from 'react';
import {
  ScrollView
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  TodoStatus,
  useTodos
} from '@/components/todos/todo-store';
import ThreeScreen from './three';

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
        <ThreeScreen />
        {/* <View className="flex-row items-center justify-between px-6 pt-4">
          <View className="h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm">
            <MaterialCommunityIcons
              name="checkbox-marked-circle-outline"
              size={25}
              color="#0f172a"
            />
          </View>

          <TouchableOpacity
            className="h-12 flex-row items-center gap-2 rounded-2xl bg-slate-950 px-5 shadow-md"
            onPress={() => router.push('/tasks/new')}
          >
            <MaterialCommunityIcons name="plus" size={22} color="white" />
            <Text className="font-bold text-white">Add Task</Text>
          </TouchableOpacity>
        </View>

        <View className="px-6 pt-8">
          <Text className="text-base font-medium text-slate-500">
            Good morning
          </Text>
          <Text className="mt-3 text-4xl font-extrabold leading-tight text-slate-950">
            You have{' '}
            <Text className="text-violet-600">{todos.length} tasks</Text>
            {'\n'}to organize
          </Text>
        </View>

        <View className="px-6 pt-8">
          <View className="h-14 flex-row items-center rounded-3xl bg-white px-4 shadow-sm">
            <MaterialCommunityIcons name="magnify" size={22} color="#94a3b8" />
            <TextInput
              className="ml-3 flex-1 text-base text-slate-800"
              onChangeText={setSearch}
              placeholder="Search your tasks..."
              placeholderTextColor="#94a3b8"
              value={search}
            />
          </View>
        </View>

        <View className="mt-8 px-6">
          <View className="flex-row justify-between">
            {(Object.keys(statusLabels) as TodoStatus[]).map((status) => (
              <View
                key={status}
                className="w-[31%] rounded-3xl bg-white p-4 shadow-sm"
              >
                <Text className="text-2xl font-extrabold text-slate-950">
                  {counts[status]}
                </Text>
                <Text className="mt-1 text-sm font-bold text-slate-500">
                  {statusLabels[status]}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <View className="mt-10">
          <View className="mb-5 flex-row items-center justify-between px-6">
            <Text className="text-2xl font-extrabold text-slate-950">
              {"Today's Tasks"}
            </Text>
            <Link href="/(tabs)/schedule" asChild>
              <TouchableOpacity>
                <Text className="font-bold text-violet-600">Schedule</Text>
              </TouchableOpacity>
            </Link>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerClassName="px-6"
          >
            {filteredTodos.map((todo) => (
              <TodoCard
                key={todo.id}
                todo={todo}
                onStatusPress={() => toggleStatus(todo.id)}
              />
            ))}
          </ScrollView>
        </View>

        <View className="mt-10 px-6">
          <Text className="mb-5 text-2xl font-extrabold text-slate-950">
            All Tasks
          </Text>
          {filteredTodos.map((todo) => (
            <TodoCard
              compact
              key={todo.id}
              todo={todo}
              onStatusPress={() => toggleStatus(todo.id)}
            />
          ))}
        </View> */}
      </ScrollView>
    </SafeAreaView>
  );
}
